import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib

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
        SELECT id, full_name, email, role_id
        FROM users
        WHERE email = %s AND password_hash = %s
    """
    cur.execute(query, (email, password_hash))
    user = cur.fetchone()

    cur.close()
    conn.close()

    return user