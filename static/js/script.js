// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded successfully!');

    // Get the heading element
    const heading = document.querySelector('h1');

    // Add a click event listener to the heading
    heading.addEventListener('click', function () {
        alert('Hello from Flask!');
    });
    toggleForm('sign-in');
    const form = document.getElementById('auth-form');
    form.addEventListener('submit', submitForm);
    function toggleForm(type) 
        {
        const emailField = document.getElementById('email');
        const confirmPasswordField = document.getElementById('confirm-password');
        const usernameField = document.getElementById('username');
        const submitButton = document.getElementById('submit-btn');
        const toggleButton = document.querySelector('.toggle-btn');
        const form = document.getElementById('auth-form');
      
        if (type === 'sign-in') 
            {
          // Show the Sign In form (username and password only)
          nameField.style.display = 'none';
          emailField.style.display = 'none';
          confirmPasswordField.style.display = 'none';
          usernameField.style.display = 'block';
          submitButton.textContent = 'Sign In';
          toggleButton.textContent = 'Don\'t have an account? Sign Up';
        } else {
          // Show the Sign Up form (name, email, password, confirm password)
          nameField.style.display = 'block';
          emailField.style.display = 'block';
          confirmPasswordField.style.display = 'block';
          usernameField.style.display = 'block';
          submitButton.textContent = 'Sign Up';
          toggleButton.textContent = 'Already have an account? Sign In';
        }
      }
      function submitForm(event) {
        event.preventDefault();
        const submitButton = document.getElementById('submit-btn');
        if (submitButton.textContent === 'Sign Up') {
            // Handle Sign Up submission logic
            console.log('Signing up...');
        } else if (submitButton.textContent === 'Sign In') {
            // Handle Sign In submission logic
            console.log('Signing in...');
        }
    }
      
});