import React, { useState, useEffect } from 'react';
import Card from './Card';
import * as utils from '../utils/utils';
import Header from './../Header';
import { DATASOURCE,CALENDAR_TITLE, DEFAULT_LEAGUE } from '../const';
import { useParams } from 'react-router-dom';

function Calendar(props) {
    const [calendar, setCalendar] = useState(null)
    const [eventResults, setEventResults] = useState(null);
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    let { league } = useParams();

    if (!league) {
        league = DEFAULT_LEAGUE;
    }
    let datasource = DATASOURCE[league];

    useEffect(() => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/events?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
        .then(res => res.json())
        .then((data) => {
          setCalendar(utils.transformGoogleSheetValues(data.values));
        })
        .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/event_results?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                setEventResults(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/drivers?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                setDrivers(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/constructors?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                setConstructors(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log);
      }, []);

    let cards = null;

    if (calendar && eventResults && drivers && constructors) {
        cards = calendar.map((calendarItem) => {
            return (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 " style={{marginBottom: "16px"}}>
            <Card
                date={calendarItem.date_text}
                country={calendarItem.country}
                circuit={calendarItem.circuit}
                track={calendarItem.track}
                flag={calendarItem.flag}
                round={calendarItem.round}
                winner = {getGPwinner(calendarItem.code)}
            ></Card>
            </div>
            );
        });
    }
    
    function getGPwinner(gp) {
        let winner  = "";
        let topscore  = 0;
        for (let results of eventResults) {
            let driver = drivers.find((driver) => {
                return driver.code === results["driver_code"];
            });
            let constructor = constructors.find((constructor)=> {
                return constructor.code === driver.constructor;
            });
            let score = Number(results[gp]);
            if (score > topscore)  {
                topscore = score;
                winner = {
                    driverName: driver.name,
                    driverPic: driver.profileimg, 
                    constructorLogo: constructor?.logo, 
                    constructorColor: constructor?.color
                }

            }
        }
        return winner;
    }

    return (
        <>
        <Header
            page="calendar"
            league={league}
        />
        <div className="calendar-cards-container">
            <h1> { CALENDAR_TITLE[league]} </h1>
            <div className="row" style={{"--bs-gutter-y": "1.5rem;"}}>            
                {cards}
            </div>
        </div>
        </>
    );
}

export default Calendar;