from flask import request, jsonify, Flask
from flask_cors import CORS

from api.db_work import get_filtered_rooms

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
@app.route('/api/guste/home', methods=['POST'])
def get_rooms():
    data = request.json
    check_in = data.get('check_in')
    check_out = data.get('check_out')
    guests = data.get('guests')
    one_beds = data.get('one_beds')
    two_beds = data.get('two_beds')

    try:
        rooms = get_filtered_rooms(check_in, check_out, guests, one_beds, two_beds)
        return jsonify({'status': True, 'rooms': rooms})
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)})

@app.route('/api/guste/home', methods=['OPTIONS'])
def admin_home_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')