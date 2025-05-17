from flask import Blueprint, request, jsonify
from api.db_work import get_user_devices, get_device_with_controller, set_device_state
from utils.device_control import send_device_command

guest_device_bp = Blueprint('guest_devices', __name__)

@guest_device_bp.route('/api/guest/devices', methods=['POST'])
def get_devices():
    data = request.json
    user_id = data.get('user_id')

    devices = get_user_devices(user_id)
    if devices is None:
        return jsonify({'status': False, 'message': 'Нет активного номера'})

    return jsonify({'status': True, 'devices': devices})

@guest_device_bp.route('/api/guest/device-control', methods=['POST'])
def update_device():
    data = request.json
    device_id = data.get('device_id')
    new_state = data.get('state')  # "on", "off", "open", "close" и т.п.

    if not device_id or not new_state:
        return jsonify({'status': False, 'message': 'device_id и state обязательны'})

    device = get_device_with_controller(device_id)
    if not device:
        return jsonify({'status': False, 'message': 'Устройство не найдено'})

    success = send_device_command(device['type'], new_state)

    if not success:
        return jsonify({'status': False, 'message': 'Ошибка при управлении устройством'})

    try:
        set_device_state(device_id, new_state)
        return jsonify({'status': True, 'message': 'Устройство обновлено'})
    except Exception as e:
        return jsonify({'status': False, 'message': f'Устройство откликнулось, но БД не обновлена: {e}'})
