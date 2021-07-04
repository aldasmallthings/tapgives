import React from 'react';
import './style.css';
import Navbar from '../../components/navbar/nav';
import UserProfile  from '../../components/profile/profile';
import Formbtn from './../../components/button/formbtn';
import ProfileForm from '../../utils/hooks/profileHook';

let Profile = ()=>{
    let { handleLoad,handleSubmit,handleChange } = ProfileForm();
    let currentValues = handleLoad();
    document.title = 'Tapgives - Edit Profile'
    return(
        <>
        <Navbar component = {UserProfile}/>
        <div className='profile'>  
            <div className="profile-banner">manage your account</div>          
            <form className="form-group" onSubmit={handleSubmit}>
                    <div className="row">
                        <div  className="label">
                            <i class="fas fa-envelope"></i>
                            <label>
                                Username
                            </label> 
                        </div>   
                        <div>
                            <input type="text" name="text" placeholder={currentValues.name}
                            onChange={handleChange}
                            />
                        </div> 
                    </div> 
                    <div className="row">
                        <div  className="label">
                            <i class="fas fa-envelope"></i>
                            <label>
                                Email
                            </label> 
                        </div>   
                        <div>
                            <input type="email" name="email" placeholder={currentValues.email}
                            onChange={handleChange}
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
                            <input type="password" name="lname" placeholder="Enter a new password" 
                            onChange={handleChange}
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
                            <input type="text" name="phone" placeholder={currentValues.phone}
                            onChange={handleChange}
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
                            <input type="text" name="location" placeholder={currentValues.location}
                            onChange={handleChange}
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
                                <input type="text" placeholder={currentValues.subscription} 
                                onChange={handleChange}
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
    )
};

export default Profile;