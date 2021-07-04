import React from 'react'
import Navbar from '../../components/navbar/nav';
import UserProfile from '../../components/profile/profile'
import './style.css'


let Contacts =()=>{
    return (
    <>
    <Navbar component={UserProfile} />
    <div className="contact-page">
        <h2>Contact page under construction! </h2>
    </div>
    </>
    );
}

export default Contacts;