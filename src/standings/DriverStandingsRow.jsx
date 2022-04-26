import React, { useState, useEffect } from 'react';

function DriverStandingRow(props) {
    return (
        <tr>
            <th scope="row">{props.rank}</th>
            <td>
            <div className='row align-items-center'>
                    <div className='col-xs-2 col-sm-2  driver-table-constructor-image hide-small' style={
                        { "backgroundImage": `url('${props.driverImage}')` }}></div><div className='col-xs-10 col-sm-10'>{props.driverName}</div>
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

            <td>{props.points}</td>
        </tr>
    );
}

export default DriverStandingRow;