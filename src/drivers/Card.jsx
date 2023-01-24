import React from 'react';

function Card(props) {
    return (
        <div className="card" style={{ "borderColor": props.constructorColor, "borderWidth": "2px" ,"minHeight":"295px" }}>
            <div className="card-body" style={{ 'padding': '0.5rem', 'padding-top': '0.8rem' }}>

                <div className="row g-0  justify-content-center margin-bot">
                    <div className='col-12 image  ' style={
                        {
                            "backgroundImage": `url('driver_icon/${props.driverImage}.jpg'), url('driver_icon/${props.driverImage}.png')`,
                            "height": "100px", "width": "100px", "borderRadius": "24px"
                        }}>

                    </div>
                </div>
                <div className="row g-0 justify-content-center ">
                    <h5 className="card-title" style={{ "textAlign": "center" }}>{props.driverName}</h5>
                </div>
                <div className="row g-0 justify-content-center margin-bot">


                    <div className="trackimage" style={
                        {
                            "width": "40px",
                            "height": "32px",
                            "backgroundImage": `url('${props.flag}')`,
                            "backgroundRepeat": "no-repeat",
                            "backgroundPosition": "center",
                            "backgroundSize": "contain",
                            "border": "1px solid #FFFFFF",
                        }}>
                    </div>

                </div>
                <div className='row align-items-center justify-content-center margin-bot'>
                    <div className="col-12">

                        <a href={props.facebook} style={{ "display": props.facebook ? "block" : "none" }} target="_blank">
                            <div className="row g-0">
                                <div className='col-2 driver-media-icon' style={
                                    { "backgroundImage": `url('https://img.utdstc.com/icon/27d/0f4/27d0f494dfd78a41e2bad9f0425d98bf05125ada2a1a94c0eead6e73d8dab136:200')` }}>

                                </div>

                                <span className='col-10 driver-media-link'>{props.facebook?.replace("https://www.facebook.com/", "fb/")}</span>
                            </div>
                        </a>

                    </div>
                </div>
                <div className='row align-items-center justify-content-center margin-bot'>
                    <div className="col-12">
                        <a href={props.twitch} style={{ "display": props.twitch ? "block" : "none" }} target="_blank">
                            <div className="row g-0">
                                <div className=' col-2  driver-media-icon' style={
                                    { "backgroundImage": `url('https://cdn-icons-png.flaticon.com/512/5968/5968819.png')` }}></div>
                                <span className='col-10 driver-media-link'>{props.twitch?.replace("https://www.twitch.tv/", "ttv/")}</span>
                            </div>
                            
                        </a>
                    </div>
                </div>

                <div className='row g-0 align-items-center margin-bot'>
                    <div className='col-2 driver-table-constructor-image' style={
                        { "backgroundImage": `url('${props.constructorLogo}')` }}></div>

                    <div className='col-8' style={{ 'font-size': 'smaller' }}>{props.constructorName}</div>
                </div>


            </div>
        </div>
    );
}

export default Card;