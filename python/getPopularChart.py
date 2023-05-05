import time, os, pymysql
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from datetime import datetime

now = datetime.now()

chrome_options = Options()
prefs = {'download.default_directory' : r'C:\test'}
chrome_options.add_experimental_option('prefs', prefs)
driver = webdriver.Chrome(chrome_options=chrome_options)
driver.maximize_window()

driver.get("https://www.tjmedia.com/tjsong/song_monthPopular.asp") # tj 인기차트

time.sleep(2)

driver.find_element(By.CLASS_NAME,"btn").click()

time.sleep(1)

table = driver.find_element(By.CLASS_NAME,"board_type1")

tbody = table.find_element(By.TAG_NAME,"tbody")

trs = tbody.find_elements(By.TAG_NAME,"tr")

row_list = []

for tr in trs:
    tds = tr.find_elements(By.TAG_NAME, "td") # td에 접근
    if len(tds) == 0:
        continue

    rank = tds[0].text # 순위 넣기
    name = tds[2].text # 곡제목 넣기
    artist = tds[3].text # 가수명 넣기
    tup = (rank, name, artist) #튜플로 만들어서 넣기 *쿼리에 넣을때 튜플로 넣어야 돌아감;;
    print(tup)
    row_list.append(tup) # 리스트에 담기

time.sleep(5)

conn = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='music', charset='utf8')

cursor = conn.cursor()

renameQuery = f"ALTER TABLE popularchart RENAME TO `popularchart{now.date()}`;"

cursor.execute(renameQuery)
cursor.fetchall()
conn.commit() # 커밋

sql = "CREATE TABLE popularchart(popular_rank int(11) not null primary key, name varchar(100) not null, artist varchar(100) not null);"

cursor.execute(sql)
conn.commit() # 커밋

sql = "INSERT INTO `popularchart` (`popular_rank`, `name`, `artist`) VALUES (%s, %s, %s)" #쿼리문

cursor.executemany(sql, row_list) # 다중 쿼리 실행

conn.commit() # 커밋~~
