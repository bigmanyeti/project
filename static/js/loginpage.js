const icon = document.getElementById("icon");
const pass = document.getElementById("password");
const gmailInput = document.getElementById("gmail");
const loginBtn = document.getElementById("login-btn");

const eyeOpenPath = icon.src.replace('lock-solid-24.png', 'lock-open-solid-24.png');
const eyeClosedPath = icon.src.replace('lock-open-solid-24.png', 'lock-solid-24.png');

icon.onclick = function() {
    if(pass.type === "password") {
        pass.type = "text";
        icon.src = eyeOpenPath;
    }
    else {
        pass.type = "password";
        icon.src = eyeClosedPath;
    }
}

// Validate Gmail input
gmailInput.addEventListener("input", function () {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|student\.ku\.edu\.np)$/;
    const isValid = gmailPattern.test(gmailInput.value);

    if (isValid) {
        gmailInput.parentElement.classList.remove("invalid");
        loginBtn.disabled = false;
    } else {
        gmailInput.parentElement.classList.add("invalid");
        loginBtn.disabled = true;
    }
});

const form = document.querySelector("form"); 
const loginpopup = document.querySelector(".login-popup");
const popupContent = loginpopup.querySelector(".popup-content");
const popupMessage = popupContent.querySelector("#popup-message");
const popupHeading = popupContent.querySelector("h2");
const closeButton = popupContent.querySelector(".close-btn");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("/login", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Login failed");
        }

        const responseText = await response.text();

        if (responseText.includes("<html")) {
            // Assuming the backend redirects to an HTML page upon success
            document.body.innerHTML = responseText;
        } else {
            const data = JSON.parse(responseText);

            popupHeading.innerHTML = '<span class="error-icon">❌</span> Login Failed';
            popupHeading.style.color = "#dc3545";
            popupMessage.textContent = data.error || "Invalid credentials";
            closeButton.style.backgroundColor = "#dc3545";
            closeButton.style.color = "#fff";
            loginpopup.style.display = "flex";
        }
    } catch (error) {
        console.error("An error occurred:", error);
        popupHeading.innerHTML = '<span class="error-icon">❌</span> Network Error';
        popupHeading.style.color = "#dc3545";
        popupMessage.textContent = error.message || "Unable to reach the server. Please try again.";
        closeButton.style.backgroundColor = "#dc3545";
        closeButton.style.color = "#fff";
        loginpopup.style.display = "flex";
    }
});


closeButton.addEventListener("click", () => {
    loginpopup.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === loginpopup) {
        loginpopup.style.display = "none";
    }
});