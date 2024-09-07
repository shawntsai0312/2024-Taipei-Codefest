# Set Up

'''
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
'''

## API usage

'''
http://127.0.0.1:5000/api/init_data
http://127.0.0.1:5000/api/generate_banner
http://127.0.0.1:5000/api/<class_id>/<id>/fetch_data
/api/<class_id>/<id>/<my_preference>/update_data
'''

## Front End usage

'''
const url = `http://127.0.0.1:5000/api/${userId}/messages`;
const response = await axios.get(url);
if (response.status === 200) {
consloe.log(response.data.content);
}
'''
