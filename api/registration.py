import logging

from flask import Flask, request, jsonify
from flask_cors import CORS
from api.db_work import save_data_to_db

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route('/api/registration', methods=['POST'])
def registration_user():
    logger.info("Получен запрос на регистрацию")
    try:
        data = request.get_json(force=True)
        logger.debug(f"Полученные данные: {data}")
        if data is None:
            return jsonify({
                'status': False,
                'message': 'Invalid JSON data'
            }), 400
    except Exception as e:
        return jsonify({
            'status': False,
            'message': f'Error parsing JSON: {str(e)}'
        }), 400

    required_fields = ['full_name', 'email', 'password', 'passport_number', 'birth_date']
    if not all(data.get(field) for field in required_fields):
        return jsonify({
            'status': False,
            'message': 'Пожалуйста, заполните все обязательные поля'
        }), 400

    phone = data.get('phone', "-")

    try:
        logger.exception("bd")
        save_data_to_db(
            data['full_name'],
            data['email'],
            data['password'],
            data['passport_number'],
            data['birth_date'],
            data['phone']
        )
        return jsonify({
            'status': True,
            'message': 'Вы успешно зарегистрировались.'
        }), 201
    except ValueError as e:
        return jsonify({
            'status': False,
            'message': str(e)
        }), 400
    except Exception as e:
        logger.exception(f'str(e)')
        return jsonify({
            'status': False,
            'message': f'Ошибка при регистрации: {str(e)}'
        }), 500

@app.route('/api/registration', methods=['OPTIONS'])
def handle_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True)

