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
            emailField.style.display = 'none';
            confirmPasswordField.style.display = 'none';
            submitButton.textContent = 'Sign In';
            toggleButton.textContent = "Don't have an account? Sign Up";

            // Update right side
            if (rightHeading) rightHeading.textContent = 'Sign In';
            if (rightSubtext) rightSubtext.textContent = 'Use your email and password';

            // Update left panel
            if (leftHeading) leftHeading.textContent = 'New Here?';
            if (leftText) leftText.textContent = 'Sign up to access all features';
            if (leftToggleBtn) leftToggleBtn.textContent = 'Sign Up';
        } else {
            emailField.style.display = 'block';
            confirmPasswordField.style.display = 'block';
            submitButton.textContent = 'Sign Up';
            toggleButton.textContent = 'Already have an account? Sign In';

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
        const submitButton = document.getElementById('submit-btn');
        if (submitButton.textContent === 'Sign Up') {
            console.log('Signing up...');
        } else if (submitButton.textContent === 'Sign In') {
            console.log('Signing in...');
        }
    }

    // Initial state
    const formType = window.location.hash.replace('#', '') || 'sign-in';
    isSignIn = formType === 'sign-in';
    toggleForm(formType);
});