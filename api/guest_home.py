from flask import request, jsonify, Flask, Blueprint
from flask_cors import CORS

from api.db_work import get_filtered_rooms, create_booking

guest_home_bp = Blueprint('guest_home', __name__)

@app.route('/api/guest/home', methods=['POST'])
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

@app.route('/api/guest/book_room', methods=['POST'])
def book_room():
    data = request.json
    user_id = data.get('user_id')
    room_id = data.get('room_id')
    check_in = data.get('check_in')
    check_out = data.get('check_out')

    if not all([user_id, room_id, check_in, check_out]):
        return jsonify({'status': False, 'message': 'Отсутствуют обязательные данные'})

    try:
        create_booking(user_id, room_id, check_in, check_out)
        return jsonify({'status': True, 'message': 'Бронь успешно создана'})
    except ValueError as e:
        return jsonify({'status': False, 'message': str(e)})
    except Exception as e:
        return jsonify({'status': False, 'message': f'Ошибка при бронировании: {str(e)}'})

@app.route('/api/guest/home', methods=['OPTIONS'])
def admin_home_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')