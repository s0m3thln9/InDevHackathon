import logging
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from api.db_work import save_data_to_db

registration_bp = Blueprint('registration', __name__)
CORS(registration_bp, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@registration_bp.route('/api/registration', methods=['POST'])
def registration_user():
    logger.info("Получен запрос на регистрацию")

    try:
        data = request.get_json(force=True)
        logger.debug(f"Полученные данные: {data}")
        if data is None:
            return jsonify({
                'status': False,
                'message': 'Неверные JSON-данные'
            }), 400
    except Exception as e:
        logger.exception("Ошибка при разборе JSON:")
        return jsonify({
            'status': False,
            'message': f'Ошибка при разборе JSON: {str(e)}'
        }), 400

    required_fields = ['full_name', 'email', 'password', 'passport_number', 'birth_date']
    if not all(data.get(field) for field in required_fields):
        return jsonify({
            'status': False,
            'message': 'Пожалуйста, заполните все обязательные поля'
        }), 400

    phone = data.get('phone', "-")

    try:
        logger.info("Сохраняем пользователя в БД...")
        save_data_to_db(
            data['full_name'],
            data['email'],
            data['password'],
            data['passport_number'],
            data['birth_date'],
            phone
        )
        logger.info("Пользователь успешно зарегистрирован.")
        return jsonify({
            'status': True,
            'message': 'Вы успешно зарегистрировались.'
        }), 201
    except ValueError as e:
        logger.warning(f"Ошибка валидации: {str(e)}")
        return jsonify({
            'status': False,
            'message': str(e)
        }), 400
    except Exception as e:
        logger.exception("Ошибка при регистрации:")
        return jsonify({
            'status': False,
            'message': f'Ошибка при регистрации: {str(e)}'
        }), 500

@registration_bp.route('/api/registration', methods=['OPTIONS'])
def registration_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response