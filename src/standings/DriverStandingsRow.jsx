import React, { useState, useEffect } from 'react';

function DriverStandingRow(props) {
    let points = () => {
        if (props.deductedPoints===0) {
            return <td>{props.finalPoints}</td>;
        } else {
            return <td>{props.finalPoints}  <span style={{"color":"#AAAAAA", "fontSize": "small"}}>({props.totalPoints} - {props.deductedPoints})</span></td>;
        }
    }
    return (
        <tr>
            <th scope="row">{props.rank}</th>
            <td>
            <div className='row align-items-center'>
                    <div className='col-xs-2 col-sm-2  driver-table-constructor-image hide-small' style={
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

            {points()}
        </tr>
    );
}

export default DriverStandingRow;