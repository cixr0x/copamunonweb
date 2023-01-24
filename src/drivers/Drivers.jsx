import React, { useState, useEffect } from 'react';
import * as utils from '../utils/utils';
import Header from './../Header';
import Card from './Card';

function Drivers() {
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    useEffect(() => {

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/drivers?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
            .then(res => res.json())
            .then((data) => {
                setDrivers(utils.transformGoogleSheetValues(data.values));
            })
            .catch(console.log);

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/constructors?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
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
            table.push(
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 margin-bot" >
                <Card
                    flag={data.driver?.flag}
                    driverImage={data.driver?.code}
                    driverName={data.driver?.name}
                    constructorLogo={data.constructor?.logo}
                    constructorName={data.constructor?.name}
                    twitch={data.driver?.twitch}
                    facebook={data.driver?.facebook}
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

function DriverRow(props) {
    return (
        <tr>
            <td className='hide-small'>
                <div className="driver-flag hide-small" style={
                    { "backgroundImage": `url('${props.flag}')` }}>

                </div>
            </td>
            <td>
                <div className='row align-items-center' style={{"--bs-gutter-x": "0px", "flex-wrap":"nowrap"}}>
                    <div className='col-xs-2 col-sm-2  driver-table-constructor-image ' style={
                        { "backgroundImage": `url('driver_icon/${props.driverImage}.jpg'), url('driver_icon/${props.driverImage}.png')` }}></div><div className='col-xs-10 col-sm-10'>{props.driverName}</div>
                </div>
            </td>
            <td>
                <div className='row align-items-center'>
                    <div className='col-xs-2 col-sm-2 driver-table-constructor-image' style={
                        { "backgroundImage": `url('${props.constructorLogo}')` }}></div>
                        <div className='col-xs-10 col-sm-10 hide-small'>
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