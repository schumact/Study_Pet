export default function validateNewUser(creds) {
    const isValidUserName = verifyUsername(creds.username);
    const isValidEmail = verifyEmail(creds.email);
    const isValidPassword = verifyPassword(creds.password, creds.reEnterPassword);
    if (isValidUserName && isValidEmail)
    {
        if (isValidPassword) {
            return [true];
        }
        else {
            return [false, "The supplied passwords didn't match or weren't a minimum of 8 characters."];
        }
    }
    else {
        return [false, "Please make sure that you are using a valid email address" +
        " and that your username is at minimum 5 characters long"];
    }
};

const verifyPassword = (password1, password2) => {
    if (password1 !== password2) {
        return false;
    }
    else {return isPasswordStrong(password1)}
};

const verifyUsername = (username) => {
    // TODO likely need beefed up
    return username.length >= 5;
};

const verifyEmail = (email) => {
    // TODO put some regex or something here and return bool
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const isPasswordStrong = (password) => {
    // TODO come back to this
    return password.length >= 8;
};