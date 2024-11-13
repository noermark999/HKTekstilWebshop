enum CLASS_NAMES {
    HIDE = 'Hide'
}

enum ID_NAMES {
    REGISTER_SUBMIT_BTN = 'Register-Button-Register',
    ORG_DROPDOWN = 'Register-Organization-Dropdown',
    REGISTERCODE_INPUT = 'Register-RegisterCode-Input',
    FIRSTNAME_INPUT = 'Register-Firstname-Input',
    LASTNAME_INPUT = 'Register-Lastname-Input',
    EMAIL_INPUT = 'Register-Email-Input',
    PHONENUMBER_INPUT = 'Register-Phonenumber-Input',
    USERNAME_INPUT = 'Register-Username-Input',
    PASSWORD_INPUT = 'Register-Password-Input',
    CONFIRMPASSWORD_INPUT = 'Register-ConfirmPassword-Input',
    REGISTER_FORM = 'Register-Form',
    ERRORMESSAGE_CONTAINER = 'Register-ErrorMessage-Container',
    ERRORMESSAGE_LABEL = 'Register-ErrorMessage',
}

enum API_URLS {
    REGISTER_USER_SUBMIT = '/Register/Submit/',
}

let registerBtn: HTMLButtonElement
let organizationInput: HTMLSelectElement
let registercodeInput: HTMLInputElement
let firstNameInput: HTMLInputElement
let lastnameInput: HTMLInputElement
let emailInput: HTMLInputElement
let phonenumberInput: HTMLInputElement
let usernameInput: HTMLInputElement
let passwordInput: HTMLInputElement
let confirmPasswordInput: HTMLInputElement


document.addEventListener('DOMContentLoaded', function () {
    registerBtn = document.getElementById(ID_NAMES.REGISTER_SUBMIT_BTN) as HTMLButtonElement
    organizationInput = document.getElementById(ID_NAMES.ORG_DROPDOWN) as HTMLSelectElement
    registercodeInput = document.getElementById(ID_NAMES.REGISTERCODE_INPUT) as HTMLInputElement
    firstNameInput = document.getElementById(ID_NAMES.FIRSTNAME_INPUT) as HTMLInputElement
    lastnameInput = document.getElementById(ID_NAMES.LASTNAME_INPUT) as HTMLInputElement
    emailInput = document.getElementById(ID_NAMES.EMAIL_INPUT) as HTMLInputElement
    phonenumberInput = document.getElementById(ID_NAMES.PHONENUMBER_INPUT) as HTMLInputElement
    usernameInput = document.getElementById(ID_NAMES.USERNAME_INPUT) as HTMLInputElement
    passwordInput = document.getElementById(ID_NAMES.PASSWORD_INPUT) as HTMLInputElement
    confirmPasswordInput = document.getElementById(ID_NAMES.CONFIRMPASSWORD_INPUT) as HTMLInputElement

    initializeRegisterButton()
});

async function initializeRegisterButton() {
    registerBtn.addEventListener('click', async (event) => {
        event.preventDefault()

        const form = document.getElementById(ID_NAMES.REGISTER_FORM) as HTMLFormElement

        if (!form.checkValidity()) {
            form.reportValidity()
        } else {
            try {
                await registerUser()
            } catch (error) {
                const errorContainer = document.getElementById(ID_NAMES.ERRORMESSAGE_CONTAINER) as HTMLElement
                const errorLabel = document.getElementById(ID_NAMES.ERRORMESSAGE_LABEL) as HTMLLabelElement

                console.log(error)

                errorContainer.classList.remove(CLASS_NAMES.HIDE)
                errorLabel.textContent = error
            }
        }
    })
}

async function registerUser() {
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value

    if (password !== confirmPassword) {
        throw new Error('Kodeord er ikke ens')
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
    }
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

        window.location.href = '/register/success'

    } catch (error) {
        console.error(`Error fetching data`, error);
        throw error;
    }
        
}