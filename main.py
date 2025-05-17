from flask import Flask
from flask_cors import CORS

from api.login import login
from api.registration import registration_bp
from api.admin_home import admin_home_bp
from api.admin_rooms_and_bookings import admin_rooms_bp
from api.guest_home import guest_home_bp
from api.guest_profile import guest_profile_bp

from routes.admin_open_door import admin_controller_bp
from routes.guest_devices import guest_device_bp
from routes.guest_open_door import guest_door_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

app.register_blueprint(login)
app.register_blueprint(registration_bp)

app.register_blueprint(admin_home_bp)
app.register_blueprint(admin_rooms_bp)
app.register_blueprint(admin_controller_bp)

app.register_blueprint(guest_home_bp)
app.register_blueprint(guest_profile_bp)
app.register_blueprint(guest_device_bp)
app.register_blueprint(guest_door_bp)

if __name__ == '__main__':
    app.run(debug=True)