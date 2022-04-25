import React, { useState, useEffect } from 'react';
import Card from './Card';
import * as utils from '../utils/utils';
import Header from './../Header';

function Calendar(props) {
    const [calendar, setCalendar] = useState(null)
    useEffect(() => {
        fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2jdOTuzcVNCGCfp3MyBkGixD9V94JJJGXHE0yoVSLM/values/calendar?key=AIzaSyCle5ZUmaO3Skg_ClkzY9f9Q2760Rk442A")
        .then(res => res.json())
        .then((data) => {
          console.log(utils.transformGoogleSheetValues(data.values));
          setCalendar(utils.transformGoogleSheetValues(data.values));
        })
        .catch(console.log)
      }, []);
    let cards = null;

    if (calendar) {
        cards = calendar.map((calendarItem) => {
            return (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <Card
                date={calendarItem.date_text}
                country={calendarItem.country}
                circuit={calendarItem.circuit}
                track={calendarItem.track}
                flag={calendarItem.flag}
            ></Card>
            </div>
            );
        });
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