document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const gmail = document.getElementById("gmail").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const messageElement = document.getElementById("message");

    if (!gmail.includes("@gmail.com")) {
        messageElement.textContent = "Please enter a valid Gmail address.";
        return;
    }

    if (username.length < 3) {
        messageElement.textContent = "Username must be at least 3 characters.";
        return;
    }

    if (password.length < 6) {
        messageElement.textContent = "Password must be at least 6 characters.";
        return;
    }

    try {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ gmail, username, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.style.color = "green";
            messageElement.textContent = data.message;
        } else {
            messageElement.style.color = "red";
            messageElement.textContent = data.message;
        }
    } catch (error) {
        messageElement.style.color = "red";
        messageElement.textContent = "An error occurred. Please try again.";
    }
});
