import React from 'react';

function Card(props) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row justify-content-between">
                    <div className="col-8">
                        <div className="row ">
                            <div className="col-12">
                                <h5 className="card-title">{props.country}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h4> <span className="badge bg-primary">{props.date}</span></h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="trackimage" style={
                            {
                                "width": "80px", "height": "46px",
                                "backgroundImage": `url('${props.flag}')`,
                                "backgroundRepeat": "no-repeat",
                                "backgroundPosition": "center",
                                "backgroundSize": "contain",
                                "border": "1px solid #949498",
                                "border-radius": "6px"
                            }}>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <p className="card-text">{props.circuit}</p>
                    </div>
                </div>
                <div className="row ">
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
                <div className="row ">
                    <div className='col-2' style={{"width":"35px"}}>
                        <div className='rounded-image' style={
                            { "backgroundImage": `url('${props.winner.profileimg}')`, "width":"30px", "height":"30px"}}>
                        </div>
                    </div>
                    <div className='col-8'>
                        {props.winner.name != "" ? props.winner.name : ""}
                    </div>
                    <div className='col-2' style={{"width":"35px"}}>
                        <div className='rounded-image' style={
                            { "backgroundImage": `url('${props.winner.constructorpic}')`, "width":"45px", "height":"45px"}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;