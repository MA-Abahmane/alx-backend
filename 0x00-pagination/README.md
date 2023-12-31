### Pagination Cheatsheet

Pagination is a technique used to divide a large set of data into smaller, more manageable chunks or pages. It is commonly employed in web development when displaying a large number of items, such as search results, blog posts, or database records.

#### Basic Pagination Concepts

1. **Page Size (Items per Page):**
   - The number of items displayed on each page.
  
2. **Page Number:**
   - The specific page of data to display.

3. **Total Pages:**
   - The total number of pages needed to display all items.


#### Pagination in Python

##### Using Django

```python
# views.py
from django.core.paginator import Paginator
from django.shortcuts import render

def paginated_view(request):
    items_list = YourModel.objects.all()
    page_number = request.GET.get('page', 1)
    page_size = 10  # Number of items per page

    paginator = Paginator(items_list, page_size)
    page_obj = paginator.get_page(page_number)

    return render(request, 'your_template.html', {'page_obj': page_obj})
```

##### In your HTML template:

``` html
<!-- your_template.html -->
{% for item in page_obj %}
  <!-- Display your item here -->
{% endfor %}

<div class="pagination">
  <span class="step-links">
    {% if page_obj.has_previous %}
      <a href="?page=1">&laquo; first</a>
      <a href="?page={{ page_obj.previous_page_number }}">previous</a>
    {% endif %}

    <span class="current">
      Page {{ page_obj.number }} of {{ page_obj.paginator.num_pages }}.
    </span>

    {% if page_obj.has_next %}
      <a href="?page={{ page_obj.next_page_number }}">next</a>
      <a href="?page={{ page_obj.paginator.num_pages }}">last &raquo;</a>
    {% endif %}
  </span>
</div>
```


##### Using Flask

``` Python
# views.py
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'your_database_uri'
db = SQLAlchemy(app)

class YourModel(db.Model):
    # Your model definition here

@app.route('/paginated_view')
def paginated_view():
    page_number = int(request.args.get('page', 1))
    page_size = 10  # Number of items per page

    items_list = YourModel.query.paginate(page=page_number, per_page=page_size)

    return render_template('your_template.html', items_list=items_list)
```


In your HTML template:

``` html
<!-- your_template.html -->
{% for item in items_list.items %}
  <!-- Display your item here -->
{% endfor %}

<div class="pagination">
  {{ items_list.prev() }}
  Page {{ items_list.page }} of {{ items_list.pages }}
  {{ items_list.next() }}
</div>
```


##### Using SQLAlchemy (without a web framework)

``` Python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

Base = declarative_base()

class YourModel(Base):
    __tablename__ = 'your_model'
    id = Column(Integer, primary_key=True)
    # Your model fields here

# Set up the database connection
engine = create_engine('your_database_uri')
Base.metadata.create_all(engine)
session = Session(engine)

def get_paginated_items(page_number, page_size=10):
    items_list = session.query(YourModel).limit(page_size).offset((page_number - 1) * page_size).all()
    return items_list

# Example usage
page_number = 1
page_size = 10
items_list = get_paginated_items(page_number, page_size)

```


