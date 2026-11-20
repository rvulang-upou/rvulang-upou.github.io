// contact.js
// Contact form: when the visitor clicks SEND, check the fields,
// then open their email app with the message already written,
// addressed to hello@examplewebsite142.com.

const STORE_EMAIL = "hello@examplewebsite142.com";

const contactForm = document.getElementById("contactform");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


contactForm.noValidate = true;


function showError(input, text) {
    clearError(input);
    const error = document.createElement("p");
    error.className = "form-error";
    error.id = input.id + "-error";
    error.textContent = "⚠ " + text;
    input.insertAdjacentElement("afterend", error);
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", error.id);
}

// Remove the error message from a field
function clearError(input) {
    const oldError = document.getElementById(input.id + "-error");
    if (oldError) {
        oldError.remove();
    }
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
}

// Simple email check: something@something.something
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    let firstInvalid = null;

    // Check email
    if (email === "") {
        showError(emailInput, "Please enter your email address.");
        firstInvalid = firstInvalid || emailInput;
    } else if (!isValidEmail(email)) {
        showError(emailInput, "Please enter a valid email address, like juan@email.com.");
        firstInvalid = firstInvalid || emailInput;
    } else {
        clearError(emailInput);
    }

    // Check message
    if (message === "") {
        showError(messageInput, "Please type your message.");
        firstInvalid = firstInvalid || messageInput;
    } else {
        clearError(messageInput);
    }

    // If something is wrong, move keyboard focus to the first problem
    if (firstInvalid) {
        firstInvalid.focus();
        return;
    }

    // Build the email
    const subject = "Inquiry from " + (name || "a Mitolokal customer");
    const body =
        "Name: " + (name || "(not given)") + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message;

    const mailtoLink =
        "mailto:" + STORE_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    // Open the visitor's email app
    window.location.href = mailtoLink;
});

// Clear an error as soon as the visitor starts fixing the field
[emailInput, messageInput].forEach(function (input) {
    input.addEventListener("input", function () {
        clearError(input);
    });
});
