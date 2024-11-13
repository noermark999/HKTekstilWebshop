var CLASS_NAMES;
(function (CLASS_NAMES) {
    CLASS_NAMES["HIDE"] = "Hide";
})(CLASS_NAMES || (CLASS_NAMES = {}));
var ID_NAMES;
(function (ID_NAMES) {
    ID_NAMES["REGISTER_SUBMIT_BTN"] = "Register-Button-Register";
    ID_NAMES["ORG_DROPDOWN"] = "Register-Organization-Dropdown";
    ID_NAMES["REGISTERCODE_INPUT"] = "Register-RegisterCode-Input";
    ID_NAMES["FIRSTNAME_INPUT"] = "Register-Firstname-Input";
    ID_NAMES["LASTNAME_INPUT"] = "Register-Lastname-Input";
    ID_NAMES["EMAIL_INPUT"] = "Register-Email-Input";
    ID_NAMES["PHONENUMBER_INPUT"] = "Register-Phonenumber-Input";
    ID_NAMES["USERNAME_INPUT"] = "Register-Username-Input";
    ID_NAMES["PASSWORD_INPUT"] = "Register-Password-Input";
    ID_NAMES["CONFIRMPASSWORD_INPUT"] = "Register-ConfirmPassword-Input";
    ID_NAMES["REGISTER_FORM"] = "Register-Form";
    ID_NAMES["ERRORMESSAGE_CONTAINER"] = "Register-ErrorMessage-Container";
    ID_NAMES["ERRORMESSAGE_LABEL"] = "Register-ErrorMessage";
})(ID_NAMES || (ID_NAMES = {}));
var API_URLS;
(function (API_URLS) {
    API_URLS["REGISTER_USER_SUBMIT"] = "/Register/Submit/";
})(API_URLS || (API_URLS = {}));
let registerBtn;
let organizationInput;
let registercodeInput;
let firstNameInput;
let lastnameInput;
let emailInput;
let phonenumberInput;
let usernameInput;
let passwordInput;
let confirmPasswordInput;
document.addEventListener('DOMContentLoaded', function () {
    registerBtn = document.getElementById(ID_NAMES.REGISTER_SUBMIT_BTN);
    organizationInput = document.getElementById(ID_NAMES.ORG_DROPDOWN);
    registercodeInput = document.getElementById(ID_NAMES.REGISTERCODE_INPUT);
    firstNameInput = document.getElementById(ID_NAMES.FIRSTNAME_INPUT);
    lastnameInput = document.getElementById(ID_NAMES.LASTNAME_INPUT);
    emailInput = document.getElementById(ID_NAMES.EMAIL_INPUT);
    phonenumberInput = document.getElementById(ID_NAMES.PHONENUMBER_INPUT);
    usernameInput = document.getElementById(ID_NAMES.USERNAME_INPUT);
    passwordInput = document.getElementById(ID_NAMES.PASSWORD_INPUT);
    confirmPasswordInput = document.getElementById(ID_NAMES.CONFIRMPASSWORD_INPUT);
    initializeRegisterButton();
});
async function initializeRegisterButton() {
    registerBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const form = document.getElementById(ID_NAMES.REGISTER_FORM);
        if (!form.checkValidity()) {
            form.reportValidity();
        }
        else {
            try {
                await registerUser();
            }
            catch (error) {
                const errorContainer = document.getElementById(ID_NAMES.ERRORMESSAGE_CONTAINER);
                const errorLabel = document.getElementById(ID_NAMES.ERRORMESSAGE_LABEL);
                console.log(error);
                errorContainer.classList.remove(CLASS_NAMES.HIDE);
                errorLabel.textContent = error;
            }
        }
    });
}
async function registerUser() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (password !== confirmPassword) {
        throw new Error('Kodeord er ikke ens');
    }
    const registerUserData = {
        Firstname: firstNameInput.value,
        Lastname: lastnameInput.value,
        Email: emailInput.value,
        PhoneNumber: phonenumberInput.value,
        Username: usernameInput.value,
        Password: passwordInput.value,
        Organization: organizationInput.value,
        RegisterCode: registercodeInput.value
    };
    try {
        const response = await fetch(API_URLS.REGISTER_USER_SUBMIT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerUserData)
        });
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || response.statusText);
        }
        window.location.href = '/register/success';
    }
    catch (error) {
        console.error(`Error fetching data`, error);
        throw error;
    }
}
export {};
//# sourceMappingURL=Register.js.map