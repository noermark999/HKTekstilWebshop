enum CLASS_NAMES {

}

enum ID_NAMES {
    LOGOUT_BTN = 'Header-Signout',

}

enum API_URLS {
    LOGOUT = '/Logout',
}

// GLOBAL FIELDS
let logoutBtn: HTMLButtonElement

document.addEventListener('DOMContentLoaded', function () {
    logoutBtn = document.getElementById(ID_NAMES.LOGOUT_BTN) as HTMLButtonElement

    if (logoutBtn) {
        initializeLogoutButton()
    }
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
            window.location.href = '/Login';
        } catch (error) {
            console.error(`Error fetching data`, error);
            throw error;
        }
    })
}