document.addEventListener('DOMContentLoaded', () => {
    // Get the form and buttons
    const form = document.getElementById('registrationForm');
    const registerBtn = document.getElementById('registerBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const backBtn = document.getElementById('backBtn');

    // --- Validation Function ---
    function validateField(fieldId, errorId, validationLogic, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(errorId);
        
        let isValid = validationLogic(field.value.trim());

        if (isValid) {
            errorDiv.style.display = 'none';
            field.style.borderColor = '#ccc'; // Reset border color
        } else {
            errorDiv.textContent = errorMessage; // Set specific error message
            errorDiv.style.display = 'block';
            field.style.borderColor = 'red'; // Highlight invalid field
        }
        return isValid;
    }

    // --- Validation Logic for Each Field ---
    const validations = {
        // Name: Cannot be empty
        name: () => validateField(
            'name', 
            'nameError', 
            (val) => val.length > 0, 
            "Name cannot be empty."
        ),

        // Registration Number: Cannot be empty
        regNo: () => validateField(
            'regNo', 
            'regNoError', 
            (val) => val.length > 0, 
            "Registration Number cannot be empty."
        ),

        // Email: Basic format validation
        email: () => validateField(
            'email', 
            'emailError', 
            (val) => val.length > 0 && /\S+@\S+\.\S+/.test(val),
            "Please enter a valid email address (e.g., user@vitapstudent.ac.in)."
        ),

        // Mobile Number: Must be exactly 10 digits
        mobile: () => validateField(
            'mobile', 
            'mobileError', 
            (val) => /^\d{10}$/.test(val),
            "Mobile Number must be exactly 10 digits."
        )
    };

    // --- Event Listeners for Buttons ---
    
    const msg = document.getElementById("msg");
    // 1. Register Button
    registerBtn.addEventListener('click', () => {
        let isFormValid = true;

        // Run all validations
        // Short-circuiting with && might prevent all errors from showing at once, 
        // so we call them explicitly.
        const nameValid = validations.name();
        const regNoValid = validations.regNo();
        const emailValid = validations.email();
        const mobileValid = validations.mobile();

        // Check overall validity
        isFormValid = nameValid && regNoValid && emailValid && mobileValid;

        if (isFormValid) {
            // Success Message
            msg.textContent = "Registration Successful!";
            msg.style.color = "green";
            msg.style.display = "block";
            msg.style.fontWeight = "bold";
                        
            // You might redirect the user here in a real application
            // window.location.href = 'success.html'; 

            // Clear the form after successful registration
            form.reset(); 
        } else {
            // Failure Message
            // Hide all error messages and reset border colors
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            document.querySelectorAll('input').forEach(el => el.style.borderColor = '#ccc');
            msg.textContent = "Please fill the Details";
            msg.style.color = "red";
            msg.style.display = "block";
            msg.style.fontWeight = "bold";
        }
    });

    // 2. Cancel Button
    cancelBtn.addEventListener('click', () => {
        // Clear all form fields
        form.reset();
        msg.textContent = "Details Cleared";
        msg.style.color = "grey";
        msg.style.display = "block";
        msg.style.fontWeight = "bold";
        msg.style.fontSize="12px";
        // Hide all error messages and reset border colors
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('input').forEach(el => el.style.borderColor = '#ccc');
    });

    // 3. Back Button
    backBtn.addEventListener('click', () => {
        // Direct the user back to the homepage (index.html)
        window.location.href = 'index.html';
    });

    // --- Real-time Validation (Optional but good practice) ---
    // Validate fields as the user types/leaves the field (blur event)
    document.getElementById('name').addEventListener('blur', validations.name);
    document.getElementById('regNo').addEventListener('blur', validations.regNo);
    document.getElementById('email').addEventListener('blur', validations.email);
    document.getElementById('mobile').addEventListener('blur', validations.mobile);

});