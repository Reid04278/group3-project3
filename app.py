import numpy as np
import sqlalchemy
import pandas as pd
from flask import Flask, render_template, jsonify
import psycopg2
from flask_cors import CORS



#################################################
# Flask Setup
#################################################
app = Flask(__name__)
cors = CORS(app)

# Function to create connection and cursor to connect to the PostgreSQL Database
def create_cursor():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        host='localhost',
        database='project3',
        user='postgres',
        #Replace with YOUR user password for pgadmin 4
        password='Gwqcmn47sv'
    )

    # Create a cursor to interact with the database
    cursor = conn.cursor()
    return conn, cursor

#################################################
# Flask Routes
#################################################

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
@app.route("/")
def welcome():
    """List all available api routes."""
    return render_template("index.html")
    #return("List all available routes")

@app.route("//api/v1.0/domestic_change/country/boxplot")
def boxplot(country):
    conn, cursor = create_cursor()
    
    cursor.execute(f"SELECT * FROM box_plot_data where country = '{country}")
    
    box_plot_data = cursor.fetchall()
    
    # Close the cursor and the database connection
    cursor.close()
    conn.close()
    
    return jsonify(box_plot_data)

@app.route("/api/v1.0/domestic_change/<country>")
def domestic_change(country):
    conn, cursor = create_cursor()
    
    cursor.execute(f"SELECT * FROM dom_cleaned_data where country = '{country}' ORDER BY commodity,month")

    domestic_data = cursor.fetchall()
    
    # Close the cursor and the database connection
    cursor.close()
    conn.close()
    
    return jsonify(domestic_data)

@app.route("/api/v1.0/domestic_commodities/<country>")
def domestic_commodities(country):
    conn, cursor = create_cursor()
    
    cursor.execute(f"SELECT DISTINCT commodity FROM dom_cleaned_data where country = '{country}' ORDER BY commodity")

    commodities = cursor.fetchall()
    
    return jsonify(commodities)

@app.route("/api/v1.0/box_country_list")
def country_list():
    conn, cursor = create_cursor()
    
    query = f"SELECT DISTINCT country FROM box_plot_data"
    cursor.execute(query)
    
    countries = cursor.fetchall()
    
    # Close the cursor and the database connection
    cursor.close()
    conn.close()
    
    return jsonify(countries)

@app.route("/api/v1.0/line_country_list")
def line_country_list():
    conn, cursor = create_cursor()
    
    query = f"SELECT DISTINCT country FROM line_graph_data"
    cursor.execute(query)
    
    countries = cursor.fetchall()
    
    # Close the cursor and the database connection
    cursor.close()
    conn.close()
    
    return jsonify(countries)


@app.route('/api/data', methods=['GET'])
def get_data():
    # Create a cursor object to execute SQL queries
    conn, cursor = create_cursor()

    # Execute queries to retrieve data from tables
    # cursor.execute("SELECT * FROM int_clean_data_cleaned")
    # international_data = cursor.fetchall()

    cursor.execute("SELECT * FROM dom_cleaned_data")
    domestic_data = cursor.fetchall()
    
    # cursor.execute("SELECT * FROM percent_change_post_covid")
    # percent_change_data = cursor.fetchall()
    
    # Process the data and create a response
    response = {
        'domstic_data': domestic_data
    }

    # Close the cursor and connection
    cursor.close()
    conn.close()

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)