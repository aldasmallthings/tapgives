import React from 'react';
import Navbar from '../../components/navbar/nav';
import UserProfile from '../../components/profile/profile'
import Formbtn from './../../components/button/formbtn'
import './subscribe.css'

function Subscribe() {
  return (
      <>
        <Navbar component = {UserProfile} />
        <div className="subscribe">
          <div className="subscribe-banner">
            <div className="gradient-top">
              Everyone deserves access to clean water.
            </div>
            <div className="gradient-text">            
              subscribe to a water access center near you.
            </div>
          </div>
          <form className="form">
            <div className="form-row">
              <div >
                <i class="fas fa-map-marker-alt"></i>
                <label>
                  your location
                </label>
              </div>
              <div>
                <input type="text" name="location" placeholder="your city, your estate"
                required></input>
              </div>
              </div>            
            <div className="form-text">
              <div className="header">
                whats in your subscription
              </div>
              <div className="row">
                <div className="text-col">
                  <div>                    
                    <i class="fas fa-money-bill"></i>
                  </div>
                  <div className="text-content">
                    <div id="head">
                      your subscription fee:
                    </div>
                    <div id="body">
                      200 KSH/month
                    </div>
                  </div>
                </div>
                  <div className="text-col">
                      <i class="fas fa-faucet"></i>
                    <div className="text-content">
                      <div id="head"> 
                        volume per borehole visit:
                      </div>
                      <div id="body">
                        2 jerry cans/day (40litres)
                      </div>
                    </div>
                  </div>
              </div>
              <div className="row">
                  <div className="text-footer">
                    <div>
                      subscribe to set up monthly payments through MPESA
                    </div>
                    <div>
                      and start accessing clean water for you and your family today.
                    </div>
                  </div>
              </div>           
            </div>
            <Formbtn name="subscribe" />
          </form>
        </div>
      </> 
  );
}
export default Subscribe;