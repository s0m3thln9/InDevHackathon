from flask import Blueprint, request, jsonify
from api.db_work import get_user_profile, update_user_profile

guest_profile_bp = Blueprint('guest_profile', __name__)

@guest_profile_bp.route('/api/guest/profile', methods=['POST'])
def get_profile():
    data = request.json
    user_id = data.get('user_id')

    profile = get_user_profile(user_id)
    if profile:
        return jsonify({'status': True, 'user': profile})
    return jsonify({'status': False, 'message': 'Пользователь не найден'})

@guest_profile_bp.route('/api/guest/profile', methods=['POST'])
def update_profile():
    data = request.json
    user_id = data.get('user_id')
    full_name = data.get('full_name')
    email = data.get('email')
    phone = data.get('phone')
    passport_number = data.get('passport_number')
    birth_date = data.get('birth_date')
    image_url = data.get('image_url')

    try:
        update_user_profile(user_id, full_name, email, phone, passport_number, birth_date, image_url)
        return jsonify({'status': True, 'message': 'Профиль обновлен'})
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)})

@guest_profile_bp.route('/api/guste_door', methods=['OPTIONS'])
def admin_home_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
