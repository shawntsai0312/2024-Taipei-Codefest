from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_pymongo import PyMongo
import os
import json
from bson.json_util import dumps

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/taipei_codetest"
CORS(app)
mongo = PyMongo(app)
attractions = mongo.db.attractions

def serialize_document(document):
    # Convert MongoDB ObjectId to string if present
    if '_id' in document:
        document['_id'] = str(document['_id'])
    return document

@app.route('/api/test_connection', methods=['GET'])
def test_connection():
    try:
        mongo.db.command('ping')
        return jsonify({'message': 'Connection to MongoDB successful!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to connect to MongoDB: {str(e)}'}), 500
    
@app.route('/api/init_data', methods=['GET'])
def init_data():
    dirs = "../frontend/public/data"
    data = []
    for root, _, files in os.walk(dirs):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    try:
                        file_data = json.load(f)
                        data += file_data
                    except json.JSONDecodeError:
                        print(f"Error decoding JSON from file: {file_path}")

    print(f"Total documents read: {len(data)}")
    try:
        if isinstance(data, list) and data:
            result = attractions.insert_many(data)
            print(f"Inserted IDs: {result.inserted_ids}")
        else:
            return jsonify({'error': 'Data should be a non-empty list of documents'}), 400
    except Exception as e:
        print(f"Error inserting data into MongoDB: {str(e)}")
        return jsonify({'error': 'An error occurred while inserting data into MongoDB'}), 500
    
    return jsonify({'message': f'{len(data)} records inserted successfully!'}), 201

@app.route('/api/generate_banner', methods=['GET'])
def generate_banner():
    res = []
    try:
        for i in range(1,4):
            attraction = attractions.find({'class_id': float(i)})
            attraction_list = [serialize_document(doc) for doc in attraction]
            if attraction_list:
                res.append(attraction_list)
            else:
                return jsonify({'error': 'Attraction not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500
    
    return jsonify(res), 200
    
@app.route('/api/<class_id>/<id>/fetch_data', methods=['GET'])
def fetch_data(class_id, id):
    try:
        attraction = attractions.find_one({'id': float(id), 'class_id': float(class_id)})
        if attraction:
            return dumps(attraction), 200
        else:
            return jsonify({'error': 'Attraction not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500
    
@app.route('/api/<class_id>/<id>/<my_preference>/update_data', methods=['GET', 'POST'])
def update_data(class_id, id, my_preference):
    try:
        attraction = attractions.find_one({'id': float(id), 'class_id': float(class_id)})
        if attraction:
            attractions.update_one(
                {'id': float(id), 'class_id': float(class_id)},
                {'$set': {'preference': my_preference}}
            )
            return dumps(attraction), 200
        else:
            return jsonify({'error': 'Attraction not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)