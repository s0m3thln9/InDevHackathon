from flask import Flask, jsonify, request
from flask_cors import CORS
from db_work import num_free_rooms, num_busy_rooms, num_need_cleaning_rooms, num_guests,nearest_booking, booking_stats_for_week, overdue_cleanings, rooms_with_tech_issues

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/admin/home', methods=['GET'])
def admin_home():
    try:
        free_rooms = num_free_rooms()
        busy_rooms = num_busy_rooms()
        need_cleaning = num_need_cleaning_rooms()
        guests = num_guests()
        nearest = nearest_booking()
        booking_week = booking_stats_for_week()
        tech_issues = rooms_with_tech_issues()
        overdue = overdue_cleanings()

        return jsonify({
            'status': True,
            'free_rooms': free_rooms,
            'busy_rooms': busy_rooms,
            'need_cleaning': need_cleaning,
            'guests': guests,
            'nearest_booking': nearest,
            'booking_stats': booking_week,
            'tech_issues': tech_issues,
            'overdue_cleanings': overdue
        })
    except Exception as e:
        return jsonify({
            'status': False,
            'message': str(e)
        })

@app.route('/api/admin/home', methods=['OPTIONS'])
def admin_home_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')

if __name__ == '__main__':
    app.run(debug=True)
