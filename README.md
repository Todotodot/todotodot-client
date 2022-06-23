## TODOTODOT

[나만의 TODOTODOT 만들러 가기](https://www.todotodot.com)

## ☑️ TODOTODOT 이란?

TODOTODOT(투둣투둣)은 일반적인 Todo 어플리케이션에 게임의 요소를 가미한 웹 어플리케이션입니다.

평소 우리는 Todo 어플리케이션을 다운받으면 짧으면 3일, 길면 일주일 정도만 쓰고 다운받았던 사실조차 잊어버립니다.
그래서 Todo 어플리케이션을 어떻게 하면 유저가 오랫동안 재밌게 사용할 수 있을지에 대한 고민을 해보았습니다.
Todo 플랫폼에 미니 게임을 넣으면 어떨까하는 생각이 제일 먼저 들었고, 그 게임을 혼자 아닌 여러 유저들이 참여하게 하면 우리만의 Todo 어플리케이션을 만들 수 있을 것 같다는 생각을 했습니다.

TODOTODOT의 핵심 기능은 유저가 Todo를 완료하고 싶으면 게임에 참여하여 승리해야만 완료할 수 있는 플랫폼을 가지고 있습니다.
만약 게임에 패배하면 Todo를 완료하지 못하고 다시 게임에 참여할 수 있습니다.
게임은 Todo 어플리케이션이라는 점을 염두에 두고 간단한 게임(Clicker Game)으로 구성하였습니다.
그룹의 경우 모든 인원이 참여해야만 게임을 시작할 수 있다는 조건을 추가하여 난이도 조절을 하였습니다.

그렇다면 이제 저희 TODOTODOT에 한번 참여해보세요!

## ☑️ 실행 방법

### 원격 저장소 내려받는 법

```javascript
https://github.com/Todotodot/todotodot-client.git
npm install
```

### 환경 변수 설정법

```javascript
REACT_APP_APIKEY=<YOUR_API_KEY>
REACT_APP_AUTH_DOMAIN=<YOUR_AUTH_DOMAIN>
REACT_APP_PROJECTID=<YOUR_PROJECT_ID>
REACT_APP_STORAGE_BUCKET=<YOUR_STORAGE_BUCKET>
REACT_APP_MESSAGING_SENDERID=<SENDER_ID>
REACT_APP_APPID=<YOUR_APP_ID>
REACT_APP_MEASUREMENTID=<MEASUREMENT_ID>
REACT_APP_SERVER_URL=https://www.todotodot-server.shop
```

### 실행법

```javascript
npm start
```

### 테스트

```javascript
npm test
```

## ☑️ 개발 기간

2022년 5월 30일 ~ 2022년 6월 17일

### 상세 일정

- Week 1 - 기획 및 설계

  - 아이디어 검토 및 기술 검증
  - Figma 및 Lucid chart 작성
  - Flow chart 작성
  - 칸반 작업
  - Initial set up

- Week 2 - 기능 개발

  - Firebase를 활용한 구글 소셜 로그인 구현
  - 개인의 프로필을 보여주는 페이지 구현
  - 그룹에 속해있는 유저 리스트를 보여주는 페이지 구현
  - 개인 또는 그룹의 todo list를 보여주는 페이지 구현
  - 유저가 속해있는 group list를 보여주는 페이지 구현
  - 유저의 컨펌을 받는 모달 구현
  - todo 또는 그룹을 생성, 수정하는 모달 구현
  - 게임의 결과를 보여주는 모달 구현
  - 에러 페이지 구현
  - 게임 페이지 구현

- Week 3 - 기능 개발 및 배포

  - server 소켓 연동
  - 소켓을 활용한 게임 로직 구현
  - 그룹 멤버 추가 구현
  - 배포 (Netlify, AWS)
  - 테스트 코드 작성

- Frontend

## ⚙️ Tech stack

### Deploy : [![Netlify Status](https://api.netlify.com/api/v1/badges/27da5df7-6519-486f-a4ff-6d793e2a2032/deploy-status)](https://app.netlify.com/sites/polartown/deploys)

### Frontend : <img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-appveyor&logo=React&logoColor=white"/> <img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-appveyor&logo=Redux&logoColor=white"/> <img alt="styled-components" src ="https://img.shields.io/badge/styled_components-DB7093.svg?&style=for-the-appveyor&logo=styled-components&logoColor=white"/> <img alt="axios" src ="https://img.shields.io/badge/axios-764ABC.svg?&style=for-the-appveyor&logo=axios&logoColor=white"/>

## 📌 Features

| Page  |   Features    |                                                                                                          Description                                                                                                          |
| :---: | :-----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Login |     Login     |                                                                         Sign In With Google을 사용하여 로그인시 DB에 저장된 유저의 정보를 가져옵니다.                                                                         |
| Main  | Personal Todo |                                                       유저의 개인 TodoList가 보여지며 Todo의 생성/수정/삭제가 가능합니다. Todo의 체크박스를 클릭 시 게임이 시작됩니다.                                                        |
|       |    Profile    |                                               유저의 레벨에 맞는 캐릭터를 보여주며, 전체 검색을 할 수 있는 검색창과 Personal Todo와 Group List를 오갈 수 있는 버튼이 있습니다.                                                |
|       |  Group List   |         유저가 소유한 그룹 리스트가 보여지며, 그룹의 생성/수정/삭제가 가능합니다. 삭제 시 다른 이가 그룹에 존재할 경우 유저의 그룹 리스트 내에서만 삭제됩니다. 그룹을 클릭 시 그룹 내의 TodoList 페이지로 이동합니다.         |
| Group |   User List   |                                                             해당 그룹의 멤버들이 나타납니다. 전체 검색을 할 수 있는 검색창과 그룹을 나갈 수 있는 버튼이 있습니다.                                                             |
|       |  Group Todo   |                                                    해당 그룹의 TodoList가 보여지며, Todo의 생성/수정/삭제가 가능합니다. Todo의 체크박스를 클릭 시 그룹 게임이 시작됩니다.                                                     |
| Game  | Personal Game |                            게임이 시작되면 제한시간과 보스, 보스의 체력바, 자신의 현재 캐릭터가 나옵니다. 보스를 클릭해 보스의 피를 제한 시간 내에 다 깎으면 승리하며, Todo를 완료할 수 있습니다.                             |
|       |  Group Game   | 그룹 멤버가 제한 시간 내에 모두 모이면 게임이 시작됩니다. 게임이 시작되면 제한시간과 보스, 보스의 체력바, 멤버들의 캐릭터가 나옵니다. 보스를 클릭해 보스의 피를 제한 시간 내에 다 깎으면 승리하며, Todo를 완료할 수 있습니다. |
