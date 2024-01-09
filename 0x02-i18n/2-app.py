#!/usr/bin/env python3

"""
Create a get_locale function with the babel.localeselector
 decorator. Use request.accept_languages to determine the
 best match with our supported languages.
"""

from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


# Configure supported languages
app.config['LANGUAGES'] = ['en', 'fr']

# Set default language
app.config['BABEL_DEFAULT_LOCALE'] = 'en'

# Set default timezone
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'


@babel.localeselector
def get_locale() -> str:
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/')
def index() -> str:
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(debug=True)
