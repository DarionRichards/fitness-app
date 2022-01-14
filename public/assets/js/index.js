const signUpFormElement = $("#signup-form");

const handleSignUp = async(event) => {
    event.preventDefault();

    const firstName = $("#first-name-input").val();
    const lastName = $("#last-name-input").val();
    const username = $("#username-input").val();
    const email = $("#email-input").val();
    const password = $("#password-input").val();
    const confirmPassword = $("#confirm-password-input").val();
    const age = $("#age-select :selected").text();

    if (password.length < 8) {
        alert("Password must be 8 or more characters");
    } else if (password.length > 20) {
        alert("Password must be 20 characters or less");
    } else if (password !== confirmPassword) {
        alert("Passwords do not match");
    } else {
        const response = await fetch("/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                user_name: username,
                email,
                password,
                age,
            }),
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {
            alert("Successfully created account");
            window.location.replace("/login");
        }
    }
};

signUpFormElement.on("submit", handleSignUp);