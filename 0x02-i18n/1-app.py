#!/usr/bin/env python3

"""
Then instantiate the Babel object in your app. Store it in a
 module-level variable named babel.
In order to configure available languages in our app, you will
 create a Config class that has a LANGUAGES class attribute equal
 to ["en", "fr"].
Use Config to set Babel’s default locale ("en") and timezone ("UTC")
Use that class as config for your Flask app.
"""

from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)

# Configure supported languages
app.config['LANGUAGES'] = ['en', 'fr']

# Set default language
app.config['BABEL_DEFAULT_LOCALE'] = 'en'

# Set default timezone
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'


@app.route('/')
def index() -> str:
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
