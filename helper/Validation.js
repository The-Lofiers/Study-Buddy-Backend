// email validation
const emailValidation = (email) => {
    const regEx =
        /^([0-9a-zA-Z]([-.\w][0-9a-zA-Z])@([0-9a-zA-Z][-\w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
    if (regEx.test(email)) {
        return true;
    }
    return false;
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