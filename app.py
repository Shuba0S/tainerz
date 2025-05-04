from flask import Flask, render_template
import mysql.connector
from config import Config

# Create a Flask application instance
app = Flask(__name__)

app.config.from_object(Config)

#connect database cred using config file
def get_db_connector():
    return mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME
        )
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