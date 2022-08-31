import React from 'react';

function Card(props) {

    return (
        <div className="card" style={{"border":"none", "borderRadius": "8px", "boxShadow": "2px 4px 7px 0px #0000000D", "minHeight":"322px"
    }}>
            <div className="card-body">
                <div className="row g-0 justify-content-between">
                    <div className="col-8">
                        <div className="row ">
                            <div className="col-12">
                                <div className="calendar-card-round">{props.round}</div>
                            </div>
                        </div>
                        <div className="row margin-bot">
                            <div className="col-12">
                                <div> <span className="calendar-card-date">{props.date}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 ">
                    <div className="row g-0 justify-content-end ">
                        <div className="trackimage" style={
                            {
                                "width": "60px", "height": "32px",
                                "backgroundImage": `url('${props.flag}')`,
                                "backgroundRepeat": "no-repeat",
                                "backgroundPosition": "center",
                                "backgroundSize": "cover",
                                "border": "1px solid #949498",
                                "borderRadius": "6px"
                            }}>
                                </div>
                        </div>
                    </div>
                </div>

                <div className="row g-0">
                    <div className="col-12">
                        <div className="calendar-card-country-name">{props.country}</div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-12">
                        <div className="calendar-card-circuit-name">{props.circuit}</div>
                    </div>
                </div>
                <div className="row g-0 ">
                    <div className="col-12">
                        <div className="trackimage" style={
                            {
                                "width": "100%", "height": "120px",
                                "backgroundImage": `url('${props.track}')`,
                                "backgroundRepeat": "no-repeat",
                                "backgroundPosition": "center",
                                "backgroundSize": "contain"
                            }}>
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className='col-2' style={{"width":"35px"}}>
                        <div className='rounded-image' style={
                            { "backgroundImage": `url('${props.winner.driverPic}')`, "width":"30px", "height":"30px"}}>
                        </div>
                    </div>
                    <div className='col-8'>
                        {props.winner.driverName != "" ? props.winner.driverName : ""}
                    </div>
                    <div className='col-2' style={{"width":"35px"}}>
                        <div className='rounded-image' style={
                            { "backgroundImage": `url('${props.winner.constructorLogo}')`, "width":"30px", "height":"30px"}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;