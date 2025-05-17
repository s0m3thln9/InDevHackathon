import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib
from datetime import datetime
from datetime import date, timedelta

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def get_db_connection():
    return psycopg2.connect(
        host='localhost',
        port=5432,
        database='Smart_hotel',
        user='postgres',
        password='12345',
    )

def check_user_credentials(email: str, password: str):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    password_hash = hash_password(password)

    query = """
        SELECT 
        users.id, 
        users.full_name, 
        users.email, 
        roles.role_id,
        roles.name AS role_name
        FROM users
        JOIN roles ON users.role_id = roles.id
        WHERE users.email = %s AND users.password_hash = %s
    """
    cur.execute(query, (email, password_hash))
    user = cur.fetchone()

    cur.close()
    conn.close()

    return user

def save_data_to_db(full_name, email, password, passport_number, birth_date, phone="-", role="Гость"):
    try:
        full_name = str(full_name).encode('utf-8', 'ignore').decode('utf-8')
        email = str(email).encode('utf-8', 'ignore').decode('utf-8')
        password = str(password).encode('utf-8', 'ignore').decode('utf-8')
        passport_number = str(passport_number).encode('utf-8', 'ignore').decode('utf-8')
        phone = str(phone).encode('utf-8', 'ignore').decode('utf-8')
    except Exception as e:
        raise ValueError(f"Ошибка обработки входных данных: {str(e)}")

    password_hash = hash_password(password)
    created_at = datetime.utcnow()

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT id FROM roles WHERE name = %s", (role,))
        role_row = cur.fetchone()
        if not role_row:
            raise ValueError("Указанная роль не найдена")
        role_id = role_row[0]

        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            raise ValueError("Пользователь с такой почтой уже существует")

        cur.execute("""
            INSERT INTO users(
                full_name, email,
                password_hash, role_id,
                passport_number, birth_date,
                phone, created_at) 
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            full_name, email, password_hash, role_id,
            passport_number, birth_date, phone, created_at
        ))
        conn.commit()
    except Exception as e:
        if conn:
            conn.rollback()
        raise e
    finally:
        if conn:
            conn.close()

def num_free_rooms():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT COUNT(*) FROM rooms
        WHERE is_active = TRUE
        AND id NOT IN(
            SELECT room_id FROM booKings
            WHERE CURRENT_DATE BETWEEN check_in AND check_out
        )
    """)

    result = cur.fetchone()
    cur.close()
    conn.close()
    return result

def num_busy_rooms():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT COUNT(DISTINCT room_id) FROM bookings
        WHERE CURRENT_DATE BETWEEN check_in AND check_out
    """)

    result = cur.fetchone()[0]
    cur.close()
    conn.close()
    return result

def num_need_cleaning_rooms():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT COUNT(*) FROM cleaning_schedule
        WHERE status = 'Запланировано'
        AND scheduled_at::date = CURRENT_DATE
    """)

    result = cur.fetchone()[0]
    cur.close()
    conn.close()
    return result

def num_guests():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT COUNT(DISTINCT user_id) FROM bookings
        WHERE CURRENT_DATE BETWEEN check_in AND check_out
    """)

    result = cur.fetchone()[0]
    cur.close()
    conn.close()
    return result

def booking_stats_for_week():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT
            check_in::date AS date,
            COUNT(*) AS count
        FROM bookings
        WHERE check_in BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
        GROUP BY check_in::date
        ORDER BY check_in::date 
    """)

    result = cur.fetchall()
    cur.close()
    conn.close()
    return result

def nearest_booking():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT
            bookings.check_in,
            users.full_name,
            bookings.room_id
        FROM bookings
        JOIN users ON users.id = bookings.user_id
        WHERE check_in > CURRENT_DATE
        ORDER BY check_in ASC
        LIMIT 1
    """)

    result = cur.fetchone()
    cur.close()
    conn.close()
    return result

def create_booking():
    pass

def rooms_with_tech_issues():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT d.id, d.name, d.type, d.state, r.room_number
        FROM devices d
        JOIN controllers c ON d.controller_id = c.id
        JOIN rooms r ON c.room_id = r.id
        WHERE d.state = 'error'
    """)

    result = cur.fetchall()
    cur.close()
    conn.close()
    return result

def overdue_cleanings():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT * FROM cleaning_schedule
        WHERE status = 'Заплонировано' AND scheduled_at < CURRENT_TIMESTAMP
    """)

    result = cur.fetchall()
    cur.close()
    conn.close()
    return result

def get_filtered_rooms(check_in, check_out, guests, one_beds, two_beds):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        SELECT r.id, r.room_number, r.floor, r.max_people, r.num_one_bed, r.num_two_bed, rt.name AS room_type,
               (SELECT url FROM room_images ri 
                JOIN room_image i ON ri.image_id = i.id 
                WHERE ri.room_id = r.id LIMIT 1) AS image_url
        FROM rooms r
        JOIN room_types rt ON r.room_type_id = rt.id
        WHERE r.is_active = TRUE
          AND r.max_people >= %s
          AND r.num_one_bed >= %s
          AND r.num_two_bed >= %s
          AND r.id NOT IN (
              SELECT room_id FROM bookings
              WHERE daterange(check_in, check_out, '[]') && daterange(%s::DATE, %s::DATE, '[]')
          )
        ORDER BY r.room_number
    """

    cur.execute(query, (guests, one_beds, two_beds, check_in, check_out))
    results = cur.fetchall()

    cur.close()
    conn.close()
    return results


def get_user_room_access(user_id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT r.id AS room_id, r.room_number, c.ble_name, c.token
        FROM bookings b
        JOIN rooms r ON r.id = b.room_id
        JOIN controllers c ON c.room_id = r.id
        WHERE b.user_id = %s
          AND CURRENT_DATE BETWEEN b.check_in AND b.check_out
          AND b.status IN ('активен', 'забронирован')
        LIMIT 1
    """, (user_id,))

    booking = cur.fetchone()
    cur.close()
    conn.close()
    return booking

def get_user_devices(user_id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT room_id
        FROM bookings
        WHERE user_id = %s
          AND CURRENT_DATE BETWEEN check_in AND check_out
          AND status IN ('активен', 'забронирован')
        LIMIT 1
    """, (user_id,))
    room = cur.fetchone()

    if not room:
        cur.close()
        conn.close()
        return None

    cur.execute("""
        SELECT d.id, d.name, d.type, d.state
        FROM devices d
        JOIN controllers c ON d.controller_id = c.id
        WHERE c.room_id = %s
    """, (room['room_id'],))
    devices = cur.fetchall()

    cur.close()
    conn.close()
    return devices

def set_device_state(device_id, new_state):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE devices
        SET state = %s, last_updated = CURRENT_TIMESTAMP
        WHERE id = %s
    """, (new_state, device_id))

    conn.commit()
    cur.close()
    conn.close()

def get_user_profile(user_id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT id, full_name, email, phone, passport_number, birth_date, image_url
        FROM users
        WHERE id = %s
    """, (user_id,))
    user = cur.fetchone()

    cur.close()
    conn.close()
    return user

def update_user_profile(user_id, full_name, email, phone, passport_number, birth_date, image_url=None):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE users
        SET full_name = %s,
            email = %s,
            phone = %s,
            passport_number = %s,
            birth_date = %s,
            image_url = %s
        WHERE id = %s
    """, (full_name, email, phone, passport_number, birth_date, image_url, user_id))

    conn.commit()
    cur.close()
    conn.close()

def get_room_booking_statuses():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        SELECT 
            r.id AS room_id,
            r.room_number,
            r.floor,
            rt.name AS room_type,
            r.is_active,
            CASE 
                WHEN b.id IS NOT NULL THEN 'занята'
                ELSE 'свободна'
            END AS booking_status,
            u.full_name AS guest_name
        FROM rooms r
        JOIN room_types rt ON r.room_type_id = rt.id
        LEFT JOIN bookings b ON r.id = b.room_id 
            AND CURRENT_DATE BETWEEN b.check_in AND b.check_out
        LEFT JOIN users u ON u.id = b.user_id
        ORDER BY r.room_number
    """
    cur.execute(query)
    rooms = cur.fetchall()
    cur.close()
    conn.close()
    return rooms

def get_booking_calendar():
    today = date.today()
    end_date = today + timedelta(days=7)

    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        SELECT 
            r.room_number,
            u.full_name AS guest_name,
            b.check_in,
            b.check_out
        FROM bookings b
        JOIN rooms r ON b.room_id = r.id
        JOIN users u ON b.user_id = u.id
        WHERE b.check_in <= %s AND b.check_out >= %s
        ORDER BY r.room_number, b.check_in
    """
    cur.execute(query, (end_date, today))
    calendar = cur.fetchall()
    cur.close()
    conn.close()
    return calendar

def get_all_rooms():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT id, room_number, floor
        FROM rooms
        WHERE is_active = TRUE
        ORDER BY room_number
    """)
    rooms = cur.fetchall()
    cur.close()
    conn.close()
    return rooms

def get_controller_by_room(room_id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT room_id, ble_name, token
        FROM controllers
        WHERE room_id = %s
    """, (room_id,))
    controller = cur.fetchone()

    cur.close()
    conn.close()
    return controller

def change_roles():
    pass

