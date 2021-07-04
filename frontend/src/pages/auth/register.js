import React,{ useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/navbar/nav';
import Button  from '../../components/button/loginbtn';
import Togglebtn from '../../components/button/togglebnt';
import Formbtn from './../../components/button/formbtn';
import  apiUrls  from '../../utils/apiUrls'
import './static/register.css';


const Register = () =>{  
    document.title = 'Tapgives - Register';
    let router = useHistory();
    let [submit, setSubmit]= useState(true);
    let [ errors,setErrors ] = useState({
        password:'',
        registrationerrors:'',
        password2:''
    });

    let [data,setData] = useState({
            email:'',
            phone:'',
            password:'',
            password2:'',
            name:''
    })
    let handleSubmit = e =>{
        e.preventDefault();
        setErrors({
            password:'',
            registrationerrors:'',
            password2:''
        })
        if(data.password.length < 6){
            setSubmit(false)
            setErrors({
                ...errors,
                password:'Password is too short',
            })
            setData({
                ...data,
                password:'',
                password2:''
            })
        
        }
        if(data.password !== data.password2){
            setSubmit(false)
            setErrors({
                ...errors,
                password2:'Passwords do not match'
            })
            setData({
                ...data,
                password:'',
                password2:''
            })
        }
        if(errors.password > 0 || errors.password2 > 0 ){
            setSubmit(false)
            setData({
                ...data,
                password:'',
                password2:''
            })
        }
        if(submit){
            delete data.password2;
            
            console.log(data)
            fetch(apiUrls.register,{
                method:'POST',
                body:new URLSearchParams(data)
            })
            .then(res=>{
                if(res.status === 201){
                    router.push('/login')
                }else{
                    setErrors({
                        ...errors,
                        registrationerrors:'Error Logging you in try again later'
                    })
                    setData({
                        name:'',
                        email:'',
                        phone:'',
                        password:'',
                        password2:''
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                setErrors({
                    ...errors,
                    registrationerrors:'Error Logging you in try again later'
                })
                setData({
                    firstname:'',
                    lastname:'',
                    email:'',
                    phone:'',
                    password:'',
                    password2:''
                })
            })
            
        }

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
                    <div id="reg-error">{errors.registrationerrors}</div>
                    <form className="form-group" onSubmit={handleSubmit}>                        
                            <div className="row">
                                <div className="form-col">
                                    <div>
                                        <i className="fas fa-address-card"></i>
                                        <label htmlFor="firstName">
                                            Full Name
                                        </label> 
                                    </div>   
                                    <div>
                                        <input 
                                        id="name" 
                                        type="text"
                                        name="name" 
                                        placeholder="john"    
                                        onChange={e =>setData({...data,name:e.target.value})} 
                                        value = {data.name}
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
                                        onChange={e =>setData({...data,email:e.target.value})}
                                        value = {data.email}  
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
                                        onChange={e =>setData({...data,phone:e.target.value})} 
                                        value = {data.phone}
                                        required
                                        />
                                    </div> 
                                </div>
                            </div>  
                            <div className="row">
                            <div className="form-col">
                            <label id="error" 
                                        className="errors">
                                        {errors.password}
                                        </label> 
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
                                        onChange={e =>setData({...data,password:e.target.value})} 
                                        value = {data.password}
                                        />
                                    </div>
                                    
                                </div>
                                <div className="form-col">
                                <label id="error" 
                                    className="errors">
                                            {errors.password2}
                                        </label>
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
                                        placeholder="********" 
                                        required   
                                        onChange={e =>setData({...data,password2:e.target.value})}  
                                        value = {data.password2 }
                                        />
                                    </div> 
                                    
                                </div>
                            </div> 
                            <div className="row">
                                <Formbtn name="create account" />
                            </div>                 
                    </form><br />
                    <span>Already have an account ?  <Link to="/login" className = 'redirect-link'> Login </Link></span>
            </div>
        </div>
        </>
    )
};

export default Register;