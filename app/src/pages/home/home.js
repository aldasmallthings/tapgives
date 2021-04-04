import React from 'react'
import Navbar from '../../components/navbar/nav';
import Profile from '../../components/profile/profile'
import './style.css'


let Home =()=>{
    return (
    <>
    <div className="homepage">
        <Navbar component={Profile} />
        <div className="banner">
            thankyou for joining the tapgive community
        </div>
        <div className="content">
            <div className="content-header">
                visit your local water access station to get started
            </div>
            <div className="content-row">
                <div className="content-col">
                    <div className="icon">
                        <i className="far fa-clock"></i>
                    </div>
                    <div className="detail">
                        <h5>your station hours:</h5>
                        <h6>mon-fri: 7:00 am to 7:00 pm<br/> sat-sun: 6:00 am to 6:00 pm</h6>
                    </div>
                </div>
                <div className="content-col">
                    <div className="icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="detail">
                        <h5>how to get there:</h5>
                        <h6>exampleroad,neighborhood<br/> city,PRPQ + CQ</h6>
                    </div>
                </div>
            </div>
            <div className="content-row">              
                <div className="content-col">              
                    <div className="icon">
                        <i class="fas fa-archive"></i>
                    </div>
                    <div className="detail">
                        <h5>how to get there:</h5>
                        <h6>mon-fri: 7:00 am to 7:00 pm<br /> sat-sun: 6:00 am to 6:00 pm</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default Home;