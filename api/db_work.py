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