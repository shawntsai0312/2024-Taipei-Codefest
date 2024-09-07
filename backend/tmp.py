# from flask import Flask, request, jsonify
# import requests

# app = Flask(__name__)

# # MongoDB API config
# MONGODB_API_URL = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pmmismi/endpoint/data/v1/action/insertOne"
# FIND_ONE_URL = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pmmismi/endpoint/data/v1/action/findOne"
# API_KEY = "xS2U2l4fA61aPcfmoMFqdXJ0pfgc4Muw5M0Duq7X5vhD2CdfwSd3NEpyR20vSXUE"
# HEADERS = {
#     "Content-Type": "application/json",
#     "Access-Control-Request-Headers": "*",
#     "api-key": API_KEY,
# }

# @app.route("/insert-data", methods=["POST","GET"])
# def insert_datas():
#     try:
#         data = {
#             "name": "朱銘美術館",
#             "description": "欣賞現代雕塑作品的理想去處",
#             "coordinates": {
#                 "latitude": 25.1754,
#                 "longitude": 121.5821
#             },
#             "id": 6,
#             "class_id": 1,
#             "imgUrl": [
#                 "https://comet.noonspace.com/w62/juming/MsgInfo/mainhomeBanner1.jpg",
#                 "https://clairelin.tw/wp-content/uploads/2019/11/%E6%9C%B1%E9%8A%981.jpg"
#             ],
#             "price": "$",
#             "time": "1-2小時",
#             "rating": 4.4,
#             "preference": "dislike"
#         }
#         # Example payload to insert
#         payload = {
#             "database": "taipei_codetest", 
#             "collection": "attractions",  
#             "dataSource": "backend",
#             "document": data
#         }
        
#         # Send request to MongoDB Data API to insert data
#         response = requests.post(MONGODB_API_URL, headers=HEADERS, json=payload)
        
#         if response.status_code == 200:
#             return jsonify({"message": "Data inserted successfully!", "data": response.json()})
#         else:
#             return jsonify({"error": "Failed to insert data"}), response.status_code
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/fetch-data", methods=["GET"])
# def fetch_datas():
#     try:
#         # Define the query for MongoDB API
#         payload = {
#             "database": "taipei_codetest",
#             "collection": "attractions",  
#             "dataSource": "backend",
#             "projection": {"_id": 1, "name": 1}  # Projection to return specific fields
#         }
        
#         # Send request to MongoDB Data API to fetch data
#         response = requests.post(FIND_ONE_URL, headers=HEADERS, json=payload)
        
#         if response.status_code == 200:
#             data = response.json()
#             return jsonify(data), 200
#         else:
#             return jsonify({"error": "Failed to fetch data"}), response.status_code
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify, send_file
import requests
from flask_cors import CORS
from flask_pymongo import PyMongo
import os
import json
from bson.json_util import dumps

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://cheneric0208:<db_password>@backend.rireh0n.mongodb.net/" #mongodb://localhost:27017/taipei_codetest"
CORS(app)
mongo = PyMongo(app)
attractions = mongo.db.attractions

MONGODB_API_URL = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pmmismi/endpoint/data/v1/action/"
API_KEY = "xS2U2l4fA61aPcfmoMFqdXJ0pfgc4Muw5M0Duq7X5vhD2CdfwSd3NEpyR20vSXUE"
HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": API_KEY,
}

@app.route("/create-db-and-collection", methods=["POST"])
def create_db_and_collection():
    try:
        # Get the document to insert from the request
        head=f"{MONGODB_API_URL}insertOne"
        data = {
            "name": "朱銘美術館",
            "description": "欣賞現代雕塑作品的理想去處",
            "coordinates": {
                "latitude": 25.1754,
                "longitude": 121.5821
            },
            "id": 6,
            "class_id": 1,
            "imgUrl": [
                "https://comet.noonspace.com/w62/juming/MsgInfo/mainhomeBanner1.jpg",
                "https://clairelin.tw/wp-content/uploads/2019/11/%E6%9C%B1%E9%8A%981.jpg"
            ],
            "price": "$",
            "time": "1-2小時",
            "rating": 4.4,
            "preference": "dislike"
        }
        
        # Define the payload for MongoDB API
        payload = {
            "collection": "attractions",  # Replace with your desired collection name
            "database": "taipei_codetest",      # Replace with your desired database name
            "dataSource": "backend",
            "document": data  # Data that will be inserted to create the collection and database
        }
        
        # Send request to MongoDB Data API to insert data (and create collection + db)
        response = requests.post(MONGODB_API_URL, headers=head, json=payload)
        print(response)
        # Check if the request was successful
        if response.status_code == 200:
            return jsonify({"message": "Database and collection created successfully!", "data": response.json()})
        else:
            return jsonify({"error": "Failed to create database or collection"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/fetch-data", methods=["GET"])
def fetch_datas():
    # Define your query
    payload = {
        "collection": "attractions",
        "database": "taipei_codetest",
        "dataSource": "backend",
        "projection": {"_id": 1}
    }
    
    # Send request to MongoDB Data API
    response = requests.post(MONGODB_API_URL, headers=HEADERS, json=payload)
    
    # Check response status and return the data
    if response.status_code == 200:
        data = response.json()
        return jsonify(data), 200
    else:
        return jsonify({"error": "Failed to fetch data"}), response.status_code

@app.route("/insert-data", methods=["POST"])
def insert_datas():
    try:
        head = f"{HEADERS}insertOne"
        payload = {
            "collection": "attractions",  # Replace with your collection name
            "database": "taipei_codetest",      # Replace with your database name
            "dataSource": "backend",
            "document": {'name': "eric"}  # The data to be inserted into the collection
        }
        response = requests.post(MONGODB_API_URL, headers=head, json=payload)
        
        if response.status_code == 200:
            return jsonify({"message": "Data inserted successfully!", "data": response.json()})
        else:
            return jsonify({"error": "Failed to insert data"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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