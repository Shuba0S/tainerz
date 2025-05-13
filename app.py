from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector # type: ignore
from config import Config
import docker # type: ignore
import datetime

# Create a Flask application instance
app = Flask(__name__)
app.secret_key = 'your_secret_key'
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

@app.route('/auth', methods=['POST'])
def auth():
    username = request.form.get('username')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm-password')

    conn = get_db_connector()
    cursor = conn.cursor(dictionary=True)

    if confirm_password:  # Sign Up
        if password != confirm_password:
            flash("Passwords do not match")
            return redirect(url_for('login'))

        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        if cursor.fetchone():
            flash("Username already exists")
            return redirect(url_for('login'))

        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        conn.commit()
        flash("Account created! Please sign in.")
        return redirect(url_for('login'))
    else:  # Sign In
        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
        user = cursor.fetchone()

        if user:
            session['user_id'] = user['id']
            return redirect(url_for('home'))
        else:
            flash("Invalid credentials")
            return redirect(url_for('login'))

    cursor.close()
    conn.close()

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


@app.route('/containers')
def list_docker_containers():
    try:
        client = docker.from_env()
        containers = client.containers.list(all=True)
        container_data = []

        for container in containers:
            container_data.append({
                'id': container.id[:12],
                'name': container.name,
                'status': container.status,
                'image': container.image.tags[0] if container.image.tags else '<none>'
            })

        return render_template('docker_containers.html', containers=container_data)
    except docker.errors.DockerException as e:
        return f"Error accessing Docker: {e}"

@app.route('/start/<container_id>')
def start_container(container_id):
    try:
        client = docker.from_env()
        container = client.containers.get(container_id)
        container.start()
        return redirect(url_for('list_docker_containers'))
    except Exception as e:
        return f"Error starting container: {e}"

@app.route('/stop/<container_id>')
def stop_container(container_id):
    try:
        client = docker.from_env()
        container = client.containers.get(container_id)
        container.stop()
        return redirect(url_for('list_docker_containers'))
    except Exception as e:
        return f"Error stopping container: {e}"

# Run the application if this script is executed directly
if __name__ == '__main__':
    # Enable debug mode for development
    app.run(debug=True)