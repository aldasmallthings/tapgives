/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect} from 'react';
import { Redirect,Route,BrowserRouter as Router } from "react-router-dom";
import { validateRegistrationInput } from '../validateInput'
import apiUrls from '../apiUrls'

let RegisterForm = () =>{
    let [values, setValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        password:'',
        password2: ''
    });

    let [errors ,setErrors] = useState({});
    let [loginRedirect,setLoginRedirect] = useState("");
    let [isSubmitting,setIsSumitting] = useState(false);

    const handleChange = e =>{
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        // setErrors(validateRegistrationInput(values));
        // if (Object.keys(errors).length > 0){
        //     setErrors({...errors,registrationError: "Registration Failed. Try Again."});
        //     return errors;
        // }else{
            let name = values.firstName + ' ' + values.lastName;
            values.name = name;
            delete values['firstName'];
            delete values['lastName'];   
            setIsSumitting(true);
        // }
    }

    useEffect(()=>{
            if(isSubmitting){
                fetch(apiUrls.register,{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: values
                })
                .then(response=>{
                    if (response.status === 201){
                        setLoginRedirect('LogIn to continue');
                        // eslint-disable-next-line no-restricted-globals
                        return  (
                            <Router>
                                <Route
                                    render = {()=>{                                        
                                        <Redirect to={{
                                            pathname:"/login",
                                            state: {loginmessage:loginRedirect}
                                        }} />
                                    }}
                                />
                            </Router>
                        );
                    }else{
                        setErrors({...errors,registrationerrors: "Error registering you. Check your details and try again."})
                    }

                })
            }           
        },[isSubmitting]);
    return { handleChange,values, handleSubmit, errors};
}

export default RegisterForm;