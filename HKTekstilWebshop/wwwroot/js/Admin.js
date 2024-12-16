var CLASS_NAMES;
(function (CLASS_NAMES) {
    CLASS_NAMES["DROPDOWN_CONTAINER"] = "Admin-Dropdown";
    CLASS_NAMES["DROPDOWN_OPTION"] = "Admin-Dropdown-Option";
    CLASS_NAMES["HIDE"] = "Hide";
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
    ID_NAMES["EXTRACHOICE_OPEN_POPUP_BUTTON"] = "Admin-Partial-Button-ExtraOption";
    ID_NAMES["EXTRACHOICE_POPUP_CONTAINER"] = "Admin-Partial-Popup-Container";
    ID_NAMES["EXTRACHOICE_ADD_OPTION_BUTTON"] = "Admin-Partial-Button-ExtraOption-Add";
    ID_NAMES["EXTRACHOICE_OPTION_NAME"] = "ExtraOption-Name";
    ID_NAMES["EXTRACHOICE_OPTION_DESCRIPTION"] = "ExtraOption-Description";
    ID_NAMES["EXTRACHOICE_OPTION_PRICE"] = "ExtraOption-ExtraPrice";
    ID_NAMES["EXTRACHOICE_FORM"] = "Admin-Partial-ExtraOption-Form";
    ID_NAMES["EXTRACHOICE_POPUP_CLOSE_BUTTON"] = "Admin-Partial-Popup-Close";
    ID_NAMES["EXTRACHOICE_OPTION_LIST"] = "Admin-Partial-ExtraChoiceOption-List";
    ID_NAMES["EXTRACHOICE_TITLE"] = "ExtraChoice-Title";
    ID_NAMES["EXTRACHOICE_RECOGNIZABLENAME"] = "ExtraChoice-RecognizableName";
    ID_NAMES["ORG_NAME"] = "Organization-Name";
    ID_NAMES["ORG_ADDRESS"] = "Organization-Address";
    ID_NAMES["ORG_CONTACTEMAIL"] = "Organization-Contact-Email";
    ID_NAMES["ORG_CONTACTPHONENUMBER"] = "Organization-Contact-Phonenumber";
    ID_NAMES["PRODUCT_NAME"] = "Product-Name";
    ID_NAMES["PRODUCT_PRICE"] = "Product-Price";
    ID_NAMES["PRODUCT_ORGANIZATION"] = "Product-Organization";
    ID_NAMES["PRODUCT_CATEGORY"] = "Product-Category";
    ID_NAMES["PRODUCT_IMAGES"] = "Product-Images";
    ID_NAMES["PRODUCT_SIZES"] = "Product-Sizes";
    ID_NAMES["PRODUCT_EXTRACHOICES"] = "Product-ExtraChoices";
    ID_NAMES["PRODUCT_COLORS"] = "Product-Colors";
    ID_NAMES["PRODUCT_DESCRIPTION"] = "Product-Description";
    ID_NAMES["OVERLAY"] = "Overlay";
})(ID_NAMES || (ID_NAMES = {}));
var URLS;
(function (URLS) {
    URLS["AddOrganization"] = "/admin/addorganization";
    URLS["AddRegisterCode"] = "/admin/addregistercode";
    URLS["AddCategory"] = "/admin/addcategory";
    URLS["AddSize"] = "/admin/addsize";
    URLS["AddColor"] = "/admin/addcolor";
    URLS["AddExtraChoice"] = "/admin/addextrachoice";
    URLS["AddProduct"] = "/admin/addproduct";
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
let popupContainer;
let overlay;
let ExtraChoiceOptions = [];
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
async function CreateObjectFromFormData(url, data) {
    let createAPIURL = CreateApiURL(url);
    try {
        const response = await fetch(createAPIURL, {
            method: 'POST',
            body: data
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
        case URLS.AddExtraChoice:
            await CreateExtraChoiceFunctionality(url);
            break;
        case URLS.AddProduct:
            await CreateProductFunctionality(url);
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
async function CreateExtraChoiceFunctionality(url) {
    let popupButton = document.getElementById(ID_NAMES.EXTRACHOICE_OPEN_POPUP_BUTTON);
    popupContainer = document.getElementById(ID_NAMES.EXTRACHOICE_POPUP_CONTAINER);
    overlay = document.getElementById(ID_NAMES.OVERLAY);
    ExtraChoiceOptions = [];
    InitializePopupForm();
    popupButton.addEventListener('click', (event) => {
        event.preventDefault();
        popupContainer.classList.remove(CLASS_NAMES.HIDE);
        overlay.classList.remove(CLASS_NAMES.HIDE);
    });
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (!CheckFormValidity()) {
            return;
        }
        const titleInput = PartialContainer.querySelector(`#${ID_NAMES.EXTRACHOICE_TITLE}`);
        const recognizablenameInput = PartialContainer.querySelector(`#${ID_NAMES.EXTRACHOICE_RECOGNIZABLENAME}`);
        const ExtraChoiceData = {
            Title: titleInput.value,
            RecognizableName: recognizablenameInput.value,
            ExtraChoiceOptions: ExtraChoiceOptions
        };
        await CreateObjectFromData(url, ExtraChoiceData);
    });
}
function InitializePopupForm() {
    let addOptionButton = document.getElementById(ID_NAMES.EXTRACHOICE_ADD_OPTION_BUTTON);
    addOptionButton.addEventListener('click', (event) => {
        event.preventDefault();
        const form = document.getElementById(ID_NAMES.EXTRACHOICE_FORM);
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        let nameInput = document.getElementById(ID_NAMES.EXTRACHOICE_OPTION_NAME);
        let descriptionInput = document.getElementById(ID_NAMES.EXTRACHOICE_OPTION_DESCRIPTION);
        let extraPriceInput = document.getElementById(ID_NAMES.EXTRACHOICE_OPTION_PRICE);
        let optionData = {
            Name: nameInput.value,
            Description: descriptionInput.value,
            ExtraPrice: Number.parseInt(extraPriceInput.value)
        };
        ExtraChoiceOptions.push(optionData);
        console.log(ExtraChoiceOptions);
        UpdateListOfOptions();
        popupContainer.classList.add(CLASS_NAMES.HIDE);
        overlay.classList.add(CLASS_NAMES.HIDE);
    });
    let popupCloseBtn = document.getElementById(ID_NAMES.EXTRACHOICE_POPUP_CLOSE_BUTTON);
    popupCloseBtn.addEventListener('click', () => {
        popupContainer.classList.add(CLASS_NAMES.HIDE);
        overlay.classList.add(CLASS_NAMES.HIDE);
    });
}
function UpdateListOfOptions() {
    let optionlist = document.getElementById(ID_NAMES.EXTRACHOICE_OPTION_LIST);
    optionlist.innerHTML = '';
    ExtraChoiceOptions.forEach((item) => {
        let listelement = document.createElement('p');
        let textnode = document.createTextNode(item.Name);
        listelement.appendChild(textnode);
        optionlist.appendChild(listelement);
    });
}
async function CreateProductFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (!CheckFormValidity()) {
            return;
        }
        const nameInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_NAME}`);
        const priceInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_PRICE}`);
        const orgInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_ORGANIZATION}`);
        const categoryInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_CATEGORY}`);
        const imagesInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_IMAGES}`);
        const sizesInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_SIZES}`);
        const extraChoicesInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_EXTRACHOICES}`);
        const colorsInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_COLORS}`);
        const descriptionInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_DESCRIPTION}`);
        const formData = new FormData();
        formData.append("Name", nameInput.value);
        formData.append("Price", priceInput.value);
        formData.append("OrganizationID", orgInput.value);
        formData.append("CategoryID", categoryInput.value);
        Array.from(imagesInput.files).forEach((file, index) => {
            formData.append(`Images[${index}]`, file);
        });
        Array.from(sizesInput.selectedOptions).forEach(size => formData.append("Sizes", size.value));
        Array.from(extraChoicesInput.selectedOptions).forEach(choice => formData.append("ExtraChoices", choice.value));
        Array.from(colorsInput.selectedOptions).forEach(color => formData.append("Colors", color.value));
        formData.append("Description", descriptionInput.value);
        console.log(formData);
        await CreateObjectFromFormData(url, formData);
    });
}
export {};
//# sourceMappingURL=Admin.js.map