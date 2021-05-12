/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect} from 'react';
import { validateLoginForm } from '../validateInput'
import apiUrls from '../apiUrls'

let LoginForm = () =>{
    let [values, setValues] = useState({
        email:'',
        phone:'',
        password:''
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
        setErrors(validateLoginForm(values));
        if (Object.keys(errors).length > 0){
            setErrors({...errors,loginerror:"Login Failed. Try Again Later"})
            console.log(errors)
            return errors; 
        }
        setIsSumitting(true);
        console.log(errors);
        return true;
    }

    useEffect(()=>{
            if( isSubmitting ){
                fetch(apiUrls.login,{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                .then(response=>JSON.stringify(response))
                .then(response=>console.log(response))
                .catch(err=>{
                    setErrors({...errors,loginerror:"Error login you in. Try again later."});
                    console.log(err);
                    return errors;
                })
            }            
        },[isSubmitting]);
    return { handleChange,values, handleSubmit, errors};
}

export default LoginForm;