const form = document.getElementById("contactForm");

const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const message = document.getElementById("message").value.trim();

    // Check empty fields
    if(name === "" || email === "" || phone === "" || message === ""){

        alert("Please fill in all fields.");

        return;

    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){

        alert("Please enter a valid email address.");

        return;

    }

    // Validate phone number (digits only)
    const phonePattern = /^[0-9]+$/;

    if(!phonePattern.test(phone)){

        alert("Phone number should contain only digits.");

        return;

    }

    successMessage.textContent = "Your message has been sent successfully!";

    successMessage.style.color = "#00ff88";

    form.reset();

});