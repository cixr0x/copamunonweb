import React from 'react';

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{"padding":"0px"}}>
        <div className="container-fluid " style={{"margin":"0px","padding":"0px"}}>
          <a className="navbar-brand" href="home" style={{"paddingTop":"0px","paddingBottom":"0px"}}><img src="headermunon.png" alt="" width="100%" height="100%" className="d-inline-block align-text-top"></img></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link ${props.page==="calendar"?"active":""}`} aria-current="page" href="calendar">CALENDARIO</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${props.page==="standings"?"active":""}`} href="standings">RESULTADOS</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${props.page==="drivers"?"active":""}`} href="drivers" >
                  PILOTOS
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${props.page==="gallery"?"active":""}`} href="gallery">GALERÍA</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${props.page==="rules"?"active":""}`} href="rules">REGLAMENTO</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Header;