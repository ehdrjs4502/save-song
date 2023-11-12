# save-song
React.js + Node.js를 활용한 웹사이트

## 📒목차
- [프로젝트 소개](#프로젝트-소개)
- [개발 기간](#개발-기간)
- [사용 기술](#사용-기술)
- [구현 기능](#구현-기능)
- [구현 화면](#구현-화면)

## 🖥프로젝트 소개
노래방에서 선호하는 노래를 다른 사용자와 공유하는 사이트입니다.

## ⏱개발 기간
2023. 03 ~ 2023. 06 (4개월)


## 🛠사용 기술
![React.js](https://img.shields.io/badge/react-%23323330.svg?style=for-the-badge&logo=react&logoColor=#61DAFB)
![typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=#3178C6)
![Node.js](https://img.shields.io/badge/node.js-%23323330.svg?style=for-the-badge&logo=nodedotjs&logoColor=#339933)
![MySQL](https://img.shields.io/badge/mysql-%23323330.svg?style=for-the-badge&logo=mysql&logoColor=#4479A1)
![Python](https://img.shields.io/badge/python-%23323330.svg?style=for-the-badge&logo=python&logoColor=#3776AB)
![selenium](https://img.shields.io/badge/selenium-%23323330.svg?style=for-the-badge&logo=selenium&logoColor=##43B02A)


## 📕구현 기능
- 데이터베이스 설계와 연동 및 백엔드 서버 구현
- 회원가입 및 로그인 기능 구현
- [last.fm](https://www.last.fm/api) Open API를 통한 노래 검색 기능 구현
- 노래 저장 및 삭제 기능 구현
- 다른 사용자와 노래 공유할 수 있도록 사용자 검색 기능 및 팔로우 기능 구현
- Youtube API를 통해 노래 재생 기능 구현
- Python Selenium을 활용하여 인기차트 목록 크롤링 및 데이터베이스에 저장 기능 구현

## 👀구현 화면
### 로그인 화면
![image](https://github.com/ehdrjs4502/save-song/assets/33916924/917c3abe-c5b0-454a-ae73-59b8833bf2b1)
- 처음 사이트에 연결할 시 로그인 화면을 보여줍니다.
- 사용자는 회원가입 후 로그인을 해야 웹사이트를 이용할 수 있습니다.
---------------------------------------

### 메인 화면
![image](https://github.com/ehdrjs4502/save-song/assets/33916924/7a1dfb6b-4e74-453b-a68d-343e808282ef)
- 노래방 인기차트 Top 100을 확인할 수 있습니다.
- 하트 버튼을 통해 선호하는 곡을 저장할 수 있습니다.
---------------------------------------

### 노래 검색 화면
![image](https://github.com/ehdrjs4502/save-song/assets/33916924/c0f5e470-1a04-4acd-b028-02f95518e46a)
- last.fm Open API를 통해 노래를 검색할 수 있습니다.
- 하트 버튼을 통해 선호하는 곡을 저장할 수 있습니다.
---------------------------------------

### 사용자 검색 화면
![image](https://github.com/ehdrjs4502/save-song/assets/33916924/7debbac1-342f-4d69-a8c0-8ec63ad7639c)
- 사용자 이름 또는 아이디로 사용자를 검색할 수 있습니다.
- 버튼을 통해 다른 사용자를 팔로우 / 언팔로우 할 수 있습니다.
---------------------------------------

### 마이 페이지 
![image](https://github.com/ehdrjs4502/save-song/assets/33916924/06d0eed5-6aa9-475a-b444-79bf51f0e8f7)
- 팔로우, 팔로워를 학인할 수 있습니다.
- 자신이 추가한 선호 노래를 확인할 수 있습니다.
- 버튼을 통해 해당 노래를 삭제할 수 있습니다.
---------------------------------------

### 유저 페이지
![image](https://github.com/ehdrjs4502/save-song/assets/33916924/68770005-ad90-4cd5-8181-648096034cf4)
- 다른 사용자의 팔로우, 팔로워 수를 학인할 수 있습니다.
- 다른 사용자의 선호 노래를 확인할 수 있습니다.
- 버튼을 통해 다른 사용자가 선호하는 노래를 추가할 수 있습니다.
---------------------------------------


### 노래 재생 페이지
![image](https://github.com/ehdrjs4502/save-song/assets/33916924/ac326943-3b05-4af6-b480-f8fce26101ab)
- Youtube API를 활용하여 노래를 감상할 수 있습니다.
- 좋아요 버튼을 통해 좋아요 표시를 할 수 있습니다.





