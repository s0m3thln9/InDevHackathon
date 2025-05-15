import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib
from datetime import datetime

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def get_db_connection():
    return psycopg2.connect(
        host='localhost:5432',
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

    cur.execute("SELECT id FROM roles WHERE name = %s", (email,))
    role_row = cur.fetchone()
    if role_row:
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
        phone, created_at,) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        full_name, email, password_hash, role_id,
        passport_number, birth_date, phone, created_at
    ))

    conn.commit()
    cur.close()
    conn.close()

    def num_free_rooms():
        pass

    def num_busy_rooms():
        pass

    def num_need_cleanimg_room():
        pass

    def num_guests():
        pass

    def get_data_for_grafic():
        pass

    def future_booking():
        pass

    def create_booking():
        pass

    # ПРОБЛЕМЫ ТЕХНИКИ

    def change_roles():
        pass

