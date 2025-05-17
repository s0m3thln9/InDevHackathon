from flask import Blueprint, request, jsonify
from api.db_work import get_user_devices, set_device_state

guest_device_bp = Blueprint('guest_devices', __name__)

@guest_device_bp.route('/api/guest/devices', methods=['POST'])
def get_devices():
    data = request.json
    user_id = data.get('user_id')

    devices = get_user_devices(user_id)
    if devices is None:
        return jsonify({'status': False, 'message': 'Нет активного номера'})

    return jsonify({'status': True, 'devices': devices})

@guest_device_bp.route('/api/guest/devices', methods=['POST'])
def update_device():
    data = request.json
    device_id = data.get('device_id')
    new_state = data.get('state')  # "on", "off", "open", "close" и т.п.

    try:
        set_device_state(device_id, new_state)
        return jsonify({'status': True, 'message': 'Состояние обновлено'})
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)})