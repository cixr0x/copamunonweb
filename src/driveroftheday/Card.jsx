import React from 'react';

function Card(props) {
    return (

        <div className="card" style={{ "borderColor": props.constructorColor, "borderWidth": "0px" ,"minHeight":"295px" }} >
            <div className="card-body" style={{ 'padding': '0.5rem', 'padding-top': '0.8rem' }}>

                <div className="row g-0  justify-content-center margin-bot">

                    <div className='col-12 image dodd-hover ' onClick={() => props.onclick(props.driverImage)} style={
                        {
                            "backgroundImage": `url('driver_icon/${props.driverImage}.jpg'), url('driver_icon/${props.driverImage}.png'), url('driver_icon/none.jpg')`,
                            "height": "300px", "width": "240px", "borderRadius": "24px", "textAlign":"center"
                        }}>
                        {props.driverRole !== "principal" ? "\n\n\n\n"+props.driverName:""}

                    </div>
                </div>
            </div>
        </div>
    
    );
}

export default Card;