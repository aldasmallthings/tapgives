import React, {Component} from 'react'
import Navbar from '../../components/navbar/nav'
import Button  from '../../components/button/regbtn';
import { Link } from 'react-router-dom';
import './login.css'

export default class Login extends Component {

    render() {
        return(
            <>
                <Navbar component={Button} />
                <div className="login-container">
                    <div className="login-banner" >
                        login to manage your account and subscriptions
                    </div>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <div className="form-col">
                            <div className="label">
                                <i className="fas fa-envelope"></i>
                                <label>
                                    email
                                </label> 
                            </div>   
                            <div>
                                <input type="email" name="email" placeholder="user@mail.com" required
                                onChange={e => this.email = e.target.value}
                                />
                            </div>             
                        </div>
                        <div className="form-col">
                            <div className="label">  
                                <i className="fas fa-lock"></i>
                                <label>
                                    password
                                </label> 
                            </div>   
                            <div>
                                <input type="password" name="password" placeholder="********" required
                                onChange={e => this.password = e.target.value}
                                />
                            </div> 
                        </div> 
                        <div className="form-col">
                            <button className="submit">
                                login
                            </button>
                        </div>                                         
                </form>
                <div className="redirect">
                    dont have an account?  
                    <span>
                        <Link to="/sign-up"  className="redirect-link" > click here </Link> 
                        </span> 
                    to get started.
                </div>
                </div>
            </>
        )
    }
}