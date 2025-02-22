from flask import Flask, render_template, request, redirect, session, jsonify
from modules.login import *

app = Flask(__name__)
app.secret_key = 'utsavChor'

@app.route('/')
def home():
    create_database()
    return render_template('loginpage.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/api/signup', methods=['POST'])
def signupxx():
    data = request.json
    gmail = data.get('gmail')
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    if not gmail or not username or not password or not role:
        return jsonify({"message": "All fields are required"}), 400

    if "@gmail.com" not in gmail:
        return jsonify({"message": "Invalid Gmail address"}), 400

    if len(username) < 3:
        return jsonify({"message": "Username must be at least 3 characters"}), 400

    if len(password) < 6:
        return jsonify({"message": "Password must be at least 6 characters"}), 400

    save_user_to_db(gmail,password,username,role)

    return jsonify({"message": "Signup successful!"}), 200

@app.route('/login', methods=['POST'])
def login():
    gmail = request.form.get('gmail')
    password = request.form.get('password')
    
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='utsav',
            password='1234',
            database='insync'
        )

        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            query = "SELECT username, role FROM loginInfo WHERE gmail=%s AND password=%s"
            cursor.execute(query, (gmail, password))
            user = cursor.fetchone()
            
            if user:
                session['gmail'] = gmail
                session['username'] = user['username']
                session['role'] = user['role']
                
                if user['role'] == 'member':
                    return render_template('studentPage.html', username=user['username'])
                elif user['role'] == 'supervisor':
                    return render_template('supervisorPage.html', username=user['username'])
            else:
                return jsonify({"error": "Invalid credentials"}), 401
    
    except Error as e:
        print("Error while connecting to MySQL", e)
        return jsonify({"error": "Internal server error"}), 500
    
    finally:
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed.")

@app.route('/logout')
def logout():
    session.clear() 
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)
