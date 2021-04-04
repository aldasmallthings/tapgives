import React from 'react'
import Navbar from '../../components/navbar/nav';
import Profile from '../../components/profile/profile'


let About =()=>{
    return (
    <>
    <Navbar component={Profile} />
        <h2>About page</h2>
    </>
    );
}

export default About;