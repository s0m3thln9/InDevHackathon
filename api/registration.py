from flask import Flask, request, jsonify
from flask_cors import CORS
from api.db_work import save_data_to_db

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/api/registration', methods=['POST'])
def registration_user():
    data = request.json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')
    passport_number = data.get('passport_number')
    birth_date = data.get('birth_date')
    phone = data.get('phone') #Не обязательный параметр в БД
    if phone is None:
        phone = "-"

    if not full_name or not email or not password or not passport_number or not birth_date:
        return jsonify({
            'status': False,
            'message': 'Пожалуйста, заполните все поля'
        })

    try:
        save_data_to_db(full_name, email, password, passport_number, birth_date, phone)
        return jsonify({
            'status': True,
            'massage': 'Вы успешно зарегистрировались.'
        })
    except ValueError as e:
        return jsonify({
            'status': False,
            'message': str(e)
        })
    except Exception as e:
        return jsonify({
            'status': False,
            'message': f'Ошибка при регистрации: {e})'
        })

@app.route('/api/registration', methods=['OPTIONS'])
def handle_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')

if __name__ == '__main__':
    app.run()

