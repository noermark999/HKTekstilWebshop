var CLASS_NAMES;
(function (CLASS_NAMES) {
})(CLASS_NAMES || (CLASS_NAMES = {}));
var ID_NAMES;
(function (ID_NAMES) {
    ID_NAMES["LOGOUT_BTN"] = "Header-Signout";
})(ID_NAMES || (ID_NAMES = {}));
var API_URLS;
(function (API_URLS) {
    API_URLS["LOGOUT"] = "/Logout";
})(API_URLS || (API_URLS = {}));
// GLOBAL FIELDS
let logoutBtn;
document.addEventListener('DOMContentLoaded', function () {
    logoutBtn = document.getElementById(ID_NAMES.LOGOUT_BTN);
    if (logoutBtn) {
        initializeLogoutButton();
    }
});
function initializeLogoutButton() {
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(API_URLS.LOGOUT, {
                method: 'POST'
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || response.statusText);
            }
            window.location.href = '/Login';
        }
        catch (error) {
            console.error(`Error fetching data`, error);
            throw error;
        }
    });
}
export {};
//# sourceMappingURL=Layout.js.map