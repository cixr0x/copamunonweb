import React, { useState, useEffect } from 'react';
import Card from './Card';
import * as utils from '../utils/utils';
import Header from './../Header';

function Calendar(props) {
    const [calendar, setCalendar] = useState(null)
    const [eventResults, setEventResults] = useState(null);
    const [drivers, setDrivers] = useState(null);
    const [constructors, setConstructors] = useState(null);
    useEffect(() => {
        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/events?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
        .then(res => res.json())
        .then((data) => {
          console.log(utils.transformGoogleSheetValues(data.values));
          setCalendar(utils.transformGoogleSheetValues(data.values));
        })
        .catch(console.log)

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
            .catch(console.log);
      }, []);

    let cards = null;

    if (calendar && eventResults && drivers && constructors) {
        cards = calendar.map((calendarItem) => {
            return (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 margin-bot">
            <Card
                date={calendarItem.date_text}
                country={calendarItem.country}
                circuit={calendarItem.circuit}
                track={calendarItem.track}
                flag={calendarItem.flag}
                round={calendarItem.round}
                winner = {getGPwinner(calendarItem.code)}
            ></Card>
            </div>
            );
        });
    }
    
    function getGPwinner(gp) {
        let winner  = "";
        let topscore  = 0;
        for (let results of eventResults) {
            let driver = drivers.find((driver) => {
                return driver.code === results["driver_code"];
            });
            let constructor = constructors.find((constructor)=> {
                return constructor.code === driver.constructor;
            });
            // console.log("constructor", constructor, winner);
            let score = Number(results[gp]);
            if (score > topscore)  {
                topscore = score;
                winner = {
                    driverName: driver.name,
                    driverPic: driver.profileimg, 
                    constructorLogo: constructor?.logo, 
                    constructorColor: constructor?.color
                }

            }
        }
        console.log("winner", constructor, winner);
        return winner;
    }

    return (
        <>
        <Header
            page="calendar"
        />
        <div className="calendar-cards-container">
            <h1>CALENDARIO COPA MUÑÓN 2022 </h1>
            <div className="row">                
                {cards}
            </div>
        </div>
        </>
    );
}

export default Calendar;