import numpy as np
import sqlalchemy
import pandas as pd
from flask import Flask, jsonify
import psycopg2


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


# Function to create connection and cursor to connect to the PostgreSQL Database
def create_cursor():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        host='localhost',
        database='project3',
        user='postgres',
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
    return (
        f"Available Routes:<br/>"
        #f"/api/v1.0/percent_price_changes<br/>"
        f"/api/v1.0/domestic_change<br/>"
        f"<br/>"
        f"To see the changing international food prices over time for a specific country, enter the following route and replace 'country_name' with the country of interest (case sensitive)<br/>"
        f"/api/v1.0/international_food_price_data/country_name<br/>"
        f"<br/>"
        f"To see the full list of available countries with international food price data, go to the following route:<br/>"
        f"/api/v1.0/country_list<br/>"
        f"<br/>"
    )

# @app.route("/api/v1.0/percent_price_changes")
# def percent_price_changes():
    
#     conn, cursor = create_cursor()
#     cursor.execute('SELECT * FROM percent_change_post_covid')
#     #percentage_display_data = db.session.query(percent_change.country,percent_change.commodity,percent_change.post_covid).all()

#     percentage_display_data = cursor.fetchall()
    
#     cursor.execute("SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('percent_change_post_covid')")
    
#     column_names = cursor.fetchall()
    
    
#     # Close the cursor and the database connection
#     cursor.close()
#     conn.close()
    
    
#     return jsonify(percentage_display_data)


    
@app.route("/api/v1.0/domestic_change/<country>")
def domestic_change():
    conn, cursor = create_cursor()
    
    cursor.execute('SELECT * FROM dom_cleaned_data')

    domestic_data = cursor.fetchall()
    
    # Close the cursor and the database connection
    cursor.close()
    conn.close()
    
    str = "Let's see if this string prints"
    return jsonify(str, domestic_data)

@app.route("/api/v1.0/international_food_price_data/<country>")
def international_data(country):
    conn, cursor = create_cursor()
    
    query = f"SELECT * FROM int_clean_data_cleaned WHERE country = '{country}' ORDER BY commodity,time"
    cursor.execute(query)

    international_data = cursor.fetchall()
    
    cursor.execute(f"SELECT DISTINCT commodity FROM int_clean_data_cleaned WHERE country = '{country}'")
    commodities = cursor.fetchall()
    # Close the cursor and the database connection
    cursor.close()
    conn.close()
    
    return jsonify(commodities,international_data)


@app.route("/api/v1.0/country_list")
def country_list():
    conn, cursor = create_cursor()
    
    query = f"SELECT DISTINCT country FROM int_clean_data_cleaned"
    cursor.execute(query)
    
    countries = cursor.fetchall()
    
    # Close the cursor and the database connection
    cursor.close()
    conn.close()
    
    return jsonify(countries)


if __name__ == "__main__":
    app.run(debug=True)