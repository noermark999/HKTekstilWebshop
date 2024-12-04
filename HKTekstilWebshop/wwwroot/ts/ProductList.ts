enum CLASS_NAMES {
    PRODUCT_ITEMS = 'Products-List-Item-Container',
}

enum ID_NAMES {

}

enum API_URLS {

}


document.addEventListener('DOMContentLoaded', function () {
    initializeProductDetailsButtons()
});

function initializeProductDetailsButtons() {
    const allProducts = document.getElementsByClassName(CLASS_NAMES.PRODUCT_ITEMS)

    for (var product of allProducts) {
        const productId = product.id;
        product.addEventListener('click', () => {
            window.location.href = `/produktdetaljer/${productId}`;
        });
    }
}


