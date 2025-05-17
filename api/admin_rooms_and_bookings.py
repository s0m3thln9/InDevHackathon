from flask import Blueprint, jsonify
from api.db_work import get_room_booking_statuses, get_booking_calendar

admin_rooms_bp = Blueprint('admin_rooms_bookings', __name__)

@admin_rooms_bp.route('/api/admin/rooms_and_bookings', methods=['GET'])
def admin_rooms_and_bookings():
    try:
        rooms = get_room_booking_statuses()
        calendar = get_booking_calendar()

        return jsonify({
            'status': True,
            'rooms': rooms,
            'calendar': calendar
        })
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)})