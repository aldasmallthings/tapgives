function validateRegistrationInput(values){
    const errors = {};
    console.log(values);
    if(values.password.trim().length < 6){
        errors.password = "Password is too short."
    }
    let pass1 = values.password;
    let pass2 = values.password2;
    if (pass1.trim() !== pass2.trim()){
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