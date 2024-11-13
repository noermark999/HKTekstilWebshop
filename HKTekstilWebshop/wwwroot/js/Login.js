var CLASS_NAMES;
(function (CLASS_NAMES) {
    CLASS_NAMES["HIDE"] = "Hide";
})(CLASS_NAMES || (CLASS_NAMES = {}));
var ID_NAMES;
(function (ID_NAMES) {
    ID_NAMES["REGISTER_BTN"] = "Login-Button-Register";
    ID_NAMES["LOGIN_BTN"] = "Login-Button-SignIn";
    ID_NAMES["USERNAME_INPUT"] = "Login-EmailUser-Input";
    ID_NAMES["PASSWORD_INPUT"] = "Login-Password-Input";
    ID_NAMES["LOGIN_FORM"] = "Login-Form";
    ID_NAMES["ERRORMESSAGE_CONTAINER"] = "Login-ErrorMessage-Container";
    ID_NAMES["ERRORMESSAGE_LABEL"] = "Login-ErrorMessage";
})(ID_NAMES || (ID_NAMES = {}));
var API_URLS;
(function (API_URLS) {
    API_URLS["LOGIN_SUBMIT"] = "/Login/Submit";
})(API_URLS || (API_URLS = {}));
// GLOBAL FIELDS
let loginBtn;
let registerBtn;
document.addEventListener('DOMContentLoaded', function () {
    loginBtn = document.getElementById(ID_NAMES.LOGIN_BTN);
    registerBtn = document.getElementById(ID_NAMES.REGISTER_BTN);
    initializeLoginButton();
    initializeRegisterButton();
});
function initializeLoginButton() {
    loginBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const form = document.getElementById(ID_NAMES.LOGIN_FORM);
        if (!form.checkValidity()) {
            form.reportValidity();
        }
        else {
            try {
                await submitLogin();
            }
            catch (error) {
                const errorContainer = document.getElementById(ID_NAMES.ERRORMESSAGE_CONTAINER);
                const errorLabel = document.getElementById(ID_NAMES.ERRORMESSAGE_LABEL);
                console.log(error);
                errorContainer.classList.remove(CLASS_NAMES.HIDE);
                errorLabel.textContent = 'Brugernavn/adgangskode ikke korrekt! Prøv igen';
            }
        }
    });
}
async function submitLogin() {
    const usernameInput = document.getElementById(ID_NAMES.USERNAME_INPUT);
    const passwordInput = document.getElementById(ID_NAMES.PASSWORD_INPUT);
    const loginData = {
        Username: usernameInput.value,
        Password: passwordInput.value
    };
    try {
        const response = await fetch(API_URLS.LOGIN_SUBMIT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || response.statusText);
        }
        window.location.href = '/';
    }
    catch (error) {
        console.error(`Error fetching data`, error);
        throw error;
    }
}
function initializeRegisterButton() {
    registerBtn.addEventListener('click', () => {
        window.location.href = '/register';
    });
}
export {};
//# sourceMappingURL=Login.js.map