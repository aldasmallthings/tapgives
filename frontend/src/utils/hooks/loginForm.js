/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect} from 'react';
import { useJwt } from "react-jwt";
import { useHistory } from 'react-router';
import { validateLoginForm } from '../validateInput'
import apiUrls from '../apiUrls'

let LoginForm = () =>{
    let token = useJwt();
    let router = useHistory();

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
        // setErrors(validateLoginForm(values));
        // if (Object.keys(errors).length > 0){
        //     setErrors({...errors,loginerror:"Login Failed. Try Again Later"})
        //     console.log(errors)
        //     return errors; 
        // }
        setIsSumitting(true);
        // console.log(errors);
        // return true;
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
                .then(response=>response.json())
                .then(response=>{
                    // token(response.access_token);
                    console.log(response);
                    router.push('/');
                })
                .catch(err=>{
                    console.log(err);
                    setErrors({...errors,loginerror:"Error login you in. Try again later."});                    
                })
            }            
        },[isSubmitting]);
    return { handleChange,values, handleSubmit, errors};
}

export default LoginForm;