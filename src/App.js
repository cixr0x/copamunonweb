import logo from './logo.svg';
import './App.css';
import "bootswatch/dist/lux/bootstrap.min.css";
import Header from './Header';
import Calendar from './calendar/Calendar';
import Standings from './standings/Standings';
import Drivers from './drivers/Drivers';
import Gallery from './gallery/Gallery';
import Rules from './rules/Rules';
import Sponsors from './sponsors/Sponsors';
import Driveroftheday from './driveroftheday/Driveroftheday';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Results from './driveroftheday/Results';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/home" element={<Calendar />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/standings" element={<Standings />} />        
        <Route path="/rules" element={<Rules />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/pilotodeldia" element={<Driveroftheday />} />
        <Route path="/dodd-results" element={<Results />} />
        <Route path="/:league" element={<Calendar />} />
        <Route path="/:league/home" element={<Calendar />} />
        <Route path="/:league/calendar" element={<Calendar />} />
        <Route path="/:league/drivers" element={<Drivers />} />
        <Route path="/:league/standings" element={<Standings />} />
        <Route path="/:league/gallery" element={<Gallery />} />
        <Route path="/:league/rules" element={<Rules />} />
      </Routes>
      
    </div>
  );
}

export default App;
