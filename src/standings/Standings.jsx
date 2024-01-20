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
    const [reserve, setReserve] = useState(null);
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
                console.log(utils.transformGoogleSheetValues(data.values));
                setDrivers(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log)

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/constructors?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                console.log("CONSTRUCTORS");
                console.log(utils.transformGoogleSheetValues(data.values));
                setConstructors(utils.transformGoogleSheetValues(data.values));
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

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${datasource}/values/reserve?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A`)
            .then(res => res.json())
            .then((data) => {
                console.log("RESERVE");
                console.log(utils.transformGoogleSheetValuesMap(data.values, "driver_code"));
                setReserve(utils.transformGoogleSheetValuesMap(data.values, "driver_code"));
            })
            .catch(console.log)


    }, []);

    let driversTable = [];
    let constructorsTable = [];

    let getDriverPoints = (eventResults) => {
        let points = {};
        for (let results of eventResults) {
            let driver_code = results["driver_code"];
            for (let item in results) {
                if (item === "driver_code") {
                    continue;
                }
                if (results[item] === "DNF") {
                    results[item] = 0;
                }
                if (isNaN(results[item])) {
                    continue;
                }
                if (points[driver_code]) {
                    points[driver_code] += results[item] ? Number(results[item]) : 0;
                } else {
                    points[driver_code] = results[item] ? Number(results[item]) : 0;
                }

            }
        }
        return points;
    }

    let getDriverPenalties = (driver) => {
        console.log("GET PENALTIES " + driver);
        console.log(penalties);
        return penalties[driver]["TOTAL"];
    }

    let getReserveConstructor = (driver, event) => {
        return reserve[driver][event];
    }

    let getDriversTableData = (points) => {
        let driversTableData = [];
        for (let driverName in points) {
            let driver = drivers.find((driver) => {
                return driver.code === driverName;
            })
            let tableObj = {};
            let totalPoints = points[driverName];
            let penalties = Number(getDriverPenalties(driverName));
            console.log("PENALTIES");
            console.log(penalties);

            let deductedPoints = (Math.floor(penalties / POINTS_TO_PENALIZE[league])) * PENALTY_POINTS[league];
            let finalPoints = totalPoints - deductedPoints;
            tableObj["driver"] = driver;
            tableObj["totalPoints"] = totalPoints;
            tableObj["deductedPoints"] = deductedPoints;
            tableObj["finalPoints"] = finalPoints;
            tableObj["role"] = driver.role;
            tableObj["constructor"] = constructors.find((constructor) => {
                return constructor.code === driver.constructor;
            });
            driversTableData.push(tableObj);
        }

        driversTableData = driversTableData.sort((a, b) => {
            return b.finalPoints - a.finalPoints;
        });

        return driversTableData;
    }

    let buildDriversTable = (driversTableData) => {
        let constructorPoints = {};
        let rank = 1;
        for (let data of driversTableData) {
            let constructorCode = data?.constructor?.code;

            if (constructorPoints[constructorCode]) {
                constructorPoints[constructorCode] += data?.finalPoints;
            } else {
                constructorPoints[constructorCode] = data?.finalPoints;
            }
            if (data?.driver?.role === "principal") {
                driversTable.push(
                    <DriverStandingsRow
                        rank={rank}
                        driverName={data?.driver?.name}
                        constructorName={data?.constructor?.name}
                        totalPoints={data?.totalPoints}
                        deductedPoints={data?.deductedPoints}
                        finalPoints={data?.finalPoints}
                        constructorLogo={data?.constructor?.logo}
                        driverImage={data?.driver?.code}
                        constructorColor={data?.constructor?.color}
                    ></DriverStandingsRow>
                );
                rank++;
            }
            
        }
        return constructorPoints;
    }

    let getConstructorTableData = (constructorPoints) => {
        let constructorsTableData = []
        for (let constructorName in constructorPoints) {
            let constructor = constructors.find((constructor) => {
                return constructor.code === constructorName;
            })

            if (!constructorName) {
                continue;
            }
            let tableObj = {}
            tableObj["constructor"] = constructor;
            tableObj["points"] = constructorPoints[constructorName];
            constructorsTableData.push(tableObj);
        }

        constructorsTableData = constructorsTableData.sort((a, b) => {
            return b.points - a.points;
        });
        return constructorsTableData;
    }

    let buildConstuctorsTable = (constructorsTableData) => {
        let rank = 1;
        for (let data of constructorsTableData) {
            if (!data?.constructor?.name) {
                continue;
            }
            constructorsTable.push(
                <ConstructorStandingsRow
                    rank={rank}
                    constructorName={data?.constructor?.name}
                    points={data?.points}
                    constructorLogo={data?.constructor?.logo}
                    constructorColor={data?.constructor?.color}
                ></ConstructorStandingsRow>
            );
            rank++;
        }
    }

    if (eventResults && drivers && constructors && penalties && reserve) {

        let points = getDriverPoints(eventResults);
        let driversTableData = getDriversTableData(points);
        let constructorPoints = buildDriversTable(driversTableData);
        let constructorsTableData = getConstructorTableData(constructorPoints);

        buildConstuctorsTable(constructorsTableData);
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