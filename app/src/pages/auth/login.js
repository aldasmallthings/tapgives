import React, {Component} from 'react'
import Navbar from '../../components/navbar/nav'
import Button  from '../../components/button/regbtn';
import { Link } from 'react-router-dom';
import './static/login.css'

export default class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        let data = {
            username:this.email,
            password : this.password
        }
        fetch('http://localhost:4000/api/v1/auth/jwt/login',{
            method:'POST',
            body: JSON.stringify(data),
            header:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        .then(e=> JSON.stringify(e) )
        .then(e=> console.log(e))
        .catch(error=>console.log(error))
    }

    render() {
        return(
            <>
                <Navbar component={Button} />
                <div className="login-container">
                    <div className="login-banner" >
                        login to manage your account and subscriptions
                    </div>
                    <form className="login-form-group" onSubmit={this.handleSubmit}>
                        <div className="login-form-col">
                            <div className="label">
                                <i className="fas fa-envelope"></i>
                                <label>
                                    email
                                </label> 
                            </div>   
                            <div>
                                <input type="email" placeholder="user@mail.com" required
                                onChange={e => this.email = e.target.value}
                                />
                            </div>             
                        </div>
                        <div className="login-form-col">
                            <div className="label">  
                                <i className="fas fa-lock"></i>
                                <label>
                                    password
                                </label> 
                            </div>   
                            <div>
                                <input type="password" placeholder="********" required
                                onChange={e => this.password = e.target.value}
                                />
                            </div> 
                        </div> 
                        <div className="login-form-col">
                            <button className="submit">
                                login
                            </button>
                        </div>                                         
                </form>
                <div className="login-redirect">
                    dont have an account?  
                    <span>
                        <Link to="/sign-up"  className="login-redirect-link" > click here </Link> 
                        </span> 
                    to get started.
                </div>
                </div>
            </>
        )
    }
}