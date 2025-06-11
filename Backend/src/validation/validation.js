const isValid = (value) => {
    if(typeof value === "undefined" || value === null) return false;
    if(typeof value === "string" && value.trim().length === 0) return false;
    if(typeof value === "number" && isNaN(value)) return false;

    return true;
}

const isValidName = (name) => /^[a-zA-Z]+$/.test(name);

const isValidEmail = (email) =>/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

//const isValidPassword = (password) =>  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/.test(password);

const isValidPhoneNumber = (phone) => {

    const regex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    return regex.test(phone);
};

const isValidGender = (gender) => {
    const validGender =  ["male","female","other"];
    return validGender.includes(gender.toLowerCase()) 
}

const isValidProductName = (value) => {
    return /^[a-zA-Z0-9\s\-_,.()]+$/.test(value); // Allows letters, numbers, and some special chars
}

module.exports = {isValid, isValidName, isValidEmail, isValidPhoneNumber, isValidGender, isValidProductName};