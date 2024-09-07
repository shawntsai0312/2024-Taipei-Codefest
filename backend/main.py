from flask import Flask, request, jsonify, send_file
import requests
from flask_cors import CORS
from flask_pymongo import PyMongo
import os
import json
from bson.json_util import dumps
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
MONGODB_API_URL = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pmmismi/endpoint/data/v1/action/"
API_KEY = os.getenv("API_KEY") 
HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": API_KEY,
}

def serialize_document(document):
    # Convert MongoDB ObjectId to string if present
    if '_id' in document:
        document['_id'] = str(document['_id'])
    return document
    
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
        url = f"{MONGODB_API_URL}insertMany"
        payload = {
            "database": "taipei_codetest", 
            "collection": "attractions", 
            "dataSource": "backend",
            "documents": data  
        }
        response = requests.post(url, headers=HEADERS, json=payload)
        if response.status_code == 200:
            return jsonify({"message": "Documents inserted successfully!", "data": response.json()})
        else:
            return jsonify({"error": "Failed to insert documents", "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate_banner', methods=['GET'])
def generate_banner():
    res = []
    try:
        for i in range(1, 4):  
            url = f"{MONGODB_API_URL}find"
            payload = {
                "database": "taipei_codetest",  
                "collection": "attractions",  
                "dataSource": "backend",
                "filter": {"class_id": float(i)}
            }

            response = requests.post(url, headers=HEADERS, json=payload)
            if response.status_code == 200:
                data = response.json()
                documents = data.get("documents", [])
                if documents:
                    attraction_list = [serialize_document(doc) for doc in documents]
                    res.append(attraction_list)
                else:
                    return jsonify({'error': 'Attractions not found for class_id ' + str(i)}), 404
            else:
                return jsonify({'error': 'Failed to fetch data', 'details': response.text}), response.status_code
    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500
    
    return jsonify(res), 200
    
@app.route('/api/<class_id>/<id>/fetch_data', methods=['GET'])
def fetch_data(class_id, id):
    try:
        url = f"{MONGODB_API_URL}findOne"
        payload = {
            "database": "taipei_codetest", 
            "collection": "attractions",  
            "dataSource": "backend",
            "filter": {'class_id': float(class_id), 'id': float(id)}
        }
        response = requests.post(url, headers=HEADERS, json=payload)
        if response.status_code == 200:
            data = response.json()
            return jsonify({"message": "Document found!", "data": data}), 200
        else:
            return jsonify({"error": "Failed to find document", "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/<class_id>/<id>/<my_preference>/update_data', methods=['GET', 'POST'])
def update_data(class_id, id, my_preference):
    try:
        url = f"{MONGODB_API_URL}updateOne"
        update_operation = {
            "$set": {
                "preference": my_preference
            }
        }
        payload = {
            "database": "taipei_codetest", 
            "collection": "attractions",  
            "dataSource": "backend",
            "filter": {'class_id': float(class_id), 'id': float(id)},
            "update": update_operation
        }
        response = requests.post(url, headers=HEADERS, json=payload)

        if response.status_code == 200:
            data = response.json()
            return jsonify({"message": "Document updated successfully!", "data": data}), 200
        else:
            return jsonify({"error": "Failed to update document", "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500
    
@app.route('/api/<class_id>/fetch_like_data', methods=['GET', 'POST'])
def fetch_like_data(class_id):
    try:
        url = f"{MONGODB_API_URL}find"
        payload = {
            "database": "taipei_codetest", 
            "collection": "attractions",  
            "dataSource": "backend",
            "filter": {'class_id': float(class_id), 'preference': "like"},
        }
        response = requests.post(url, headers=HEADERS, json=payload)
        print(response)
        if response.status_code == 200 and response.json is not None:
            data = response.json()
            return jsonify({"message": "Liked Data fetched successfully!", "data": data}), 200
        else:
            return jsonify({"error": "Failed to fetch data", "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)


# xS2U2l4fA61aPcfmoMFqdXJ0pfgc4Muw5M0Duq7X5vhD2CdfwSd3NEpyR20vSXUE
# DB, erichen, password : Cy7zVndCI3LEgQeg