// order.js
// Order form: one file for ALL product pages.
// When the visitor clicks ORDER NOW, it reads the shirt info from the page
// (name and price from the h1, color, chosen size, quantity),
// then opens their email app with the order already written,
// addressed to orders@examplewebsite142.com.

const ORDER_EMAIL = "orders@examplewebsite142.com";

const orderForm = document.querySelector(".product-info form");
const quantityInput = document.getElementById("quantity");

// Use our own error message instead of the browser's default popup
orderForm.noValidate = true;

function getProductNameAndPrice() {
    const heading = document.querySelector(".product-header").textContent.trim();
    const parts = heading.split("|");
    return {
        name: parts[0].trim(),
        price: parts[1] ? parts[1].trim() : ""
    };
}


function getColor() {
    const lines = document.querySelectorAll(".product-info p");
    for (const line of lines) {
        const text = line.textContent.trim();
        if (text.toLowerCase().startsWith("color:")) {
            return text.substring(6).trim();
        }
    }
    return "";
}

// Show an error message under the quantity box
function showQuantityError(text) {
    clearQuantityError();
    const error = document.createElement("p");
    error.className = "form-error";
    error.id = "quantity-error";
    error.textContent = "⚠ " + text;
    quantityInput.insertAdjacentElement("afterend", error);
    quantityInput.classList.add("input-error");
    quantityInput.setAttribute("aria-invalid", "true");
    quantityInput.setAttribute("aria-describedby", "quantity-error");
}

function clearQuantityError() {
    const oldError = document.getElementById("quantity-error");
    if (oldError) {
        oldError.remove();
    }
    quantityInput.classList.remove("input-error");
    quantityInput.removeAttribute("aria-invalid");
    quantityInput.removeAttribute("aria-describedby");
}

orderForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const product = getProductNameAndPrice();
    const color = getColor();
    const chosenSize = document.querySelector('input[name="size"]:checked');
    const quantity = Number(quantityInput.value);

    // Check quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
        showQuantityError("Please enter a quantity of 1 or more.");
        quantityInput.focus();
        return;
    }
    clearQuantityError();

    const size = chosenSize ? chosenSize.value : "XS";

    // Total
    const unitPrice = Number(product.price.replace(/[^0-9.]/g, ""));
    const total = unitPrice ? "PHP " + (unitPrice * quantity) : "";

    // Build the email
    const subject = "Order: " + product.name + " (" + size + ") x " + quantity;
    const body =
        "Hello Mitolokal! I would like to order:\n\n" +
        "Product: " + product.name + "\n" +
        (color ? "Color: " + color + "\n" : "") +
        "Size: " + size + "\n" +
        "Quantity: " + quantity + "\n" +
        "Price: " + product.price + " each\n" +
        (total ? "Total: " + total + "\n" : "") +
        "\nMy name:\n" +
        "My contact number:\n" +
        "My delivery address:\n";

    const mailtoLink =
        "mailto:" + ORDER_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    // Open the visitor's email app
    window.location.href = mailtoLink;
});

quantityInput.addEventListener("input", clearQuantityError);
