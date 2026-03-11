from flask import Flask,request,jsonify,render_template
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['student_db']
notes_collection = db["notes"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/notes',methods=['POST'])
def add_note():
    data = request.json

    note = {
        "title": data['title'],
        "subject": data['subject'],
        "description": data['description'],
        "created_at": datetime.now().strftime("%Y-%m-%d")
    }

    print(note)

    notes_collection.insert_one(note)

    return jsonify({"message": "Note added successfully!"})

@app.route('/notes', methods=['GET'])
def get_notes():

    notes =[]

    for note in notes_collection.find():
        note['_id'] = str(note['_id'])
        notes.append(note)

    return jsonify(notes)

@app.route('/notes/<id>', methods=['PUT'])
def update_note(id):
    data = request.json

    notes_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {
            "title": data['title'],
            "subject": data['subject'],
            "description": data['description']
        }}
    )

    return jsonify({"message": "Note updated successfully!"})

@app.route('/notes/<id>', methods=['DELETE'])
def delete_note(id):
    notes_collection.delete_one({"_id": ObjectId(id)})

    return jsonify({"message": "Note deleted successfully!"})

if __name__ == '__main__':
    app.run(debug=True)