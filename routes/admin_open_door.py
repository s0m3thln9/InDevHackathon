from flask import Blueprint, request, jsonify
from api.db_work import get_controller_any
from utils.door_control import safe_door_control

admin_controller_bp = Blueprint('admin_door', __name__)

@admin_controller_bp.route('/api/admin/open_door', methods=['POST'])
def admin_open_door():
    data = request.json
    room_id = data.get('room_id')

    if not room_id:
        return jsonify({'status': False, 'message': 'room_id обязателен'})

    controller = get_controller_any()
    if not controller:
        return jsonify({'status': False, 'message': 'Контроллер не найден'})

    try:
        safe_door_control("open")
        return jsonify({
            'status': True,
            'message': f'Подойдите к двери №{room_id}',
            'room_id': room_id
        })
    except Exception as e:
        return jsonify({
            'status': False,
            'message': f'Ошибка при открытии двери: {str(e)}'
        })

@admin_controller_bp.route('/api/admin/admin_door', methods=['OPTIONS'])
def admin_home_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')