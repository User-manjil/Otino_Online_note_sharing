

const form = document.getElementById("signupForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if(fullname === ""){
        nameError.textContent = "Full name is required";
        isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)){
        emailError.textContent = "Enter valid email";
        isValid = false;
    }

    if(password.length < 6){
        passwordError.textContent = "Password must be at least 6 characters";
        isValid = false;
    }

    // If validation passes → send to backend
    if(isValid){

        try{

            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname: fullname,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            alert(data.message || "Request sent to backend ");

        } catch(error){
            console.error("Error:", error);
            alert("Backend not connected yet ⚠️");
        }

    }

});
