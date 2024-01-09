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

from flask_babel import Babel
from flask import Flask, render_template


class Config:
    """ class Confit
    """
    # Configure supported languages
    LANGUAGES = ['en', 'fr']

    # Set default language
    BABEL_DEFAULT_LOCALE = 'en'

    # Set default timezone
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
babel = Babel(app)

app.config.from_object(Config)


@app.route('/')
def index() -> str:
    """ flask app
    """
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(debug=True)
