from flask import Flask, render_template

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the root URL
@app.route('/')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')

# Run the application if this script is executed directly
if __name__ == '__main__':
    # Enable debug mode for development
    app.run(debug=True)