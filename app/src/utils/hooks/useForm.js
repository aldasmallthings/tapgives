import {useState,useEffect} from 'react';

let useForm = (callback,validate) =>{
    const [values, setValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        password:'',
        password2: ''
    });

    const [errors ,setErrors] = useState({});
    const [isSubmitting,setIsSumitting] = useState(false);

    const handleChange = e =>{
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        setErrors(validate(values));
        if(errors.length > 0){
            return setIsSumitting(false);
        }
        setIsSumitting(true);
        fetch('http://localhost:4000/api/v1/auth/register',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response=>JSON.stringify(response))
        .then(response=>console.log(response))
    }

    useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback();
            console.log(errors);
        }
    }
    )
    return { handleChange,values, handleSubmit, errors};
}

export default useForm;