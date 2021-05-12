function validateRegistrationInput(values){
    const errors = {};
    if(values.password.trim().length < 6){
        errors.password = "Password is too short."
    }else if (!values.password.trim() !== values.password2.trim()){
        errors.password2 = 'Passwords do not match'
    } 
    return errors;
}
function validateLoginForm(values){
    const errors = {};
    if(!values.phone){
        errors.phone = "Ensure you enter the correct phone number";
        return errors;
    }
    return false;
}

module.exports = {
    validateRegistrationInput,
    validateLoginForm,
}