from flask import Blueprint, request, jsonify
from api.db_work import get_user_room_access

guest_door_bp = Blueprint('guest_door', __name__)

@guest_door_bp.route('/api/open_door', methods=['POST'])
def get_open_door_info():
    data = request.json
    user_id = data.get('user_id')

    booking = get_user_room_access(user_id)

    if booking:
        return jsonify({
            "status": True,
            "can_open": True,
            "room_id": booking['room_id'],
            "room_number": booking['room_number'],
            "ble_name": booking['ble_name'],
            "token": booking['token'],
            "message": f"Подойдите к двери №{booking['room_number']}"
        })
    else:
        return jsonify({
            "status": True,
            "can_open": False,
            "message": "У вас нет активного номера"
        })

@guest_door_bp.route('/api/guste_door', methods=['OPTIONS'])
def admin_home_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')