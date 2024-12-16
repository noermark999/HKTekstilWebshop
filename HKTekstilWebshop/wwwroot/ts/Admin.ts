enum CLASS_NAMES {
    DROPDOWN_CONTAINER = 'Admin-Dropdown',
    DROPDOWN_OPTION = 'Admin-Dropdown-Option',
    HIDE = 'Hide',
}

enum ID_NAMES {
    AddOrganization = 'AddOrganization',
    AddRegisterCode = 'AddRegisterCode',
    AddProduct = 'AddProduct',
    AddCategory = 'AddCategory',
    AddColor = 'AddColor',
    AddSize = 'AddSize',
    AddExtraChoice = 'AddExtraChoice',
    PARTIAL_CONTAINER = 'Admin-Partial-Container',
    PARTIAL_FORM = 'Admin-Partial-Form',
    PARTIAL_CREATE_BUTTON = 'Admin-Partial-Button-Create',
    ORGANIZATION_DROPDOWN = 'Organization-Dropdown',
    REGISTERCODE_INPUT = 'Admin-Partial-RegisterCode-Input',
    REGISTERCODE_LIST_PARTIAL_CONTAINER = 'Admin-Partial-List-Container-id',
    CREATE_SIZE_INPUT = 'Admin-Partial-Size-Input',
    CREATE_COLOR_INPUT = 'Color-Name',
    CATEGORY_NAME_INPUT = 'Category-Name',
    CATEGORY_DESCRIPTION_TEXTAREA = 'Category-Description',
    EXTRACHOICE_OPEN_POPUP_BUTTON = 'Admin-Partial-Button-ExtraOption',
    EXTRACHOICE_POPUP_CONTAINER = 'Admin-Partial-Popup-Container',
    EXTRACHOICE_ADD_OPTION_BUTTON = 'Admin-Partial-Button-ExtraOption-Add',
    EXTRACHOICE_OPTION_NAME = 'ExtraOption-Name',
    EXTRACHOICE_OPTION_DESCRIPTION = 'ExtraOption-Description',
    EXTRACHOICE_OPTION_PRICE = 'ExtraOption-ExtraPrice',
    EXTRACHOICE_FORM = 'Admin-Partial-ExtraOption-Form',
    EXTRACHOICE_POPUP_CLOSE_BUTTON = 'Admin-Partial-Popup-Close',
    EXTRACHOICE_OPTION_LIST = 'Admin-Partial-ExtraChoiceOption-List',
    EXTRACHOICE_TITLE = 'ExtraChoice-Title',
    EXTRACHOICE_RECOGNIZABLENAME = 'ExtraChoice-RecognizableName',
    ORG_NAME = 'Organization-Name',
    ORG_ADDRESS = 'Organization-Address',
    ORG_CONTACTEMAIL = 'Organization-Contact-Email',
    ORG_CONTACTPHONENUMBER = 'Organization-Contact-Phonenumber',
    PRODUCT_NAME = 'Product-Name',
    PRODUCT_PRICE = 'Product-Price',
    PRODUCT_ORGANIZATION = 'Product-Organization',
    PRODUCT_CATEGORY = 'Product-Category',
    PRODUCT_IMAGES = 'Product-Images',
    PRODUCT_SIZES = 'Product-Sizes',
    PRODUCT_EXTRACHOICES = 'Product-ExtraChoices',
    PRODUCT_COLORS = 'Product-Colors',
    PRODUCT_DESCRIPTION = 'Product-Description',
    OVERLAY = 'Overlay',
}

enum URLS {
    AddOrganization = '/admin/addorganization',
    AddRegisterCode = '/admin/addregistercode',
    AddCategory = '/admin/addcategory',
    AddSize = '/admin/addsize',
    AddColor = '/admin/addcolor',
    AddExtraChoice = '/admin/addextrachoice',
    AddProduct = '/admin/addproduct'
}

function CreateApiURL(url: string) {
    return `${url}/create`
}

function GetRegisterCodesForOrganizationURL(ID) {
    return `/admin/getregistercodes/${ID}`
}

// GLOBAL FIELDS
let PartialContainer: HTMLElement
let createbutton: HTMLButtonElement
let organizationDropdown: HTMLSelectElement
let popupContainer: HTMLElement
let overlay: HTMLElement
let ExtraChoiceOptions: { Name: string, Description: string, ExtraPrice: number }[] = []

document.addEventListener('DOMContentLoaded', function () {
    PartialContainer = document.getElementById(ID_NAMES.PARTIAL_CONTAINER)

    InitializeDropdownOptionsWithDelegation()
});

// --------------------------------- Helper methods --------------------------------------------
async function CreateObjectFromData(url: string, data) {
    let createAPIURL = CreateApiURL(url)

    try {

        const response = await fetch(createAPIURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const errorData = await response.text()
            alert(errorData || response.statusText)
        }
        setTimeout(async () => {
            await GetPartialForDropdownOption(url)
        }, 100);
        

    } catch (error) {
        alert(error)
    }
}

async function CreateObjectFromFormData(url: string, data: FormData) {
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

    } catch (error) {
        alert(error);
    }
}

function CheckFormValidity() {
    const form = document.getElementById(ID_NAMES.PARTIAL_FORM) as HTMLFormElement

    if (!form.checkValidity()) {
        form.reportValidity()
        return false
    } else {
        return true
    }
}

// -----------------------------------------------------------------------------

function InitializeDropdownOptionsWithDelegation() {
    let dropdowns = document.getElementsByClassName(CLASS_NAMES.DROPDOWN_CONTAINER)

    for (let dropdown of dropdowns) {
        dropdown.addEventListener('click', async (event) => {
            const targetElement = event.target as HTMLElement

            if (targetElement.classList.contains(CLASS_NAMES.DROPDOWN_OPTION)) {
                const url = targetElement.getAttribute('apiurl')
                await GetPartialForDropdownOption(url)
            }
        })
    }
}

async function GetPartialForDropdownOption(url: string) {
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
        let responsetext = await response.text()

        PartialContainer.innerHTML = responsetext;

        await InitializePartials(url);
    } catch (error) {
        console.error('Error during fetch or processing response:', error);
        alert(`An error was encountered when retrieving item info: ${error}`);
    }
}


async function InitializePartials(url) {
    createbutton = document.getElementById(ID_NAMES.PARTIAL_CREATE_BUTTON) as HTMLButtonElement
    organizationDropdown = document.getElementById(ID_NAMES.ORGANIZATION_DROPDOWN) as HTMLSelectElement
    console.log(organizationDropdown)
    switch (url) {
        case URLS.AddSize:
            await CreateSizeFunctionality(url)
            break;
        case URLS.AddOrganization:
            await CreateOrganizationFunctionality(url)
            break;
        case URLS.AddRegisterCode:
            await CreateRegisterCodeFunctionality(url)
            break;
        case URLS.AddCategory:
            await CreateCategoryFunctionality(url)
            break;
        case URLS.AddColor:
            await CreateColorFunctionality(url)
            break;
        case URLS.AddExtraChoice:
            await CreateExtraChoiceFunctionality(url)
            break;
        case URLS.AddProduct:
            await CreateProductFunctionality(url)
            break;
    }
}

async function CreateSizeFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault()

        if (!CheckFormValidity()) {
            return
        }

        const sizeinput = PartialContainer.querySelector(`#${ID_NAMES.CREATE_SIZE_INPUT}`) as HTMLInputElement
        const SizeData = {
            Size: sizeinput.value
        }
        await CreateObjectFromData(url, SizeData)
    })
}

async function CreateOrganizationFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault()

        if (!CheckFormValidity()) {
            return
        }

        const NameInput = PartialContainer.querySelector(`#${ID_NAMES.ORG_NAME}`) as HTMLInputElement
        const AddressInput = PartialContainer.querySelector(`#${ID_NAMES.ORG_ADDRESS}`) as HTMLInputElement
        const ContactEmailInput = PartialContainer.querySelector(`#${ID_NAMES.ORG_CONTACTEMAIL}`) as HTMLInputElement
        const ContactPhoneNumberInput = PartialContainer.querySelector(`#${ID_NAMES.ORG_CONTACTPHONENUMBER}`) as HTMLInputElement

        const OrganizationData = {
            Name: NameInput.value,
            Address: AddressInput.value,
            ContactEmail: ContactEmailInput.value,
            ContactPhoneNumber: ContactPhoneNumberInput.value,
        }
        await CreateObjectFromData(url, OrganizationData)
    })
}

async function CreateRegisterCodeFunctionality(url) {
    organizationDropdown.addEventListener('change', async (event) => {
        let targetelement = event.target as HTMLOptionElement
        console.log(targetelement.value)
        await GetRegisterCodesForOrganization(targetelement.value)
    })
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault()

        if (!CheckFormValidity()) {
            return
        }

        const registercode = PartialContainer.querySelector(`#${ID_NAMES.REGISTERCODE_INPUT}`) as HTMLInputElement

        const RegisterCodeData = {
            Code: registercode.value,
            Organization: organizationDropdown.value
        }
        await CreateObjectFromData(url, RegisterCodeData)
    })
}

async function GetRegisterCodesForOrganization(ID) {
    try {
        console.log(GetRegisterCodesForOrganizationURL(ID))
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

        let responsetext = await response.text()
        let listcontainer = document.getElementById(ID_NAMES.REGISTERCODE_LIST_PARTIAL_CONTAINER) as HTMLElement
        listcontainer.innerHTML = responsetext;

    } catch (error) {
        console.error('Error during fetch or processing response:', error);
        alert(`An error was encountered when retrieving item info: ${error}`);
    }
}

async function CreateCategoryFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault()

        if (!CheckFormValidity()) {
            return
        }

        const categorynameInput = PartialContainer.querySelector(`#${ID_NAMES.CATEGORY_NAME_INPUT}`) as HTMLInputElement
        const categoryDescriptionInput = PartialContainer.querySelector(`#${ID_NAMES.CATEGORY_DESCRIPTION_TEXTAREA}`) as HTMLTextAreaElement
        const CategoryData = {
            Name: categorynameInput.value,
            Description: categoryDescriptionInput.value
        }
        await CreateObjectFromData(url, CategoryData)
    })
}

async function CreateColorFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault()

        if (!CheckFormValidity()) {
            return
        }

        const colorInput = PartialContainer.querySelector(`#${ID_NAMES.CREATE_COLOR_INPUT}`) as HTMLInputElement
         
        const ColorData = {
            ColorName: colorInput.value
        }
        await CreateObjectFromData(url, ColorData)
    })
}

async function CreateExtraChoiceFunctionality(url) {
    let popupButton = document.getElementById(ID_NAMES.EXTRACHOICE_OPEN_POPUP_BUTTON) as HTMLButtonElement
    popupContainer = document.getElementById(ID_NAMES.EXTRACHOICE_POPUP_CONTAINER) as HTMLElement
    overlay = document.getElementById(ID_NAMES.OVERLAY) as HTMLElement
    ExtraChoiceOptions = []

    InitializePopupForm()

    popupButton.addEventListener('click', (event) => {
        event.preventDefault()
        popupContainer.classList.remove(CLASS_NAMES.HIDE)
        overlay.classList.remove(CLASS_NAMES.HIDE)
    })

    createbutton.addEventListener('click', async (event) => {
        event.preventDefault()

        if (!CheckFormValidity()) {
            return
        }

        const titleInput = PartialContainer.querySelector(`#${ID_NAMES.EXTRACHOICE_TITLE}`) as HTMLInputElement
        const recognizablenameInput = PartialContainer.querySelector(`#${ID_NAMES.EXTRACHOICE_RECOGNIZABLENAME}`) as HTMLInputElement

        const ExtraChoiceData = {
            Title: titleInput.value,
            RecognizableName: recognizablenameInput.value,
            ExtraChoiceOptions: ExtraChoiceOptions
        }
        await CreateObjectFromData(url, ExtraChoiceData)
    })
}

function InitializePopupForm() {
    let addOptionButton = document.getElementById(ID_NAMES.EXTRACHOICE_ADD_OPTION_BUTTON) as HTMLButtonElement
    addOptionButton.addEventListener('click', (event) => {
        event.preventDefault()

        const form = document.getElementById(ID_NAMES.EXTRACHOICE_FORM) as HTMLFormElement

        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }

        let nameInput = document.getElementById(ID_NAMES.EXTRACHOICE_OPTION_NAME) as HTMLInputElement
        let descriptionInput = document.getElementById(ID_NAMES.EXTRACHOICE_OPTION_DESCRIPTION) as HTMLInputElement
        let extraPriceInput = document.getElementById(ID_NAMES.EXTRACHOICE_OPTION_PRICE) as HTMLInputElement

        let optionData = {
            Name: nameInput.value,
            Description: descriptionInput.value,
            ExtraPrice: Number.parseInt(extraPriceInput.value)
        }
        
        ExtraChoiceOptions.push(optionData)
        console.log(ExtraChoiceOptions)
        UpdateListOfOptions()
        popupContainer.classList.add(CLASS_NAMES.HIDE)
        overlay.classList.add(CLASS_NAMES.HIDE)
    })

    let popupCloseBtn = document.getElementById(ID_NAMES.EXTRACHOICE_POPUP_CLOSE_BUTTON) as HTMLButtonElement
    popupCloseBtn.addEventListener('click', () => {
        popupContainer.classList.add(CLASS_NAMES.HIDE)
        overlay.classList.add(CLASS_NAMES.HIDE)
    })
}

function UpdateListOfOptions() {
    let optionlist = document.getElementById(ID_NAMES.EXTRACHOICE_OPTION_LIST) as HTMLElement
    optionlist.innerHTML = ''
    ExtraChoiceOptions.forEach((item) => {
        let listelement = document.createElement('p')
        let textnode = document.createTextNode(item.Name)
        listelement.appendChild(textnode)
        optionlist.appendChild(listelement)
    })
}

async function CreateProductFunctionality(url) {
    createbutton.addEventListener('click', async (event) => {
        event.preventDefault()

        if (!CheckFormValidity()) {
            return
        }

        const nameInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_NAME}`) as HTMLInputElement
        const priceInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_PRICE}`) as HTMLInputElement
        const orgInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_ORGANIZATION}`) as HTMLSelectElement
        const categoryInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_CATEGORY}`) as HTMLSelectElement
        const imagesInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_IMAGES}`) as HTMLInputElement
        const sizesInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_SIZES}`) as HTMLSelectElement
        const extraChoicesInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_EXTRACHOICES}`) as HTMLSelectElement
        const colorsInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_COLORS}`) as HTMLSelectElement
        const descriptionInput = PartialContainer.querySelector(`#${ID_NAMES.PRODUCT_DESCRIPTION}`) as HTMLTextAreaElement


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

        console.log(formData)

        await CreateObjectFromFormData(url, formData)
    })
}