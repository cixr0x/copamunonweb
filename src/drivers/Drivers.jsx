import React, { useState, useEffect } from 'react';
import * as utils from '../utils/utils';
import Header from './../Header';
import Card from './Card';
import { DATASOURCE, DEFAULT_LEAGUE } from '../const';
import { useParams } from 'react-router-dom';

function Drivers(props) {
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    let { league } = useParams();
    if (!league) {
        league = DEFAULT_LEAGUE;
    }
    let datasource = DATASOURCE[league];
    useEffect(() => {

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
    let table = [];
    let tableData = [];
    let cards = null;
    if (drivers && constructors) {
        for (let driver of drivers) {
            let obj = {};
            obj["driver"] = driver;
            obj["constructor"] = constructors.find((constructor) => {
                return constructor.code === driver.constructor;
            });
            tableData.push(obj);
        }

        for (let data of tableData) {
            if (data.driver?.role === "reserva") continue;
            table.push(
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 margin-bot" >
                <Card
                    flag={data.driver?.flag}
                    driverImage={data.driver?.code}
                    driverName={data.driver?.name}
                    constructorLogo={data.constructor?.logo}
                    constructorName={data.constructor?.name}
                    twitch={data.driver?.twitch}
                    facebook={data.driver?.facebook}
                    kick={data.driver?.kick}
                    constructorColor={data.constructor?.color}
                    ></Card>
                    </div>
            )
        }
    }

    return (
        <>
        <Header
            page="drivers"
            league={league}
        />
        <div className="calendar-cards-container">
            <h1>PILOTOS </h1>
            <div className="row">                
                {table}
            </div>
        </div>
        </>
    )

}

export default Drivers;