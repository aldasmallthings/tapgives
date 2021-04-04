import React, {Component} from 'react'
import Navbar from '../../components/navbar/nav'
import Button  from '../../components/button/regbtn';


export default class Login extends Component {

    render() {
        return(
            <div>
                <Navbar button={Button} />
            </div>
        )
    }
}