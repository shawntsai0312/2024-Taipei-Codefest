# import json
# import time
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from collections import defaultdict
# def webCrawler():
#     urls = [
#         "https://www.travel.taipei/zh-tw/attraction/all/hot-spring?page=1",
#         "https://www.travel.taipei/zh-tw/attraction/all/cycling-routes?page=1",
#         "https://www.travel.taipei/zh-tw/attraction/all/historic-sites?page=1",
#         "https://www.travel.taipei/zh-tw/attraction/all/art-and-cultural-centers?page=1",
#         "https://www.travel.taipei/zh-tw/attraction/all/outing-locations?page=1",
#         "https://www.travel.taipei/zh-tw/attraction/all/themed-shopping-areas?page=1",
#         "https://www.travel.taipei/zh-tw/attraction/all/family-activities?page=1"
#     ]
    
#     def convert_to_defaultdict(d):
#         if isinstance(d, dict):
#             return defaultdict(list, {k: convert_to_defaultdict(v) for k, v in d.items()})
#         return d
    
#     data = defaultdict(list)
#     with open('./data/data.json', 'r', encoding='utf-8') as file:
#         loaded_data = json.load(file)
#         data = convert_to_defaultdict(loaded_data)

#     chrome_options = Options()
#     chrome_options.add_argument("--headless")  
#     chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")
#     chrome_service = Service('./chromedriver')  
    
#     # base_url = "https://www.travel.taipei/zh-tw/attraction/all/"
#     # driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
    
#     try:
#         for i, genre_url in enumerate(urls):
#             if i < 3: continue
#             genre = genre_url.split("/")[-1].split("?")[0]
#             driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
#             driver.get(genre_url)
#             ul_element = WebDriverWait(driver, 30).until(
#                 EC.presence_of_element_located((By.XPATH, '//*[@id="main-container"]/div[4]/ul'))
#             )
#             li_elements = ul_element.find_elements(By.TAG_NAME, 'li')
#             for j, li in enumerate(li_elements):
#                 a_tag = li.find_element(By.TAG_NAME, 'a')
#                 url = a_tag.get_attribute('href')
#                 title = a_tag.text.split("\n")[0]
#                 # print(title)
#                 # print(f"[{i+1}][{j+1}] Title: {title}, URL: {url}")
#                 # time.sleep(1)

#                 driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
#                 driver.get(url)

#                 description = driver.find_element(By.XPATH, '//meta[@name="description"]').get_attribute('content')
            
#                 script = """
#                 return document.querySelector('script[type="application/ld+json"]').textContent;
#                 """
#                 json_ld = driver.execute_script(script)
                
#                 item = json.loads(json_ld)
#                 geo_coordinates = item.get('geo', {})
#                 latitude = geo_coordinates.get('latitude')
#                 longitude = geo_coordinates.get('longitude')
#                 image_urls = item.get('image', [])[:2]

#                 data[genre].append({
#                     "class_id": i+1,
#                     "id": j+1,
#                     "name": title,
#                     "description": description,
#                     "url": url,
#                     "imgUrl": image_urls,
#                     "perference": "dislike",
#                     "coordinates": {
#                         "latitude": latitude,
#                         "longitude": longitude
#                     }
#                 })
#                 # print(f"description: {description}\nlocation: {latitude}, {longitude}\nimage: {image_urls}")
#                 print(f"{title} done")
#                 # time.sleep(1)
#             with open('./data/data.json', 'w') as file:
#                 json.dump(data, file, indent=4, ensure_ascii=False)
#             time.sleep(2)
            
#     finally:
#         driver.quit()
    
#     with open('./data/data.json', 'w') as file:
#         json.dump(data, file, indent=4, ensure_ascii=False)


#     # dirs = "./data"
#     # data = []
#     # for root, _, files in os.walk(dirs):
#     #     for file in files:
#     #         if file.endswith('.json'):
#     #             file_path = os.path.join(root, file)
#     #             with open(file_path, 'r', encoding='utf-8') as f:
#     #                 try:
#     #                     file_data = json.load(f)
#     #                     data += file_data
#     #                 except json.JSONDecodeError:
#     #                     print(f"Error decoding JSON from file: {file_path}")
#     # print(data[:][:5])

# if __name__ == '__main__':
#     webCrawler()