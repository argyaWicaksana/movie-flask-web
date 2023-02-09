import requests, os, json
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bs4 import BeautifulSoup
from os.path import join, dirname
from dotenv import load_dotenv
from bson import json_util, ObjectId
from flask_cors import CORS

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MONGODB_URI = os.environ.get("MONGODB_URI")
DB_NAME =  os.environ.get("DB_NAME")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

def parse_json(data):
    data = json.loads(json_util.dumps(data))
    return data


@app.route('/movie', methods=['POST'])
def movie_post():
    url = request.json['url']
    rating = request.json['rating']
    comment = request.json['comment']
    headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

    data = requests.get(url, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    og_image = soup.select_one('meta[property="og:image"]')
    og_title = soup.select_one('meta[property="og:title"]')
    og_desc = soup.select_one('meta[property="og:description"]')

    image = og_image['content']
    title = og_title['content']
    desc = og_desc['content']

    doc = {
        'image': image,
        'title': title,
        'desc': desc,
        'rating': rating,
        'comment': comment,
    }

    db.movies.insert_one(doc)
    
    return jsonify({'msg':'Saved!'})


@app.route('/movie', methods=['GET'])
def movie_get():
    list_movie = list(db.movies.find())
    return parse_json(list_movie)

@app.route('/movie/update', methods=['POST'])
def movie_update():
    movie_id = request.json['id']
    rating = request.json['rating']
    comment = request.json['comment']
    db.movies.update_one({'_id': ObjectId(movie_id)}, {
        '$set': {
            'rating': rating,
            'comment': comment
        }
    })
    
    return jsonify({'msg': 'Updated successfully!'})

@app.route('/movie/delete', methods=['POST'])
def movie_delete():
    movie_id = request.json['id']
    db.movies.delete_one({'_id': ObjectId(movie_id)})
    
    return jsonify({'msg': 'Deleted successfully!'})

if __name__ == '__main__':
    app.run('localhost', port=5000, debug=True)