from flask import Flask, render_template
import mysql.connector # type: ignore
from config import Config
import docker # type: ignore
import datetime

# Create a Flask application instance
app = Flask(__name__)

app.config.from_object(Config)

# Connect database credentials using the config file
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

@app.route('/images')
def list_docker_images():
    try:
        client = docker.from_env()
        images = client.images.list()
        image_data = []

        for image in images:
            image_data.append({
                'id': image.id[:12],  # Shorten for display
                'tags': image.tags if image.tags else ['<none>'],
                'size': f"{image.attrs['Size'] / (1024 * 1024):.2f} MB"
            })

        return render_template('docker_images.html', images=image_data)
    
    except docker.errors.DockerException as e:
        return f"Error accessing Docker: {e}"

# Run the application if this script is executed directly
if __name__ == '__main__':
    # Enable debug mode for development
    app.run(debug=True)