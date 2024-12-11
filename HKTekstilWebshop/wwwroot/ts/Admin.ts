enum CLASS_NAMES {
    DROPDOWN_CONTAINER = 'Admin-Dropdown',
    DROPDOWN_OPTION = 'Admin-Dropdown-Option',
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
    ORG_NAME = 'Organization-Name',
    ORG_ADDRESS = 'Organization-Address',
    ORG_CONTACTEMAIL = 'Organization-Contact-Email',
    ORG_CONTACTPHONENUMBER = 'Organization-Contact-Phonenumber',

}

enum URLS {
    AddOrganization = '/admin/addorganization',
    AddRegisterCode = '/admin/addregistercode',
    AddCategory = '/admin/addcategory',
    AddSize = '/admin/addsize',
    AddColor = '/admin/addcolor',
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