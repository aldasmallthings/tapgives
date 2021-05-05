import React, { Component } from 'react';
import axios from 'axios'
import './style.css'
// import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/nav'
import UserProfile  from '../../components/profile/profile';
import Formbtn from './../../components/button/formbtn'

export default class Profile extends Component{
    
    handleSubmit = e =>{
        e.preventDefault();
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3000');
        let data = {
            email: this.email,
            password: this.password,
            phone: this.phone,
            project: this.project,
            subscription: this.subscription
        }
        axios.post('http://127.0.0.1:4000/api​/v1​/auth​/register',data,{headers:{headers}})
            .then(response=>console.log(response))
            .catch(err=>console.log(err))
    }
    
    render(){
    return(
        <>
        <Navbar component = {UserProfile}/>
        <div className='profile'>  
            <div className="profile-banner">manage your account</div>          
            <form className="form-group" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div  className="label">
                            <i class="fas fa-envelope"></i>
                            <label>
                                email
                            </label> 
                        </div>   
                        <div>
                            <input type="email" name="fname" placeholder="john@mail.com"
                            onChange={e => this.email = e.target.value}
                            />
                        </div> 
                    </div> 
                    <div className="row">
                        <div  className="label">
                            <i className="fas fa-lock"></i>
                            <label>
                                password
                            </label> 
                        </div>   
                        <div>
                            <input type="password" name="lname" placeholder="*********" 
                            onChange={e => this.password = e.target.value}
                            />
                        </div> 
                    </div>   
                    <div className="row">
                        <div  className="label">
                            <i className="fas fa-phone-alt"></i>
                            <label>
                                phone number / MPESA 
                            </label> 
                        </div>   
                        <div>
                            <input type="text" name="lname" placeholder="ex: 07XX XXX 942"
                            onChange={e => this.phone = e.target.value}
                            />
                        </div> 
                    </div>                       
                    <div className="row">
                        <div  className="label">
                            <i class="fas fa-map-marker-alt"></i>
                            <label>
                                access point/location
                            </label> 
                        </div>   
                        <div>
                            <input type="email" name="fname" placeholder="john@mail.com"
                            onChange={e => this.project = e.target.value}
                            />
                        </div>             
                    </div>    
                    <div className="row">
                        <div className="label">
                            <i class="fas fa-address-card"></i>
                            <label>
                                subscription
                            </label>                                     
                        </div>   
                        <div>
                            <div>
                                <input type="text" placeholder="retype password" 
                                onChange={e => this.subscription = e.target.value}
                                />
                            </div>                            
                        </div>                            
                    </div>
                    <div className="row-button">
                        <div>
                            <Formbtn name="save changes" />
                        </div>
                        <div className="cancel-subscription">
                            cancel subscription
                        </div>
                    </div>                 
            </form>
        </div>
        </>
    )}
};