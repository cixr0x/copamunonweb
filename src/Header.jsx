import React from 'react';


function Header(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ "padding": "0px" }}>
        <div className="container-fluid header-color" style={{ "margin": "0px", "padding": "0px" }}>
          <a className="" href="home" style={{ "paddingTop": "0px", "paddingBottom": "0px" }}><img src="headermunon.png" alt="" width="100%" height="100%" className="d-inline-block align-text-top"></img></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link ${props.page === "calendar" ? "active" : ""}`} aria-current="page" href="calendar">CALENDARIO</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${props.page === "standings" ? "active" : ""}`} href="standings">RESULTADOS</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${props.page === "drivers" ? "active" : ""}`} href="drivers" >
                  PILOTOS
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${props.page === "rules" ? "active" : ""}`} href="rules">REGLAMENTO</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="social-media-links row justify-content-around text-center">
        <div className="col-2">

          <a href="https://www.instagram.com/copamunonlatam" target="_blank" rel="noreferrer">
            <div className="image social-icon" style={{ "backgroundImage": `url('social/instagram.png')` }} alt="Instagram" /> <div className="social-text">Instagram</div>
          </a>
        </div>
        <div className="col-2">
          <a href="https://www.facebook.com/copamunon" target="_blank" rel="noreferrer">
            <div className="image social-icon" style={{ "backgroundImage": `url('social/facebook.png')` }} alt="Facebook" />  <div className="social-text">Facebook</div>
          </a>
        </div>
        <div className="col-2">
          <a href="https://www.tiktok.com/@copamunon" target="_blank" rel="noreferrer">
            <div className="image social-icon" style={{ "backgroundImage": `url('social/tiktok.png')` }} alt="TikTok" />  <div className="social-text">TikTok</div>
          </a>
        </div>
        <div className="col-2">
          <a href="https://twitter.com/Copamunon" target="_blank" rel="noreferrer">
            <div className="image social-icon" style={{ "backgroundImage": `url('social/twitter.png')` }} alt="Twitter" />  <div className="social-text">Twitter</div>
          </a>
        </div>
        <div className="col-2">
          <a href="https://www.youtube.com/@copamunon" target="_blank" rel="noreferrer">
            <div className="image social-icon" style={{ "backgroundImage": `url('social/youtube.png')` }} alt="YouTube" />  <div className="social-text">YouTube</div>
          </a>
        </div>
      </div>
    </>
  );
}
export default Header;