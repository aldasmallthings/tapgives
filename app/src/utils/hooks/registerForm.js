/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect} from 'react';
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
    let [isSubmitting,setIsSumitting] = useState(false);

    const handleChange = e =>{
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        let name = values.firstName + ' ' + values.lastName;
        values.name = name;
        delete values['firstName'];
        delete values['lastName'];
        delete values['password2']
        setErrors(validateRegistrationInput(values));
        if (Object.keys(errors).length > 0){
            setErrors({...errors,registrationError: "Registration Failed. Try Again."});
            return errors;
        }    
        setIsSumitting(true);
        return true;
    }

    useEffect(()=>{
            if(isSubmitting){
                fetch(apiUrls.register,{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                .then(response=>JSON.stringify(response))
                .then(response=>console.log(response))
            }           
        },[isSubmitting]);
    return { handleChange,values, handleSubmit, errors};
}

export default RegisterForm;