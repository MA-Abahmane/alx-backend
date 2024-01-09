#!/usr/bin/env python3

"""
Create a get_locale function with the babel.localeselector
 decorator. Use request.accept_languages to determine the
 best match with our supported languages.
"""

from flask_babel import Babel
from flask import Flask, render_template, request


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


@babel.localeselector
def get_locale() -> str:
    """ find best match with supported languages
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/')
def index() -> str:
    """ flask app
    """
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(debug=True)
