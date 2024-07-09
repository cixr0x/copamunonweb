import Header from '../Header';
import { useParams } from 'react-router-dom';
import { get } from '../utils/api';
import React, { useState, useEffect, useCallback } from 'react';
import * as utils from '../utils/utils';
import { DATASOURCE, DEFAULT_LEAGUE } from '../const';
import Cookies from 'js-cookie';
import '../dash.css';
import { weatherIcon, trackName, weatherName, safetyCarStatus, visualTyreCompoundName, ersDeployMode, resultStatus, tyreCompoundColor, teamName } from './dashboardConstants';
import WeatherChart from './WeatherChart';
import TyreChart from './TyreChart';
import StintChart from './StintChart';
import ProgressBar from './ProgressBar';

let interval = false;

function Dashboard() {
    const [sessionData, setSessionData] = useState(null);
    const [playerData, setPlayerData] = useState(null);
    const [playerIdx, setPlayerIdx] = useState(0);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            if (isCancelled) return;

            await getSessionData();
            await getPlayerData();

            if (!isCancelled) {
                setTimeout(fetchData, 1000);
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [playerIdx]);

    const getSessionData = async () => {
        try {
            const sessionDataResponse = await get(`f1dash/session`);
            if (sessionDataResponse) {
                setSessionData(sessionDataResponse);
                console.log(sessionDataResponse);
            }
        } catch (error) {
            console.error("Error fetching session data:", error);
        }
    };

    const getPlayerData = async () => {
        try {
            console.log(`${playerIdx}`);
            console.log(`f1dash/player/${playerIdx}`);
            const playerDataResponse = await get(`f1dash/player/${playerIdx}`);
            if (playerDataResponse) {
                setPlayerData(playerDataResponse);
                console.log(playerDataResponse);
            }
        } catch (error) {
            console.error("Error fetching player data:", error);
        }
    };

    let getPenaltyValue = (playerData) => {
        let penaltiesSecs = 0;
        if (playerData.resultStatus !== 2) {
            return resultStatus[playerData.resultStatus];
        }
        if (playerData.numUnservedDriveThroughPens > 0) {
            return "DT";
        }
        penaltiesSecs = playerData.numUnservedStopGoPens * 10;

        if (playerData.penalties+penaltiesSecs > 0) {
            return `+${penaltiesSecs+playerData.penalties}s`;
        }
        return "";
    }

    let getPlayerName = (playerData) => {
        if (!playerData) return "";
        if (playerData.name === "Player") {
            return `${teamName[playerData.teamId]}_${playerData.raceNumber}`;
        }
        return playerData.name.substring(0, 12);
    }

    let getStintChartData = (playerData) => {
        let stintHistory = playerData.m_tyreStintsHistoryData;
        if (stintHistory.length === 0) return [];
        let data = [];
        let startLap = 0;
        let lastLap = 0;

        for (let i = 0; i < stintHistory.length - 1; i++) {
            let endLap = stintHistory[i].m_endLap;
            data.push({ startLap: startLap, endLap: endLap, color: tyreCompoundColor[stintHistory[i].m_tyreVisualCompound] });
            startLap = endLap + 1;
            lastLap = endLap;
        }
        console.log(stintHistory.length)
        console.log(stintHistory[stintHistory.length - 1]);
        data.push({ startLap: startLap, endLap: startLap + playerData.stintLaps, color: tyreCompoundColor[stintHistory[stintHistory.length - 1].m_tyreVisualCompound] });
        return data
    }

    let sessionHeader = () => {
        return (
            <>
                <div className='' style={{ "paddingTop": "20px" }}>
                    <div className='row'>
                        <div className='col-4'>
                            <div className='row'>
                                <div className='track-title'>{trackName[sessionData?.trackId]}</div>
                            </div>
                            <div className='row'>
                                <div className='lap-counter'>Lap {sessionData.currentLap}/{sessionData.totalLaps}</div>
                            </div>
                        </div>
                        <div className='col-2' style={{ "textAlign": "center" }}>
                            <div className='row '>
                                <span class="material-symbols-outlined weather-icon">{weatherIcon[sessionData?.weather]}</span>
                            </div>
                            <div className='row'>
                                <span>{weatherName[sessionData?.weather]}</span>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div classsName='container'>
                                <div className='row '>
                                    <div className='col-3'>
                                        <span class="material-symbols-outlined material-symbols-outlined-light weather-icon">device_thermostat</span>
                                    </div>
                                    <div className='col-9'>
                                        <div classsName='container'>
                                            <div className='col'>
                                                Air: {sessionData?.airTemperature}°C
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                Track: {sessionData?.trackTemperature}°C
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-1'>
                            <div classsName='container' style={{ "textAlign": "center" }}>
                                <div className='row justify-content-center'>
                                    <div className='col'>
                                        Forecast
                                    </div>
                                </div>
                                <div className='row '>
                                    <div className='col '>
                                        <span class="material-symbols-outlined material-symbols-outlined-light" style={{ "fontSize": "1.5rem" }}>rainy</span>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        {sessionData?.weatherForecastSamples[0]?.m_rainPercentage}%
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-3'>
                            <WeatherChart data={sessionData?.weatherForecastSamples} sessionDuration={sessionData.sessionDuration/1000 ?? 0} />
                        </div>

                    </div>
                </div >

            </>
        )
    }
    if (!sessionData) {
        return (
            <>
                <body data-bs-theme="dark" >
                    <span className="visually-hidden">Loading...</span>
                </body>
            </>
        )
    }

    let tyreDetails = (data, tyreIdx) => {
        return (
            <>
                <div className='row'>
                    <div className='col d-flex justify-content-center align-items-center'>
                        <div style={{ "width": "4em", "height": "4em" }}>
                            <TyreChart damage={Math.round(data.m_tyresWear[tyreIdx])} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex'><span class="material-symbols-outlined" style={{ "fontSize": "1.5rem" }}>radio_button_checked</span>{data.m_tyresInnerTemperature[tyreIdx]}°C</div>
                </div>
                <div className='row'>
                    <div className='col d-flex'><span class="material-symbols-outlined" style={{ "fontSize": "1.5rem" }}>circle</span>{data.m_tyresSurfaceTemperature[tyreIdx]}°C</div>
                </div>
                <div className='row'>
                    <div className='col d-flex'><span class="material-symbols-outlined material-symbols-outlined-light" style={{ "fontSize": "1.5rem" }}>tire_repair</span>{data.m_tyresPressure[tyreIdx].toFixed(1)}psi</div>
                </div>
            </>
        )
    }

    let tyreChart = (data) => {
        if (!data) {
            return null;
        }
        return (
            <>
                <div  >
                    <div className='row' style={{ "textAlign": "center", "fontSize": "1.2rem", "fontWeight": "bold" }}>
                        <div className='col'>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4 ' style={{ "textAlign": "center" }}>

                            <div className='row '>
                                <div className='col d-flex justify-content-center align-items-center'>
                                    <div className='image' style={
                                        {
                                            "backgroundImage": ` url('dash/${visualTyreCompoundName[data.m_visualTyreCompound]}.svg')`,
                                            "height": "3rem", "width": "3rem"
                                        }}>

                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div style={{ "color": utils.getAdvColor(utils.getAverage(data.m_tyresWear) / 100), "fontWeight": "bold", "fontSize": "1.2em" }}>
                                    {Math.round(utils.getAverage(data.m_tyresWear))}%
                                </div>
                            </div>
                            <div className='row'>
                                <div>
                                    {data.stintLaps} Laps
                                </div>
                            </div>
                            <div className='row'>
                                <div>
                                    {`${(utils.getAverage(data.m_tyresWear) / (data.stintLaps > 0 ? data.stintLaps : 1)).toFixed(1)}%/lap`}
                                </div>
                            </div>

                            <div className='row'>
                                <div>
                                    Stops:  {data.pitStops}
                                </div>
                            </div>
                            <div className='row'>
                                {tyreSets(data)}
                            </div>
                        </div>
                        <div className='col-8 ' >
                            <div className='row' style={{ "marginBottom": "1rem" }}>
                                <div className='col-6'>
                                    {tyreDetails(data, 2)}
                                </div>
                                <div className='col-6'>
                                    {tyreDetails(data, 3)}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    {tyreDetails(data, 0)}
                                </div>
                                <div className='col-6'>
                                    {tyreDetails(data, 1)}
                                </div>
                            </div>
                            <div className='row'>
                                Stints:
                                <div style={{ "height": "4rem", "width": "100%" }}>
                                    <StintChart data={getStintChartData(data)} maxValue={sessionData.totalLaps}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    let damageChart = (data) => {
        if (!data) {
            return null;
        }
        return (
            <>
                <div  >
                    <div className='row' style={{ "textAlign": "center", "fontSize": "1.2rem", "fontWeight": "bold" }}>
                        <div className='col'>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 image' style={{ "backgroundImage": ` url('dash/f1top.png')` }}>
                            <div >
                                <table className="table-damage" >
                                    <tbody>
                                        <tr>
                                            <td style={{ "textAlign": "right" }}>LFWing:</td>
                                            <td><div style={{ "color": utils.getAdvColor(data.m_frontLeftWingDamage / 100), "fontWeight": "bold" }}>{data.m_frontLeftWingDamage}%</div></td>
                                            <td><div style={{ "color": utils.getAdvColor(data.m_frontRightWingDamage / 100), "textAlign": "right", "fontWeight": "bold" }}>{data.m_frontRightWingDamage}%</div></td>
                                            <td style={{ "textAlign": "left" }}>RFWing: </td>

                                        </tr>
                                        <tr>
                                            <td style={{ "textAlign": "right" }}>SidePod:</td>
                                            <td><div style={{ "color": utils.getAdvColor(data.m_sidepodDamage / 100), "fontWeight": "bold" }}>{data.m_sidepodDamage}%</div></td>
                                            <td><div style={{ "color": utils.getAdvColor(data.m_floorDamage / 100), "textAlign": "right", "fontWeight": "bold" }}>{data.m_floorDamage}%</div></td>
                                            <td style={{ "textAlign": "left" }}>Floor:</td>

                                        </tr>
                                        <tr>
                                            <td style={{ "textAlign": "right" }}>Diffuser:</td>
                                            <td><div style={{ "color": utils.getAdvColor(data.m_diffuserDamage / 100), "fontWeight": "bold" }}>{data.m_diffuserDamage}%</div></td>
                                            <td><div style={{ "color": utils.getAdvColor(data.m_rearWingDamage / 100), "textAlign": "right", "fontWeight": "bold" }}>{data.m_rearWingDamage}%</div></td>
                                            <td style={{ "textAlign": "left" }}>RWing:</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    let fuelChart = (data) => {
        if (!data) {
            return null;
        }
        return (
            <>
                <div  >
                    <div className='row' style={{ "textAlign": "center", "fontSize": "1.2rem", "fontWeight": "bold" }}>
                        <div className='col'>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12' >
                            <table className="table-damage">
                                <tbody >
                                    <tr>
                                        <td style={{ "textAlign": "right", "fontSize": "1rem" }}><span class="material-symbols-outlined">local_gas_station</span></td>
                                        <td style={{ "textAlign": "left" }} className='d-flex'><div>{`${data.m_fuelInTank.toFixed(1)}kg `}</div> &nbsp;<div style={{ "color": data.m_fuelRemainingLaps > 0 ? "#00FF00" : "#FF0000" }} >{`${data.m_fuelRemainingLaps.toFixed(2)}`}</div> &nbsp; <div >laps</div></td>
                                    </tr>
                                    <tr style={{}}>
                                        <td style={{ "color": "#FFFF00", "textAlign": "right", "fontSize": "1rem" }}><span class="material-symbols-outlined">bolt</span></td>
                                        <td style={{ "color": "#FFFF00", "textAlign": "left", "fontWeight": "bold" }} className='d-flex'><div>{`${((data.m_ersStoreEnergy) / 40000).toFixed(0)} %`}</div>&nbsp;<div>{`[${ersDeployMode[data.m_ersDeployMode]}]`}</div></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            <ProgressBar progress={data.m_ersStoreEnergy / 4000000 * 100} />
                                        </td>
                                    </tr>
                                    <tr style={{}}>
                                        <td style={{ "textAlign": "right", "fontSize": "1rem" }}>ABS:</td>
                                        <td style={{ "textAlign": "left", "fontWeight": "bold" }} className='d-flex'><div>{`${data.m_antiLockBrakes === 1 ? "ON" : "OFF"}`}</div></td>
                                    </tr>
                                    <tr style={{}}>
                                        <td style={{ "textAlign": "right", "fontSize": "1rem" }}>TC:</td>
                                        <td style={{ "textAlign": "left", "fontWeight": "bold" }} className='d-flex'><div>{`${data.m_tractionControl === 1 ? "ON" : "OFF"}`}</div></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </>
        )
    }

    let lapHistory = (data) => {
        return (
            <>
                <div  >
                    <div className='row' style={{ "textAlign": "center", "fontSize": "1rem", "fontWeight": "bold" }}>
                        <div className='col'>
                            Lap History
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12' >
                            <table className="table table-damage table-striped" style={{ "textAlign": "center" }}>
                                <tbody >
                                    {data && data.m_lapHistoryData && data.m_lapHistoryData.map((lapdata, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}-</td>
                                            <td>{utils.formatTime(lapdata.m_lapTimeInMS)}</td>
                                        </tr>
                                    ))

                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </>
        );
    }

    let tyreSets = (data) => {
        return (
            <>
                <div  >
                    <div className='row' style={{ "textAlign": "center", "fontSize": "1rem", "fontWeight": "bold" }}>
                        <div className='col'>
                            Sets
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12' >
                            <table className="table table-damage" style={{ "textAlign": "center" }}>
                                <tbody >
                                    {data && data.m_tyreSetData && data.m_tyreSetData.filter((setdata) => setdata.m_available === 1).map((setdata, index) => (
                                        <tr key={index} className={setdata.m_fitted === 1 ? 'selected-tyre-set' : ''}>
                                            <td ><div className='image' style={
                                                {
                                                    "backgroundImage": ` url('dash/${visualTyreCompoundName[setdata.m_visualTyreCompound]}.svg')`,
                                                    "height": "1.2rem", "width": "1.2rem",
                                                    "opacity": setdata.m_available === 1 ? "1" : "0.4"

                                                }}>

                                            </div>
                                            </td>
                                            <td>{setdata.m_wear}%</td>
                                        </tr>
                                    ))

                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <body data-bs-theme="dark">
                <div style={{ "paddingLeft": "1em", "paddingRight": "1em" }} >
                    <div className='session-header'>

                        {sessionHeader()}

                    </div>
                    <div className='session-flag' style={{ "display": sessionData.safetyCarStatus === 1 || sessionData.safetyCarStatus === 2 ? "block" : "none" }}>
                        {safetyCarStatus[sessionData.safetyCarStatus]}
                    </div>

                    <div className='session-details'>
                        <div className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12'>

                                <table className="table table-hover table-striped session-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Gap</th>
                                            <th scope="col">Tyre</th>
                                            <th scope="col">ERS</th>
                                            <th scope="col">Dmg</th>
                                            <th scope="col">Fastest</th>
                                            <th scope="col">Last</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sessionData && sessionData.playerData ? sessionData.playerData.sort((a, b) => a.carPosition - b.carPosition).map((data, index) => (
                                            <tr key={index} onClick={() => { setPlayerIdx(data.playerCarIndex); console.log("Clicked row ", data.playerCarIndex) }}>
                                                <th scope="row">{data.carPosition}</th>
                                                <td>{getPlayerName(data)}</td>
                                                <td style={{ "textAlign": "right" }}>+{utils.formatTimeNoNeg(data.delta)}</td>
                                                <td>
                                                    <div style={{ "display": "flex" }}>
                                                        <div className='col-12 image' style={
                                                            {
                                                                "backgroundImage": ` url('dash/${visualTyreCompoundName[data.visualTyreCompound]}.svg')`,
                                                                "height": "1.5rem", "width": "1.5rem"
                                                            }}>

                                                        </div>
                                                        <div style={{ "color": utils.getAdvColor(data.tyresWear / 100) }}>
                                                            {Math.round(data.tyresWear)}%
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ "textAlign": "right", "color": "#FFFF00" }}>{Math.round(+data.ersStoreEnergy / 4000000 * 100)}%</td>
                                                <td style={{ "textAlign": "right", "color": utils.getAdvColor(data.damage / 100) }}>{Math.round(data.damage)}%</td>
                                                <td>{utils.formatTime(data.bestLapTime)}</td>
                                                <td>{utils.formatTime(data.lastLapTime)}</td>
                                                <td>{getPenaltyValue(data)}</td>
                                            </tr>
                                        )) : null}
                                    </tbody>
                                </table>
                            </div>
                            <div className=' col-lg-6 col-md-12 col-sm-12'>
                                <div className='row'>
                                    <div className='col-12'>
                                        {playerData?.m_name}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-10'>
                                        <div className='row'>
                                            <div className='col-6'>
                                                {tyreChart(playerData)}
                                            </div>
                                            <div className='col-6'>
                                                <div className='row'>
                                                    {damageChart(playerData)}
                                                </div>
                                                <div className='row'>
                                                    {fuelChart(playerData)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-2'>

                                            </div>
                                            <div className='col-6'>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-2'>
                                        {lapHistory(playerData)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}

export default Dashboard;