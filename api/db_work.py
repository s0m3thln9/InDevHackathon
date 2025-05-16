import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib
from datetime import datetime
from datetime import date

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

def save_data_to_db(full_name, email, password, passport_number, birth_date, phone = "-", role = "Гость"):
    password_hash = hash_password(password)
    created_at = datetime.utcnow()

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id FROM roles WHERE name = %s", (role,))
    role_row = cur.fetchone()
    if not role_row:
        cur.close()
        conn.close()
        raise ValueError("Указанная роль не найдена")
    role_id = role_row[0]

    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    if cur.fetchone():
        cur.close()
        conn.close()
        raise ValueError("Пользователь с такой почтой уже существует")

    try:
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
        conn.rollback()
        raise e
    finally:
        cur.close()
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

def change_roles():
    pass

