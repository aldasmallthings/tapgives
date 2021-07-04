import React,{ useState } from 'react'
import Register from './register'
import Subscribe from './subscribe'

const Form = () => {
    const [isSubmitted,setIsSubmitted] = useState(false);
    let submitForm = ()=>{
        setIsSubmitted(true);
    }
    return (
        <div>
            {!isSubmitted ? <Register submitForm={submitForm} /> : <Subscribe/>}
        </div>
    )
}

export default Form
