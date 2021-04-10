import React, { Component } from 'react';
import axios from 'axios'
import './register.css'
import Navbar from '../../components/navbar/nav'
import Button  from '../../components/button/loginbtn';
import Togglebtn from '../../components/button/togglebnt'
import Formbtn from './../../components/button/formbtn'

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {display: 'none'};
        this.errorstyle = this.errorstyles.bind(this);
        this.defaultUser = 'subscriber'        
    }

    errorstyles =()=> {
        return({
            style : {
            display:this.state.display
            }
        })
    }
    
    handleSubmit = e =>{
        e.preventDefault();
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3000');
        let data = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            phone: this.phone,
            password: this.password,
            usertype: this.defaultUser,
        }
        axios.post('http://127.0.0.1:4000/api​/v1​/auth​/register',data,{headers:{headers}})
            .then(response=>console.log(response))
            .catch(err=>console.log(err))
    }
    
    validatePassword = val =>{
        let retyped_pass = val;
        if (retyped_pass === this.password) {
            this.setState({display:'none'})
        } else{
            this.setState({display:''})
        }
    }
    
    render(){
    return(
        <>
        <Navbar component = {Button}/>
        <div className='register'>
            <div className="welcome">
                <div className="gradient-text-top">welcome to tapgives.</div>
                <div className="gradient-text">a place to empower</div>
                <div className="gradient-text">and to be empowered.</div>
            </div>
            <div className = "language">
                change your language <Togglebtn />
            </div>
            <div className="register-form">
                <div className="formtext">Join the global community and access local resources.<br />
                    Get started with your account today.</div>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-address-card"></i>
                                        <label>
                                            first name
                                        </label> 
                                    </div>   
                                    <div>
                                        <input type="text" name="fname" placeholder="john" required
                                        onChange={e => this.firstName = e.target.value}
                                        />
                                    </div>             
                                </div>
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-address-card"></i>
                                        <label>
                                            last name
                                        </label> 
                                    </div>   
                                    <div>
                                        <input type="text" name="lname" placeholder="doe" required
                                        onChange={e => this.lastName = e.target.value}
                                        />
                                    </div> 
                                </div>
                            </div>  
                            <div className="row">
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-envelope"></i>
                                        <label>
                                            email (optional)
                                        </label> 
                                    </div>   
                                    <div>
                                        <input type="email" name="fname" placeholder="john@mail.com"
                                        onChange={e => this.email = e.target.value}
                                        />
                                    </div>             
                                </div>
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-phone-alt"></i>
                                        <label>
                                            phone number
                                        </label> 
                                    </div>   
                                    <div>
                                        <input type="text" name="lname" placeholder="ex: 07XX XXX XXX" required
                                        onChange={e => this.phone = e.target.value}
                                        />
                                    </div> 
                                </div>
                            </div>  
                            <div className="row">
                            <div className="form-col">
                                    <div>
                                        <i className="fas fa-lock"></i>
                                        <label>
                                            password
                                        </label> 
                                    </div>   
                                    <div>
                                        <input type="password" name="lname" placeholder="******" required
                                        onChange={e => this.password = e.target.value}
                                        />
                                    </div> 
                                </div>
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-lock"></i>
                                        <label>
                                            retype password
                                        </label>                                     
                                    </div>   
                                    <div>
                                        <input type="password" name="lname" placeholder="retype password" required
                                        onChange={e=>this.validatePassword(e.target.value)}
                                        />
                                    </div> 
                                    <label id="error" style={this.errorstyles().style}>
                                            PASSWORDS DO NOT MATCH!
                                        </label>
                                </div>
                            </div> 
                            <div className="row">
                                <Formbtn name="create account" />
                            </div>                 
                    </form>
            </div>
        </div>
        </>
    )}
};