from flask import Blueprint, request, jsonify
from api.db_work import get_user_room_access, get_controller_any
from utils.door_control import safe_door_control  # Ethernet-подключение

guest_door_bp = Blueprint('guest_door', __name__)

@guest_door_bp.route('/api/guest/open_door', methods=['POST'])
def guest_open_door():
    data = request.json
    user_id = data.get('user_id')

    # Получаем данные о брони и контроллере
    booking = get_user_room_access(user_id)
    controller = get_controller_any()

    if not booking:
        return jsonify({
            "status": True,
            "can_open": False,
            "message": "У вас нет активного номера"
        })

    if not controller:
        return jsonify({
            "status": False,
            "can_open": False,
            "message": "Контроллер не найден"
        })

    try:
        # Открываем дверь сразу
        safe_door_control("open")

        return jsonify({
            "status": True,
            "can_open": True,
            "room_id": booking['room_id'],
            "room_number": booking['room_number'],
            "ble_name": controller['ble_name'],
            "token": controller['token'],
            "message": f"Подойдите к двери №{booking['room_number']}. Дверь открыта."
        })
    except Exception as e:
        return jsonify({
            "status": False,
            "can_open": False,
            "message": f"Ошибка при открытии двери: {str(e)}"
        })

# CORS preflight для этой ручки
@guest_door_bp.route('/api/guest/open_door', methods=['OPTIONS'])
def guest_open_door_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response