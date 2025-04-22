// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded successfully!');

    // Get the heading element
    const heading = document.querySelector('h1');

    // Add a click event listener to the heading
    heading.addEventListener('click', function () {
        alert('Hello from Flask!');
    });
});