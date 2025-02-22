import mysql.connector
from mysql.connector import Error

def create_database():
    try:
        connection = mysql.connector.connect(
            host='localhost',  # e.g., 'localhost'
            user='utsav',  # e.g., 'root'
            password='1234'
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute("CREATE DATABASE IF NOT EXISTS insync")
            print("Database 'insync' created or already exists.")
            
    except Error as e:
        print("Error while creating database", e)
    
    finally:
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed.")

def save_user_to_db(gmail, password, username, role):
    try:
        # Connect to the MySQL database
        connection = mysql.connector.connect(
            host='localhost',  # e.g., 'localhost'
            user='utsav',  # e.g., 'root'
            password='1234',
            database='insync'
        )

        if connection.is_connected():
            cursor = connection.cursor()
            
            # Create table if not exists
            create_table_query = """
            CREATE TABLE IF NOT EXISTS loginInfo (
                id INT AUTO_INCREMENT PRIMARY KEY,
                gmail VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL
            )
            """
            cursor.execute(create_table_query)
            
            # Insert query
            insert_query = """
            INSERT INTO loginInfo (gmail, password, username, role)
            VALUES (%s, %s, %s, %s)
            """
            
            # Execute query
            cursor.execute(insert_query, (gmail, password, username, role))
            connection.commit()
            
            print("User saved successfully.")
    
    except Error as e:
        print("Error while connecting to MySQL", e)
    
    finally:
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed.")
