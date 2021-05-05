import './static/register.css';
import Navbar from '../../components/navbar/nav';
import Button  from '../../components/button/loginbtn';
import Togglebtn from '../../components/button/togglebnt';
import Formbtn from './../../components/button/formbtn';
import  useForm  from '../../utils/hooks/useForm'
import { validateRegistrationInput as validate }from '../../utils/validateInput'
 

let Register = ({submitForm}) =>{   
        const {handleChange,values,handleSubmit,errors} = useForm(submitForm,validate);
        let errorStyles = {
            color: 'red',
            fontSize: '90%'
        }  
    
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
                    <form className="form-group" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-address-card"></i>
                                        <label htmlFor="firstName">
                                            first name
                                        </label> 
                                    </div>   
                                    <div>
                                        <input 
                                        id="firstName" 
                                        type="text"
                                        name="firstName" 
                                        placeholder="john"    
                                        onChange={handleChange} 
                                        value = {values.firstName}
                                        required                                   
                                        />
                                    </div>             
                                </div>
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-address-card"></i>
                                        <label htmlFor="lname">
                                            last name
                                        </label> 
                                    </div>   
                                    <div>
                                        <input 
                                        id="lastName"
                                        type="text" 
                                        name="lastName" 
                                        placeholder="doe"    
                                        onChange={handleChange}  
                                        value = {values.lastName}
                                        required
                                        />
                                    </div> 
                                </div>
                            </div>  
                            <div className="row">
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-envelope"></i>
                                        <label htmlFor="email">
                                            email (optional)
                                        </label> 
                                    </div>   
                                    <div>
                                        <input 
                                        id="email"
                                        type="email"
                                        name="email" 
                                        placeholder="john@mail.com"  
                                        onChange={handleChange}
                                        value = {values.email}  
                                        />
                                    </div>             
                                </div>
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-phone-alt"></i>
                                        <label htmlFor="phone">
                                            phone number
                                        </label> 
                                    </div>   
                                    <div>
                                        <input 
                                        id="phone"
                                        type="text" 
                                        name="phone" 
                                        placeholder="ex: 07XX XXX XXX"
                                        onChange={handleChange}  
                                        value = {values.phone}
                                        required
                                        />
                                    </div> 
                                </div>
                            </div>  
                            <div className="row">
                            <div className="form-col">
                                    <div>
                                        <i className="fas fa-lock"></i>
                                        <label htmlFor="password">
                                            password
                                        </label> 
                                    </div>   
                                    <div>
                                        <input
                                        id="password"
                                        type="password" 
                                        name="password" 
                                        placeholder="******" 
                                        required   
                                        onChange={handleChange}  
                                        value = {values.password}
                                        />
                                    </div>
                                    <label id="error" 
                                        style={errorStyles}>
                                        {errors.password}
                                        </label> 
                                </div>
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-lock"></i>
                                        <label htmlFor="retypepass">
                                            retype password
                                        </label>                                     
                                    </div>   
                                    <div>
                                        <input
                                        id="retypepass"
                                        type="password" 
                                        name="password2" 
                                        placeholder="retype password" 
                                        required   
                                        onChange={handleChange}  
                                        value = {values.password2 }
                                        />
                                    </div> 
                                    <label id="error" style={errorStyles}>
                                            {errors.password2}
                                        </label>
                                </div>
                            </div> 
                            <div className="row">
                                <Formbtn name="create account" />
                            </div>                 
                    </form>
                    <span>Already have an account? <a href="/login">login</a></span>
            </div>
        </div>
        </>
    )
};

export default Register;