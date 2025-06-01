document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded successfully!');

    const heading = document.querySelector('h1');
    if (heading) {
        heading.addEventListener('click', function () {
            alert('Hello from Flask!');
        });
    }

    const form = document.getElementById('auth-form');
    if (form) {
        form.addEventListener('submit', submitForm);
    }

    const toggleButton = document.querySelector('.toggle-btn');
    const leftToggleBtn = document.getElementById('left-toggle-btn');

    let isSignIn = true; // track current state

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleFormMode);
    }

    if (leftToggleBtn) {
        leftToggleBtn.addEventListener('click', toggleFormMode);
    }

    function toggleFormMode() {
        isSignIn = !isSignIn;
        toggleForm(isSignIn ? 'sign-in' : 'sign-up');
    }

    function toggleForm(type) {
        const emailField = document.getElementById('email');
        const confirmPasswordField = document.getElementById('confirm-password');
        const usernameField = document.getElementById('username');
        const submitButton = document.getElementById('submit-btn');
        const toggleButton = document.querySelector('.toggle-btn');

        // Left Panel Elements
        const leftHeading = document.getElementById('left-heading');
        const leftText = document.getElementById('left-text');
        const leftToggleBtn = document.getElementById('left-toggle-btn');

        // Right Panel Headings
        const rightHeading = document.getElementById('form-title');
        const rightSubtext = document.querySelector('.right-panel span');

        if (type === 'sign-in') {
            if (emailField) emailField.style.display = 'none';
            if (confirmPasswordField) confirmPasswordField.style.display = 'none';
            if (submitButton) submitButton.textContent = 'Sign In';
            if (toggleButton) toggleButton.textContent = "Don't have an account? Sign Up";

            // Update right side
            if (rightHeading) rightHeading.textContent = 'Sign In';
            if (rightSubtext) rightSubtext.textContent = 'Use your email and password';

            // Update left panel
            if (leftHeading) leftHeading.textContent = 'New Here?';
            if (leftText) leftText.textContent = 'Sign up to access all features';
            if (leftToggleBtn) leftToggleBtn.textContent = 'Sign Up';
        } else {
            if (emailField) emailField.style.display = 'block';
            if (confirmPasswordField) confirmPasswordField.style.display = 'block';
            if (submitButton) submitButton.textContent = 'Sign Up';
            if (toggleButton) toggleButton.textContent = 'Already have an account? Sign In';

            // Update right side
            if (rightHeading) rightHeading.textContent = 'Create Account';
            if (rightSubtext) rightSubtext.textContent = 'Use your email for registration';

            // Update left panel
            if (leftHeading) leftHeading.textContent = 'Welcome Back!';
            if (leftText) leftText.textContent = 'Enter your personal details to use all of our site features';
            if (leftToggleBtn) leftToggleBtn.textContent = 'Sign In';
        }
    }

    function submitForm(event) {
        event.preventDefault();

        const form = document.getElementById('auth-form');
        const formData = new FormData(form);
        
        // Add the current form mode to the form data
        formData.append('form_type', isSignIn ? 'sign-in' : 'sign-up');
        
        // For sign-up, validate that all required fields are filled
        if (!isSignIn) {
            // Get values directly from form elements instead of FormData
            const emailField = document.getElementById('email');
            const usernameField = document.getElementById('username');
            const passwordField = document.getElementById('password');
            const confirmPasswordField = document.getElementById('confirm-password');
            
            const email = emailField ? emailField.value.trim() : '';
            const username = usernameField ? usernameField.value.trim() : '';
            const password = passwordField ? passwordField.value : '';
            const confirmPassword = confirmPasswordField ? confirmPasswordField.value : '';
            
            console.log('Form validation - Email:', email, 'Username:', username, 'Password length:', password.length, 'Confirm password length:', confirmPassword.length);
            
            // Basic validation
            if (!email || !username || !password || !confirmPassword) {
                alert('Please fill in all required fields for sign up.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
        }

        // Show loading state
        const submitButton = document.getElementById('submit-btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;

        console.log('Submitting form with data:', Object.fromEntries(formData));

        fetch('/auth', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            console.log('Response status:', res.status);
            console.log('Response redirected:', res.redirected);
            
            if (res.redirected) {
                window.location.href = res.url; // Redirect to /home
            } else if (res.ok) {
                return res.json(); // Try to parse JSON response
            } else {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        })
        .then(data => {
            if (data) {
                console.log('Response data:', data);
                if (data.success) {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        alert(data.message || 'Operation successful!');
                    }
                } else {
                    alert(data.message || 'Authentication failed.');
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }

    // Initial state
    const formType = window.location.hash.replace('#', '') || 'sign-in';
    isSignIn = formType === 'sign-in';
    toggleForm(formType);
});


