// ======================================
// SHOEZONE ETHIOPIA - JAVASCRIPT
// ======================================


// CART

let cart = [];


// HTML ELEMENTS

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const languageSelect = document.getElementById("languageSelect");


// ADD PRODUCTS TO CART

document.querySelectorAll(".add-to-cart").forEach(function (button) {

    button.addEventListener("click", function () {

        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        const existingProduct = cart.find(function (item) {
            return item.name === productName;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        renderCart();

        alert(productName + " added to your cart!");
    });

});


// DISPLAY CART

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }

    cart.forEach(function (item, index) {

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        const itemInformation = document.createElement("div");

        const itemTitle = document.createElement("h3");

        itemTitle.textContent = item.name;

        const itemPrice = document.createElement("p");

        itemPrice.textContent =
            "ETB " + (item.price * item.quantity).toLocaleString();

        const itemQuantity = document.createElement("p");

        itemQuantity.textContent =
            "Quantity: " + item.quantity;

        itemInformation.appendChild(itemTitle);
        itemInformation.appendChild(itemPrice);
        itemInformation.appendChild(itemQuantity);

        const removeButton = document.createElement("button");

        removeButton.className = "remove-item";
        removeButton.textContent = "REMOVE";

        removeButton.addEventListener("click", function () {

            cart.splice(index, 1);

            renderCart();

        });

        itemElement.appendChild(itemInformation);
        itemElement.appendChild(removeButton);

        cartItems.appendChild(itemElement);

    });


    // CALCULATE TOTAL

    let total = 0;

    cart.forEach(function (item) {
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toLocaleString();

}


// CLEAR CART

document.getElementById("clearCart").addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your cart is already empty.");
        return;
    }

    const confirmClear = confirm("Do you want to clear your cart?");

    if (confirmClear) {

        cart = [];

        renderCart();

    }

});


// SEARCH PRODUCTS

searchInput.addEventListener("input", filterProducts);


// FILTER BY CATEGORY

categoryFilter.addEventListener("change", filterProducts);


function filterProducts() {

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedCategory = categoryFilter.value;

    const products = document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        const productName =
            product.querySelector("h3").textContent.toLowerCase();

        const productCategory = product.dataset.category;

        const matchesSearch = productName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ORDER THROUGH WHATSAPP

document.getElementById("orderWhatsApp").addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Please add a product to your cart first.");

        return;

    }


    let message = "Hello ShoeZone Ethiopia! I want to enquire about these products:\n\n";

    let total = 0;

    cart.forEach(function (item) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        message +=
            item.name +
            " - Quantity: " +
            item.quantity +
            " - Example price: ETB " +
            subtotal.toLocaleString() +
            "\n";

    });


    message += "\nExample total: ETB " + total.toLocaleString();

    message +=
        "\n\nPlease confirm actual availability, materials, sizes, final prices, and delivery to my location before I pay.";

    message +=
        "\n\nMy delivery location is: [Please enter your city or town].";


    const whatsappURL =
        "https://wa.me/251937959272?text=" +
        encodeURIComponent(message);


    window.open(whatsappURL, "_blank", "noopener,noreferrer");

});


// LANGUAGE TRANSLATIONS

const translations = {

    en: {

        home: "Home",
        products: "Products",
        about: "About Us",
        contact: "Contact",
        cart: "Cart",

        welcome: "WELCOME TO SHOEZONE ETHIOPIA",

        heroTitle: "STYLE THAT DEFINES YOU.",

        heroDescription:
            "Discover men's shoes, shirts, trousers, and accessories. Quality men's fashion delivered across Ethiopia.",

        shopNow: "SHOP NOW",

        productsTitle: "MEN'S FASHION",

        productsDescription:
            "Find your style. Choose your quality.",

        cartTitle: "SHOPPING CART",

        aboutTitle: "MEN'S STYLE. ETHIOPIAN SERVICE.",

        aboutDescription:
            "ShoeZone Ethiopia is building a men's fashion shopping experience focused on shoes, shirts, trousers, and accessories. We aim to source products from Harar and Dire Dawa and serve customers throughout Ethiopia.",

        contactTitle: "CONTACT SHOEZONE"

    },


    am: {

        home: "መነሻ",
        products: "ምርቶች",
        about: "ስለ እኛ",
        contact: "ያግኙን",
        cart: "የግዢ ቅርጫት",

        welcome: "ወደ SHOEZONE ETHIOPIA እንኳን በደህና መጡ",

        heroTitle: "የራስዎን ዘይቤ ይግለጹ።",

        heroDescription:
            "የወንዶች ጫማዎችን፣ ሸሚዞችን፣ ሱሪዎችን እና የፋሽን መለዋወጫዎችን ያግኙ።",

        shopNow: "አሁን ይግዙ",

        productsTitle: "የወንዶች ፋሽን",

        productsDescription:
            "የሚመጥንዎትን ዘይቤ ይምረጡ።",

        cartTitle: "የግዢ ቅርጫት",

        aboutTitle: "የወንዶች ዘይቤ። አገር አቀፍ አገልግሎት።",

        aboutDescription:
            "ShoeZone Ethiopia የወንዶች ጫማዎችን፣ ሸሚዞችን፣ ሱሪዎችን እና መለዋወጫዎችን ለማቅረብ ይሠራል። ከሐረር እና ከድሬዳዋ ምርቶችን ለማግኘት እና በመላው ኢትዮጵያ ለደንበኞች ለማቅረብ እንጥራለን።",

        contactTitle: "SHOEZONEን ያግኙ"

    },


    om: {

        home: "Mana",
        products: "Oomishaalee",
        about: "Waa'ee Keenya",
        contact: "Nu Quunnamaa",
        cart: "Gaarii Bittaa",

        welcome: "BAGA GARA SHOEZONE ETHIOPIA DHUFTAN",

        heroTitle: "AKKA OFII KEESSANII TA'AA.",

        heroDescription:
            "Kophee dhiiraa, shaamiza, surree fi meeshaalee faashinii argadhaa. Tajaajila geejjibaa bakka geejjibni danda'ametti.",

        shopNow: "AMMA BITADHAA",

        productsTitle: "FAASHINII DHIIRAA",

        productsDescription:
            "Akkaataa isinitti tolu filadhaa.",

        cartTitle: "GAARII BITTAA",

        aboutTitle: "FAASHINII DHIIRAA. TAJAAJILA ITOOPHIYAA.",

        aboutDescription:
            "ShoeZone Ethiopia kophee dhiiraa, shaamiza, surree fi meeshaalee faashinii dhiyeessuuf hojjechaa jira. Harar fi Dirree Dhawaa irraa oomisha argachuuf, akkasumas guutuu Itoophiyaa keessatti maamiltoota tajaajiluuf ni hojjenna.",

        contactTitle: "SHOEZONE QUUNNAMAA"

    }

};


// CHANGE WEBSITE LANGUAGE

languageSelect.addEventListener("change", function () {

    const selectedLanguage = languageSelect.value;

    const text = translations[selectedLanguage];

    document.querySelectorAll("[data-translate]").forEach(function (element) {

        const translationKey = element.dataset.translate;

        if (text[translationKey]) {

            element.textContent = text[translationKey];

        }

    });

});


// CURRENT YEAR

document.getElementById("year").textContent = new Date().getFullYear();


// INITIALIZE CART

renderCart();