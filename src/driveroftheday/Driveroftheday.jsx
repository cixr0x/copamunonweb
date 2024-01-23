import React, { useState, useEffect } from 'react';
import * as utils from '../utils/utils';
import Header from '../Header';
import Card from './Card';
import { DATASOURCE, DEFAULT_LEAGUE } from '../const';
import { useParams } from 'react-router-dom';
import { get } from '../utils/api';
import Cookies from 'js-cookie';

function Drivers(props) {
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    const [voted, setVoted] = useState( false);
    const [votedDriver, setVotedDriver] = useState(Cookies.get('voteddriver') ?? "");
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

    const onDriverClick = async (driver) => {
        let result = await get(`votedriver/${driver}`);
        if (!result) return;
        const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000); // Current time + 1 hour
        Cookies.set('voted', true, { expires: inOneHour });
        Cookies.set('voteddriver', driver, { expires: inOneHour });
        setVoted(true);
        setVotedDriver(driver);
    }

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
            if (data.driver.role === "reserva") continue;
            table.push(
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 margin-bot" >
                    <Card
                        flag={data.driver?.flag}
                        driverImage={data.driver?.code}
                        driverName={data.driver?.name}
                        constructorLogo={data.constructor?.logo}
                        constructorName={data.constructor?.name}
                        constructorColor={data.constructor?.color}
                        onclick={onDriverClick}
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
                {voted ? (
                    <>
                    <br/>
                <h1 style={{"text-align":"center"}}>Has votado por {votedDriver} </h1>
                <br/>
                <h2 style={{"text-align":"center"}}>¡GRACIAS POR TU VOTO! </h2>
                <br/>
                </>
                ) :
                    (
                        <>
                            <h1 style={{"text-align":"center"}} >VOTA POR EL PILOTO DEL DÍA </h1>
                            <div className="row">
                                {table}
                            </div>
                        </>)}

            </div>
        </>
    )

}

export default Drivers;