import React from 'react';

function Card(props) {
    
    return (
        <div className="card" style={{ "borderColor": props.constructorColor, "borderWidth": "0px" ,"minHeight":"295px" }}>
            <div className="card-body" style={{ 'padding': '0.5rem', 'padding-top': '0.8rem' }}>

                <div className="row g-0  justify-content-center margin-bot">

                    <div className='col-12 image  ' onClick={() => window.open(props.facebook != "" ? props.facebook : props.twitch != "" ? props.twitch : props.kick)} style={
                        {
                            "backgroundImage": `url('driver_icon/${props.driverImage}.jpg'), url('driver_icon/${props.driverImage}.png')`,
                            "height": "300px", "width": "240px", "borderRadius": "24px"
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
                <div className='row align-items-center justify-content-center margin-bot'>
                    <div className="col-12">
                        <a href={props.kick} style={{ "display": props.kick ? "block" : "none" }} target="_blank">
                            <div className="row g-0">
                                <div className=' col-2  driver-media-icon' style={
                                    { "backgroundImage": `url('https://play-lh.googleusercontent.com/66czInHo_spTFWwLVYntxW8Fa_FHCDRPnd3y0HT14_xz6xb_lqSv005ARvdkJJE2TA=w240-h480-rw')` }}></div>
                                <span className='col-10 driver-media-link'>{props.kick?.replace("https://kick.com/", "kick/")}</span>
                            </div>
                            
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Card;