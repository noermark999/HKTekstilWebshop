var CLASS_NAMES;
(function (CLASS_NAMES) {
    CLASS_NAMES["DROPDOWN_CONTAINER"] = "Admin-Dropdown";
    CLASS_NAMES["DROPDOWN_OPTION"] = "Admin-Dropdown-Option";
})(CLASS_NAMES || (CLASS_NAMES = {}));
var ID_NAMES;
(function (ID_NAMES) {
    ID_NAMES["AddOrganization"] = "AddOrganization";
    ID_NAMES["AddRegisterCode"] = "AddRegisterCode";
    ID_NAMES["AddProduct"] = "AddProduct";
    ID_NAMES["AddCategory"] = "AddCategory";
    ID_NAMES["AddColor"] = "AddColor";
    ID_NAMES["AddSize"] = "AddSize";
    ID_NAMES["AddExtraChoice"] = "AddExtraChoice";
    ID_NAMES["PARTIAL_CONTAINER"] = "Admin-Partial-Container";
    ID_NAMES["PARTIAL_FORM"] = "Admin-Partial-Form";
    ID_NAMES["PARTIAL_CREATE_BUTTON"] = "Admin-Partial-Button-Create";
    ID_NAMES["ORGANIZATION_DROPDOWN"] = "Organization-Dropdown";
    ID_NAMES["REGISTERCODE_INPUT"] = "Admin-Partial-RegisterCode-Input";
    ID_NAMES["REGISTERCODE_LIST_PARTIAL_CONTAINER"] = "Admin-Partial-List-Container-id";
    ID_NAMES["CREATE_SIZE_INPUT"] = "Admin-Partial-Size-Input";
    ID_NAMES["CREATE_COLOR_INPUT"] = "Color-Name";
    ID_NAMES["CATEGORY_NAME_INPUT"] = "Category-Name";
    ID_NAMES["CATEGORY_DESCRIPTION_TEXTAREA"] = "Category-Description";
    ID_NAMES["ORG_NAME"] = "Organization-Name";
    ID_NAMES["ORG_ADDRESS"] = "Organization-Address";
    ID_NAMES["ORG_CONTACTEMAIL"] = "Organization-Contact-Email";
    ID_NAMES["ORG_CONTACTPHONENUMBER"] = "Organization-Contact-Phonenumber";
})(ID_NAMES || (ID_NAMES = {}));
var URLS;
(function (URLS) {
    URLS["AddOrganization"] = "/admin/addorganization";
    URLS["AddRegisterCode"] = "/admin/addregistercode";
    URLS["AddCategory"] = "/admin/addcategory";
    URLS["AddSize"] = "/admin/addsize";
    URLS["AddColor"] = "/admin/addcolor";
})(URLS || (URLS = {}));
function CreateApiURL(url) {
    return `${url}/create`;
}
function GetRegisterCodesForOrganizationURL(ID) {
    return `/admin/getregistercodes/${ID}`;
}
// GLOBAL FIELDS
let PartialContainer;
let createbutton;
let organizationDropdown;
document.addEventListener('DOMContentLoaded', function () {
    PartialContainer = document.getElementById(ID_NAMES.PARTIAL_CONTAINER);
    InitializeDropdownOptionsWithDelegation();
});
// --------------------------------- Helper methods --------------------------------------------
async function CreateObjectFromData(url, data) {
    let createAPIURL = CreateApiURL(url);
    try {
        const response = await fetch(createAPIURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.text();
            alert(errorData || response.statusText);
        }
        setTimeout(async () => {
            await GetPartialForDropdownOption(url);
        }, 100);
    }
    catch (error) {
        alert(error);
    }
}
function CheckFormValidity() {
    const form = document.getElementById(ID_NAMES.PARTIAL_FORM);
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    else {
        return true;
    }
}
// -----------------------------------------------------------------------------
function InitializeDropdownOptionsWithDelegation() {
    let dropdowns = document.getElementsByClassName(CLASS_NAMES.DROPDOWN_CONTAINER);
    for (let dropdown of dropdowns) {
        dropdown.addEventListener('click', async (event) => {
            const targetElement = event.target;
            if (targetElement.classList.contains(CLASS_NAMES.DROPDOWN_OPTION)) {
                const url = targetElement.getAttribute('apiurl');
                await GetPartialForDropdownOption(url);
            }
        });
    }
}
async function GetPartialForDropdownOption(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.text();
            alert(errorData || response.statusText);
            return;
        }
        let responsetext = await response.text();
        PartialContainer.innerHTML = responsetext;
        await InitializePartials(url);
    }
    catch (error) {
        console.error('Error during fetch or processing response:', error);
        alert(`An error was encountered when retrieving item info: ${error}`);
    }
}
async function InitializePartials(url) {
    createbutton = document.getElementById(ID_NAMES.PARTIAL_CREATE_BUTTON);
    organizationDropdown = document.getElementById(ID_NAMES.ORGANIZATION_DROPDOWN);
    console.log(organizationDropdown);
    switch (url) {
        case URLS.AddSize:
            await CreateSizeFunctionality(url);
            break;
        case URLS.AddOrganization:
            await CreateOrganizationFunctionality(url);
            break;
        case URLS.AddRegisterCode:
            await CreateRegisterCodeFunctionality(url);
            break;
        case URLS.AddCategory:
            await CreateCategoryFunctionality(url);
            break;
        case URLS.AddColor:
            await CreateColorFunctionality(url);
            break;
    }
}
async function CreateSizeFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (!CheckFormValidity()) {
            return;
        }
        const sizeinput = PartialContainer.querySelector(`#${ID_NAMES.CREATE_SIZE_INPUT}`);
        const SizeData = {
            Size: sizeinput.value
        };
        await CreateObjectFromData(url, SizeData);
    });
}
async function CreateOrganizationFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (!CheckFormValidity()) {
            return;
        }
        const NameInput = PartialContainer.querySelector(`#${ID_NAMES.ORG_NAME}`);
        const AddressInput = PartialContainer.querySelector(`#${ID_NAMES.ORG_ADDRESS}`);
        const ContactEmailInput = PartialContainer.querySelector(`#${ID_NAMES.ORG_CONTACTEMAIL}`);
        const ContactPhoneNumberInput = PartialContainer.querySelector(`#${ID_NAMES.ORG_CONTACTPHONENUMBER}`);
        const OrganizationData = {
            Name: NameInput.value,
            Address: AddressInput.value,
            ContactEmail: ContactEmailInput.value,
            ContactPhoneNumber: ContactPhoneNumberInput.value,
        };
        await CreateObjectFromData(url, OrganizationData);
    });
}
async function CreateRegisterCodeFunctionality(url) {
    organizationDropdown.addEventListener('change', async (event) => {
        let targetelement = event.target;
        console.log(targetelement.value);
        await GetRegisterCodesForOrganization(targetelement.value);
    });
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (!CheckFormValidity()) {
            return;
        }
        const registercode = PartialContainer.querySelector(`#${ID_NAMES.REGISTERCODE_INPUT}`);
        const RegisterCodeData = {
            Code: registercode.value,
            Organization: organizationDropdown.value
        };
        await CreateObjectFromData(url, RegisterCodeData);
    });
}
async function GetRegisterCodesForOrganization(ID) {
    try {
        console.log(GetRegisterCodesForOrganizationURL(ID));
        const response = await fetch(GetRegisterCodesForOrganizationURL(ID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.text();
            alert(errorData || response.statusText);
            return;
        }
        let responsetext = await response.text();
        let listcontainer = document.getElementById(ID_NAMES.REGISTERCODE_LIST_PARTIAL_CONTAINER);
        listcontainer.innerHTML = responsetext;
    }
    catch (error) {
        console.error('Error during fetch or processing response:', error);
        alert(`An error was encountered when retrieving item info: ${error}`);
    }
}
async function CreateCategoryFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (!CheckFormValidity()) {
            return;
        }
        const categorynameInput = PartialContainer.querySelector(`#${ID_NAMES.CATEGORY_NAME_INPUT}`);
        const categoryDescriptionInput = PartialContainer.querySelector(`#${ID_NAMES.CATEGORY_DESCRIPTION_TEXTAREA}`);
        const CategoryData = {
            Name: categorynameInput.value,
            Description: categoryDescriptionInput.value
        };
        await CreateObjectFromData(url, CategoryData);
    });
}
async function CreateColorFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (!CheckFormValidity()) {
            return;
        }
        const colorInput = PartialContainer.querySelector(`#${ID_NAMES.CREATE_COLOR_INPUT}`);
        const ColorData = {
            ColorName: colorInput.value
        };
        await CreateObjectFromData(url, ColorData);
    });
}
export {};
//# sourceMappingURL=Admin.js.map