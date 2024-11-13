enum CLASS_NAMES {
    HIDE = 'Hide',
}

enum ID_NAMES {
    REGISTER_BTN = 'Login-Button-Register',
    LOGIN_BTN = 'Login-Button-SignIn',
    USERNAME_INPUT = 'Login-EmailUser-Input',
    PASSWORD_INPUT = 'Login-Password-Input',
    LOGIN_FORM = 'Login-Form',
    ERRORMESSAGE_CONTAINER = 'Login-ErrorMessage-Container',
    ERRORMESSAGE_LABEL = 'Login-ErrorMessage',

}

enum API_URLS {
    LOGIN_SUBMIT = '/Login/Submit',
}

// GLOBAL FIELDS
let loginBtn : HTMLButtonElement
let registerBtn: HTMLButtonElement

document.addEventListener('DOMContentLoaded', function () {
    loginBtn = document.getElementById(ID_NAMES.LOGIN_BTN) as HTMLButtonElement
    registerBtn = document.getElementById(ID_NAMES.REGISTER_BTN) as HTMLButtonElement

    initializeLoginButton()
    initializeRegisterButton()
});

function initializeLoginButton() {
    loginBtn.addEventListener('click', async (event) => {
        event.preventDefault()

        const form = document.getElementById(ID_NAMES.LOGIN_FORM) as HTMLFormElement

        if (!form.checkValidity()) {
            form.reportValidity()
        } else {
            try {
                await submitLogin()
            } catch (error) {
                const errorContainer = document.getElementById(ID_NAMES.ERRORMESSAGE_CONTAINER)
                const errorLabel = document.getElementById(ID_NAMES.ERRORMESSAGE_LABEL)
                console.log(error)

                errorContainer.classList.remove(CLASS_NAMES.HIDE)
                errorLabel.textContent = 'Brugernavn/adgangskode ikke korrekt! Prøv igen'
            }
        }
    })
}

async function submitLogin() {
    const usernameInput = document.getElementById(ID_NAMES.USERNAME_INPUT) as HTMLInputElement
    const passwordInput = document.getElementById(ID_NAMES.PASSWORD_INPUT) as HTMLInputElement

    const loginData = {
        Username: usernameInput.value,
        Password: passwordInput.value
    }

    try {
        const response = await fetch(API_URLS.LOGIN_SUBMIT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        if (!response.ok) {
            const errorData = await response.text()
            throw new Error(errorData || response.statusText)
        }

        window.location.href = '/'
    } catch(error) {
        console.error(`Error fetching data`, error);
        throw error;
    }
}

function initializeRegisterButton() {
    registerBtn.addEventListener('click', () => {
        window.location.href = '/register'
    })
}


