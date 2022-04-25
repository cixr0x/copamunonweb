import React, { useState, useEffect } from 'react';
import * as utils from '../utils/utils';
import DriverStandingsRow from './DriverStandingsRow';
import ConstructorStandingsRow from './ConstructorStandingsRow';
import Header from './../Header';

function Standings() {
    const [eventResults, setEventResults] = useState(null);
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    useEffect(() => {

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/event_results?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
            .then(res => res.json())
            .then((data) => {
                console.log(utils.transformGoogleSheetValues(data.values));
                setEventResults(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log)

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/drivers?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
            .then(res => res.json())
            .then((data) => {
                console.log(utils.transformGoogleSheetValues(data.values));
                setDrivers(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log)

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/constructors?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
            .then(res => res.json())
            .then((data) => {
                console.log(utils.transformGoogleSheetValues(data.values));
                setConstructors(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log)


    }, []);

    let driversTable = [];
    let constructorsTable = [];
    if (eventResults && drivers && constructors) {
        let points = {};
        let constructorPoints = {};
        for (let results of eventResults) {
            let driver_code = results["driver_code"];

            for (let item in results) {
                if (item === "driver_code") {
                    continue;
                }
                // console.log("item", item, results[item]);
                if (points[driver_code]) {
                    points[driver_code] += results[item] ? Number(results[item]) : 0;
                } else {
                    points[driver_code] = results[item] ? Number(results[item]) : 0;
                }
            }
        }
        let driversTableData = [];
        for (let driverName in points) {
            let driver = drivers.find((driver) => {
                return driver.code === driverName;
            })
            let tableObj = {};
            tableObj["driver"] = driver;
            tableObj["points"] = points[driverName];
            tableObj["constructor"] = constructors.find((constructor) => {
                return constructor.code === driver.constructor;
            });
            driversTableData.push(tableObj);
        }
        
        driversTableData = driversTableData.sort((a, b) => {
            return b.points - a.points;
        });

        let rank = 1;
        for (let data of driversTableData) {
            // console.log(data);

            if (constructorPoints[data?.constructor?.code]) {
                constructorPoints[data?.constructor?.code] += data?.points ? Number(data?.points) : 0;
            } else {
                constructorPoints[data?.constructor?.code] = data?.points ? Number(data?.points) : 0;
            }
            driversTable.push(
                <DriverStandingsRow
                    rank={rank}
                    driverName={data?.driver?.name}
                    constructorName={data?.constructor?.name}
                    points={data?.points}
                    constructorLogo={data?.constructor?.logo}
                    driverImage={data?.driver?.profileimg}
                    constructorColor = {data?.constructor?.color}
                ></DriverStandingsRow>
            );
            rank++;
        }

        let constructorsTableData = []
        
        for (let constructorName in constructorPoints) {
            let constructor = constructors.find((constructor) => {
                return constructor.code === constructorName;
            })
            let tableObj = {}
            tableObj["constructor"] = constructor;
            tableObj["points"] = constructorPoints[constructorName];
            constructorsTableData.push(tableObj);
        }

        constructorsTableData = constructorsTableData.sort((a, b) => {
            return b.points - a.points;
        });

        console.log("CONSTRUCTOR POINTS", constructorsTableData);   

        rank = 1;
        for (let data of constructorsTableData) {
            // console.log(data);
            constructorsTable.push(
                <ConstructorStandingsRow
                    rank={rank}
                    constructorName={data?.constructor?.name}
                    points={data?.points}
                    constructorLogo={data?.constructor?.logo}
                    constructorColor = {data?.constructor?.color}
                ></ConstructorStandingsRow>
            );
            rank++;
        }
    }
    return (
        <>
        <Header
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
            <div style={{"marginTop":"100px"}}></div>
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