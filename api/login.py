from flask import Flask, request, jsonify
from flask_cors import CORS
from api.db_work import check_user_credentials

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({
            'status': False,
            'message': 'Отсуствует адресс электронной почты или пароль',
            'user': None
        })

    user = check_user_credentials(email, password)
    if not user:
        return jsonify({
            'ststus': True,
            'user': user,
            'message': 'Успешный вход'
        })
    return jsonify({
        'status': False,
        'user': None,
        'message': 'Неверный адресс электронной почты или пароль'
    })

@app.route('/api/register', methods=['OPTIONS'])
def handle_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')

if __name__ == '__main__':
    app.run()