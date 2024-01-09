#!/usr/bin/env python3

"""
First you will setup a basic Flask app in 0-app.py.
Create a single / route and an index.html template
that simply outputs “Welcome to Holberton” as page
title (<title>) and “Hello world” as header (<h1>).
"""

from flask import Flask, render_template

# Create a Flask web application
app = Flask(__name__)

# Define a route for the root URL ("/")
@app.route('/')
def index()  -> str:
    # Render the '0-index.html' template with specified title and header
    return render_template('0-index.html', title='Welcome to Holberton', header='Hello world')

# Run the Flask app if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
