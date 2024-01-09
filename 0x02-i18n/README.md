# Internationalization (i18n) in Flask Cheat Sheet

## Flask-Babel

### Installation

``` bash
pip install Flask-Babel
```

### Configuration

``` python
# app.py

from flask import Flask
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)

# Configure supported languages
app.config['LANGUAGES'] = ['en', 'fr', 'es']

# Set default language
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
```

### Usage

#### 1. Markup in Templates

``` html
<!-- templates/index.html -->

{% extends "layout.html" %}
{% block content %}
    <h1>{{ _('Welcome to My App') }}</h1>
{% endblock %}
```

#### 2. Python Code

``` python
# app.py

from flask import render_template
from flask_babel import _

@app.route('/')
def index():
    return render_template('index.html')
```

## Flask i18n Tutorial

### Basic Setup

1. Install Flask-Babel and Babel

``` bash
pip install Flask-Babel Babel
```

2. Initialize Babel in the Flask app

``` python
# app.py

from flask import Flask
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)
```

3. Define supported languages and default locale

``` python
# app.py

app.config['LANGUAGES'] = ['en', 'fr', 'es']
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
```

### Message Extraction

1. Install Babel for message extraction

``` bash
pybabel extract -F babel.cfg -o messages.pot .
```

2. Create language-specific message catalogs

``` bash
pybabel init -i messages.pot -d translations -l es
```

### Translation

1. Create translation strings in templates

``` html
<!-- templates/index.html -->

{% extends "layout.html" %}
{% block content %}
    <h1>{{ gettext('Welcome to My App') }}</h1>
{% endblock %}
```

2. Update translations

``` bash
pybabel update -i messages.pot -d translations
```

3. Compile translations

``` bash
pybabel compile -d translations
```

## pytz

### Installation

``` bash
pip install pytz
```

### Usage

``` python
from datetime import datetime
import pytz

# Create a timezone object
tz = pytz.timezone('America/New_York')

# Convert a naive datetime to a timezone-aware datetime
naive_datetime = datetime(2024, 1, 9, 12, 0, 0)
aware_datetime = tz.localize(naive_datetime)

# Convert between timezones
new_tz = pytz.timezone('Europe/London')
new_aware_datetime = aware_datetime.astimezone(new_tz)
```

**Note:** Make sure to replace `'America/New_York'` and `'Europe/London'` with the desired timezone strings.
