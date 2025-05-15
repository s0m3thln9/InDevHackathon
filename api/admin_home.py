from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/admin/home', methods=['POST'])
def admin_home():
    data = request.json

    # Я передаю

    # Количество свободных номеров на сегодня
    # Количество заброннированных номеров на сегодня
    # Количество номеров требуемы в уборке
    # Количество гостей

    #График генерируемый на день

    # Ближайшая бронь, ФИО, Время, Номер

    # Обработка создание брони

    # Не работает техника номера
    # Просрочена уборка номера
    # Не работает дверь номера

    # Обработка открыть дверь
    # Обрабока управление устройствами
    # Добавить пользователя
    # Изменить роль

@app.route('/api/admin/home', methods=['OPTIONS'])
def admin_home_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
