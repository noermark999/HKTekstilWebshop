enum CLASS_NAMES {

}

enum ID_NAMES {
    LOGOUT_BTN = 'Header-Signout',
    ADMIN_BTN = 'Header-Admin',
    HEADER_LOGO = 'Header-Logo-id',
}

enum API_URLS {
    LOGOUT = '/Logout',
    LOGIN = '/Login',
    ADMIN = '/Admin',
}

// GLOBAL FIELDS
let logoutBtn: HTMLButtonElement
let adminBtn: HTMLButtonElement

document.addEventListener('DOMContentLoaded', function () {
    logoutBtn = document.getElementById(ID_NAMES.LOGOUT_BTN) as HTMLButtonElement
    adminBtn = document.getElementById(ID_NAMES.ADMIN_BTN) as HTMLButtonElement

    if (logoutBtn) {
        initializeLogoutButton()
    }

    if (adminBtn) {
        initializeAdminButton()
    }
    InitializeLogo()
});

function initializeLogoutButton() {
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(API_URLS.LOGOUT, {
                method: 'POST'
            })
            if (!response.ok) {
                const errorData = await response.text()
                throw new Error(errorData || response.statusText)
            }
            window.location.href = API_URLS.LOGIN;
        } catch (error) {
            console.error(`Error fetching data`, error);
            throw error;
        }
    })
}

function initializeAdminButton() {
    adminBtn.addEventListener('click', async () => {
        window.location.href = API_URLS.ADMIN;
    })
}

function InitializeLogo() {
    let logo = document.getElementById(ID_NAMES.HEADER_LOGO) as HTMLImageElement
    logo.addEventListener('click', () => {
        window.location.href = '/'
    })
}