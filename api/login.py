import logging

from flask import Flask, request, jsonify
from flask_cors import CORS
from api.db_work import check_user_credentials

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route('/api/login', methods=['POST'])
def login_user():
    logger.info("Получен запрос на вход")

    try:
        data = request.get_json(force=True)
        logger.debug(f"Полученные данные: {data}")

        if data is None:
            return jsonify({
                'status': False,
                'message': 'Неверные JSON-данные',
                'user': None
            }), 400
    except Exception as e:
        logger.exception("Ошибка при разборе JSON:")
        return jsonify({
            'status': False,
            'message': f'Ошибка при разборе JSON: {str(e)}',
            'user': None
        }), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({
            'status': False,
            'message': 'Отсутствует адрес электронной почты или пароль',
            'user': None
        }), 400

    try:
        user = check_user_credentials(email, password)
        if user:
            return jsonify({
                'status': True,
                'user': {
                    'id': user['id'],
                    'full_name': user['full_name'],
                    'email': user['email'],
                    'role': user['role_name']
                },
                'message': 'Успешный вход'
            }), 200
        else:
            return jsonify({
                'status': False,
                'user': None,
                'message': 'Неверный адрес электронной почты или пароль'
            }), 401
    except Exception as e:
        logger.exception("Ошибка при проверке пользователя:")
        return jsonify({
            'status': False,
            'message': f'Ошибка сервера: {str(e)}',
            'user': None
        }), 500

@app.route('/api/login', methods=['OPTIONS'])
def handle_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True)
