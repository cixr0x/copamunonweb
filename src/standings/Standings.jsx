import React, { useState, useEffect } from 'react';
import * as utils from '../utils/utils';
import DriverStandingsRow from './DriverStandingsRow';
import ConstructorStandingsRow from './ConstructorStandingsRow';
import Header from './../Header';
import { DATASOURCE, DEFAULT_LEAGUE, POINTS_TO_PENALIZE, PENALTY_POINTS } from '../const';
import { useParams } from 'react-router-dom';

function Standings(props) {
    const [eventResults, setEventResults] = useState(null);
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    const [penalties, setPenalties] = useState(null);
    const [driverStandings, setDriverStandings] = useState(null);
    const [constructorStandings, setConstructorStandings] = useState(null);
    let { league } = useParams();

    if (!league) {
        league = DEFAULT_LEAGUE;
    }
    let datasource = DATASOURCE[league];

    useEffect(() => {

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/event_results?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                console.log("EVENTS");
                console.log(utils.transformGoogleSheetValues(data.values));
                setEventResults(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/drivers?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                console.log("DRIVERS");
                console.log(utils.transformGoogleSheetValuesMap(data.values, "code"));
                setDrivers(utils.transformGoogleSheetValuesMap(data.values, "code"));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/constructors?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                console.log("CONSTRUCTORS");
                console.log(utils.transformGoogleSheetValuesMap(data.values, "code"));
                setConstructors(utils.transformGoogleSheetValuesMap(data.values, "code"));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/penalties?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                console.log("PENALTIES");
                console.log(utils.transformGoogleSheetValuesMap(data.values, "driver_code"));
                setPenalties(utils.transformGoogleSheetValuesMap(data.values, "driver_code"));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/driver_standings?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                console.log("DRIVER STANDINGS");
                console.log(utils.transformGoogleSheetValues(data.values, "driver_code"));
                setDriverStandings(utils.transformGoogleSheetValues(data.values, "driver_code"));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/constructor_standings?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                console.log("CONSTRUCTOR STANDINGS");
                console.log(utils.transformGoogleSheetValues(data.values, "constructor_code"));
                setConstructorStandings(utils.transformGoogleSheetValues(data.values, "constructor_code"));
            })
            .catch(console.log)


    }, []);

    let driversTable = [];
    let constructorsTable = [];

    let buildDriversTable = () => {
        let rank = 1;
        let data = driverStandings
        driverStandings.sort((a, b) => b.points - a.points).forEach(sDriver => {
            let driver = drivers[sDriver.driver_code];
            console.log("DRIVER");
            console.log(driver);
            let constructor = constructors[driver.constructor];
            if (driver?.role === "principal") {
                driversTable.push(
                    <DriverStandingsRow
                        rank={rank}
                        driverName={driver?.name}
                        constructorName={constructor?.name}
                        totalPoints={sDriver?.points}
                        deductedPoints={0}
                        finalPoints={sDriver?.points}
                        constructorLogo={constructor?.logo}
                        driverImage={driver?.code}
                        constructorColor={constructor?.color}
                    ></DriverStandingsRow>
                );
                rank++;
            }
        });
    }

    let buildConstuctorsTable = () => {
        let rank = 1;

        constructorStandings.sort((a, b) => b.points - a.points).forEach(sConstructor => {
            let constructor = constructors[sConstructor.constructor_code];
            constructorsTable.push(
                <ConstructorStandingsRow
                    rank={rank}
                    constructorName={constructor?.name}
                    points={sConstructor?.points}
                    constructorLogo={constructor?.logo}
                    constructorColor={constructor?.color}
                ></ConstructorStandingsRow>
            );
            rank++;
        });

    }

    if (eventResults && drivers && constructors && penalties && driverStandings && constructorStandings) {

        buildDriversTable();
        buildConstuctorsTable();
    }
    return (
        <>
            <Header
                league={league}
                page="standings"
            />
            <div className="calendar-cards-container">
                <h1>Campeonato de Pilotos</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Piloto</th>
                            <th scope="col">Escudería</th>
                            <th scope="col">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driversTable}
                    </tbody>
                </table>
                <div style={{ "marginTop": "100px" }}></div>
                <h1>Campeonato de Constructores</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Escudería</th>
                            <th scope="col">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {constructorsTable}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Standings;