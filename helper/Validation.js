// email validation
const emailValidation = (email) => {
    const regEx =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEx.test(email)) {
        return false;
    }
    return true;
};

// password validation
const passwordValidation = (password) => {
    // regex for password
    // minimum 8 characters, at least one letter, one number, one special character
    const regEx2 =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regEx2.test(password)) {
        return true;
    }
    return false;
};

// name validation
const nameValidation = (name) => {
    // regex for name
    // minimum 2 characters, at least one letter
    const regEx3 = /^[a-zA-Z]{2,}$/;
    if (regEx3.test(name)) {
        return false;
    }
    return true;
};

module.exports = { emailValidation, passwordValidation, nameValidation };