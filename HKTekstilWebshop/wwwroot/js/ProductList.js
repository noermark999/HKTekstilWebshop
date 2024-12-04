var CLASS_NAMES;
(function (CLASS_NAMES) {
    CLASS_NAMES["PRODUCT_ITEMS"] = "Products-List-Item-Container";
})(CLASS_NAMES || (CLASS_NAMES = {}));
var ID_NAMES;
(function (ID_NAMES) {
})(ID_NAMES || (ID_NAMES = {}));
var API_URLS;
(function (API_URLS) {
})(API_URLS || (API_URLS = {}));
document.addEventListener('DOMContentLoaded', function () {
    initializeProductDetailsButtons();
});
function initializeProductDetailsButtons() {
    const allProducts = document.getElementsByClassName(CLASS_NAMES.PRODUCT_ITEMS);
    for (var product of allProducts) {
        const productId = product.id;
        product.addEventListener('click', () => {
            window.location.href = `/produktdetaljer/${productId}`;
        });
    }
}
export {};
//# sourceMappingURL=ProductList.js.map