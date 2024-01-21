import React, { useState, useEffect } from 'react';
import * as utils from '../utils/utils';
import Header from '../Header';
import Card from '../drivers/Card';
import { DATASOURCE, DEFAULT_LEAGUE } from '../const';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { get } from '../utils/api';
import { tab } from '@testing-library/user-event/dist/tab';

let interval=false;
function Results(props) {
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    const [voteresults, setVoteResults] = useState({});
    // const [tableData, setTableData] = useState(null);

    let { league } = useParams();
    if (!league) {
        league = DEFAULT_LEAGUE;
    }
    let datasource = DATASOURCE[league];
    useEffect(() => {

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/drivers?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                setDrivers(utils.transformGoogleSheetValuesMap(data.values, "code"));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/constructors?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                setConstructors(utils.transformGoogleSheetValuesMap(data.values, "code"));
            })
            .catch(console.log);

        getVoteResults();
        console.log("USING EFFECT");

        

    }, []);

    useEffect(() => {
        if (interval === false) {
            setInterval(() => {
                getVoteResults();
            }, 5000); 
            interval = true;
        }
        

    }, []);

    let getVoteResults = async () => {
        get(`voteresults/`).then(votereusultsResponse => {
            if (votereusultsResponse) {
                let vrobj = {};
                votereusultsResponse.forEach(element => {
                    vrobj[element["driver_id"]] = element["count"];
                });
                setVoteResults(vrobj);
            }
        });
    }

    let tableData= null;
    if (drivers && constructors && voteresults) {
        const labels = Object.keys(voteresults);
        console.log("drivers");
        console.log(drivers);
        console.log("constructors");
        console.log(constructors);
        tableData =  {
            labels,
            datasets: [
              {
                label: 'Votos',
                data: labels.map((l) => voteresults[l]),
                borderColor: labels.map(driver => constructors[drivers[driver].constructor].color),
                backgroundColor: labels.map(driver => constructors[drivers[driver].constructor].color),
              }
            ],
          };    
    }


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

      
    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'right',
          },
          title: {
            display: false
          },
        },
      };
      
      

      
      

    return (
        
        <>
         <Header
            page="drivers"
            league={league}
        />
        <div className="calendar-cards-container">
            <h1>Piloto del día: Resultados </h1>
            {tableData ? (<Bar options={options} data={tableData} />)  :""}
            
        </div>
    
        </>
    )

}


export default Results;