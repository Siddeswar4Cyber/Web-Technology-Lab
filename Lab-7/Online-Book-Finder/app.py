from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['bookstore']
books = db['books']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/books/search')
def search_books():

    title = request.args.get('title')

    if not title:
        return jsonify([])
    
    result = books.find({
        "title": {"$regex": title, "$options": "i"}
    })

    data = []
    for book in result:
        book['_id'] = str(book['_id'])
        data.append(book)
    
    return jsonify(data)

@app.route('/books/category/<category>')
def filter_category(category):
    result = books.find({
        "category": category
    })

    data = []
    for book in result:
        book['_id'] = str(book['_id'])
        data.append(book)
    
    return jsonify(data)

@app.route('/books/sort/<field>')
def sort_books(field):
    if field not in ['price', 'rating']:
        return jsonify({"error": "Invalid sort field"}), 400
    result = books.find().sort(field, 1)

    data = []
    for book in result:
        book['_id'] = str(book['_id'])
        data.append(book)

    return jsonify(data)

@app.route('/books/top')
def top_books():
    result = books.find({
        'rating': {"$gte": 4.5}
    }).limit(5)

    data = []
    for book in result:
        book['_id'] = str(book['_id'])
        data.append(book)

    return jsonify(data)

@app.route('/books')
def pagination():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 5))
    skip = (page - 1) * limit

    result = books.find().skip(skip).limit(limit)

    data = []
    for book in result:
        book['_id'] = str(book['_id'])
        data.append(book)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)