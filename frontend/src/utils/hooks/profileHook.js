/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect} from 'react';
import apiUrls from '../apiUrls'

let ProfileForm = () =>{
    let [currentValues, setValues] = useState({});
    let getValues = ()=>{
        fetch(apiUrls.getsubscription,{
            method:'GET',
            headers:{
                
            }
        })
        .then(response=>{
            setValues({...currentValues,...response});
            return currentValues;
        })
        .catch()
    }

    let [errors ,setErrors] = useState({});
    let [isSubmitting,setIsSumitting] = useState(false);

    const handleChange = e =>{
        setValues({
            ...currentValues,
            [e.target.name] : e.target.value
        })
    }
    let handleLoad =()=>{
        return getValues;
    }
    const handleSubmit = e =>{
        e.preventDefault();
        setErrors(currentValues);
        if (Object.keys(errors).length > 0){
            setErrors({...errors,loginerror:"Login Failed."})
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
                    body: JSON.stringify(currentValues)
                })
                .then(response=>JSON.stringify(response))
                .then(response=>{
                    console.log(response);
                })
                .catch(err=>{
                    setErrors({...errors,loginerror:"Error login you in. Try again later."});
                    console.log(err);
                    return errors;
                })
            }            
        },[isSubmitting]);
    return { handleChange,currentValues, handleSubmit, errors,handleLoad};
}

export default ProfileForm;