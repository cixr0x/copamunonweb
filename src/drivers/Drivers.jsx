import React, { useState, useEffect } from 'react';
import * as utils from '../utils/utils';
import Header from './../Header';

function Drivers() {
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    useEffect(() => {

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/drivers?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
            .then(res => res.json())
            .then((data) => {
                console.log(utils.transformGoogleSheetValues(data.values));
                setDrivers(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log);

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/constructors?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
            .then(res => res.json())
            .then((data) => {
                console.log(utils.transformGoogleSheetValues(data.values));
                setConstructors(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log);
    }, []);
    let table = [];
    let tableData = [];
    if (drivers && constructors) {
        for (let driver of drivers) {
            let obj = {};
            obj["driver"] = driver;
            obj["constructor"] = constructors.find((constructor) => {
                return constructor.code === driver.constructor;
            });
            tableData.push(obj);
        }

        console.log(tableData);


        for (let data of tableData) {
            table.push(
                <DriverRow
                    flag={data.driver?.flag}
                    driverImage={data.driver?.profileimg}
                    driverName={data.driver?.name}
                    constructorLogo={data.constructor?.logo}
                    constructorName={data.constructor?.name}
                    twitch={data.driver?.twitch}
                    facebook={data.driver?.facebook}
                    constructorColor={data.constructor?.color}
                ></DriverRow>
            )
        }
    }


    return (
        <>
        <Header
            page="drivers"
        />
        <div className="calendar-cards-container">
            <h1>Pilotos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Piloto</th>
                        <th scope="col">Escudería</th>
                        <th scope="col">Medios</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
        </div>
        </>
    )

}

function DriverRow(props) {
    return (
        <tr>
            <td>
                <div className="driver-flag" style={
                    { "backgroundImage": `url('${props.flag}')` }}>

                </div>
            </td>
            <td>
                <div className='row align-items-center'>
                    <div className='col-xs-2 col-sm-2  driver-table-constructor-image' style={
                        { "backgroundImage": `url('${props.driverImage}')` }}></div><div className='col-xs-10 col-sm-10'>{props.driverName}</div>
                </div>
            </td>
            <td>
                <div className='row align-items-center'>
                    <div className='col-xs-2 col-sm-2 driver-table-constructor-image' style={
                        { "backgroundImage": `url('${props.constructorLogo}')` }}></div>
                        <div className='col-xs-10 col-sm-10'>
                        <div className='driver-table-constructor-splitter'
                            style={{ "backgroundColor": `${props.constructorColor}` }}>
                        </div>
                        <div style={{"display":"inline-block"}}>{props.constructorName}</div>
                    </div>
                </div>

            </td>

            <td>
                <div className='row align-items-center'>
                    <div className="col-6">
                        <a href={props.facebook} style={{ "display": props.facebook?"block":"none"}} target="_blank">
                            <div className='driver-media-icon' style={
                                { "backgroundImage": `url('https://img.utdstc.com/icon/27d/0f4/27d0f494dfd78a41e2bad9f0425d98bf05125ada2a1a94c0eead6e73d8dab136:200')` }}>

                            </div>
                        </a>
                    </div>
                    <div className="col-6">
                        <a href={props.twitch}  style={{ "display": props.twitch?"block":"none"}} target="_blank">
                            <div className='driver-media-icon' style={
                                { "backgroundImage": `url('https://cdn-icons-png.flaticon.com/512/5968/5968819.png')` }}></div>
                        </a>
                    </div>
                </div></td>
        </tr>
    )
}

export default Drivers;