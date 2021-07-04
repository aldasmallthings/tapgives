import React from 'react'
import Navbar from '../../components/navbar/nav'
import Button  from '../../components/button/regbtn';
import { Link } from 'react-router-dom';
import './static/login.css'
import LoginForm from '../../utils/hooks/loginForm'

let Login= ({loginRedirect}) => {
    
    let {errors,handleChange,handleSubmit } = LoginForm();
    document.title = 'Tapgives - Login';
        return(
            <>
                <Navbar component={Button} />
                <div className="login-container">
                    <div className="login-banner" >
                        login to manage your account and subscriptions
                    </div>
                    <div className="login-redirect">{loginRedirect}</div>
                    <div className="login-error" >
                        {errors.loginerror }
                    </div>
                    <form className="login-form-group" onSubmit={handleSubmit}>
                        <div className="login-form-col">                            
                            <div className="label">
                                <i className="fas fa-phone"></i>
                                <label>
                                    Phone
                                </label> 
                            </div> 
                            <div className="phone-error" >
                                {errors.phone}
                            </div>  
                            <div>
                                <input name = "phone" type="text" placeholder=" 07** *** ***" required
                                onChange={handleChange}
                                />
                            </div>             
                        </div>
                        <div className="login-form-col">
                            <div className="label">
                                <i className="fas fa-envelope"></i>
                                <label>
                                    email
                                </label> 
                            </div>   
                            <div>
                                <input name = "email" type="email" placeholder="user@mail.com" required
                                onChange={handleChange}
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
                                <input type="password"  name = "password" placeholder="********" required
                                onChange={ handleChange }
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
                    dont have an account ? 
                    <span>
                        <Link to="/sign-up" className="redirect-link" > Click here </Link> 
                        </span> 
                    to get started.
                </div>
                </div>
            </>
        )
}

export default Login;