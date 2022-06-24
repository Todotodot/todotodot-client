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
git clone https://github.com/Todotodot/todotodot-client.git
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

## 🧠 회고

### 강원희

- 항상 사용하는 웹 브라우저인 크롬에서 확장 프로그램은 떼려야 뗄 수 없는 부분이라고 생각합니다. 특히 `Redux DevTools`나 `JSON Viewer`가 친숙한 저에겐 더욱 익숙하게 다가왔습니다.
  그러던 중 Todotodot 프로젝트에 Chrome Extension을 적용해보면 어떨까? 라고 생각했고 더 나아가서 `React`를 `Create-React-App`없이 직접 `Webpack`설정을 통해 만들어보자란 생각까지 가게 되었습니다.
  웹팩이 익숙지 않아 번들링되는 파일들의 경로 설정과 Extension 로그인 구현에 시간이 굉장히 오래 걸렸습니다.
  Chrome Extension의 뼈대를 구성하고 정의하는 `manifest`의 버전이 v2에서 v3으로 올라오면서 `firebase`를 이용하는 Google 로그인을 사용할 수 없어 `chrome.identity API`를 사용해 해결하는 데까지 오랜 시간이 걸렸고, 로그인 이후에도 사용자에 대한 인증이 부족하다고 판단해 팀원과의 회의 끝에 Extension과 Server가 고유한 `Token`을 소유하고 요청과 응답 간에 해당 `Token`의 진위를 확인한다면 조금은 더 안전하리라 판단하고 구현했습니다.
  흔치 않은 작업이라 얻을 수 있는 정보가 적어서 힘들었지만
  혼자라면 생각하지 못했을 부분들을 팀원들이 뒤에서 제시해주고(Token사용), 또 놓치고 있는 예외의 경우(Extension로그인시 생기는 서버측 에러 등)를 짚어주어 많은 도움이 됐습니다.

- 이번 프로젝트를 통해 또한 **"개발자로서의 협업이란 이런 것이구나"**라고 처음 느낄 수 있었습니다.
  코드 한 줄에도 모든 사람의 의견이 들어있다는 것, 그 의견이 서로 다를 때 소통하고 합의점을 찾는 방법, 합의를 통해 우리 팀만의 고유 코드 스타일을 정하고 일관된 코드를 작성하는 방법, 또한 책임과 의무를 다하는 당연하지만 가장 중요한 태도에 대해 느끼고 되새기게 되는 값진 경험이었습니다.

### 공지현

- 팀 프로젝트를 마무리하며 회고를 해보자면, 가장 많이 노력했던 부분은 팀원들간 의사소통 부분입니다.

  팀원들과 회의를 할 때면 서로 다른 주제를 이야기할 떄도 있었고 의견 충돌이 있을 때도 있었습니다. 이런 이슈가 발생할 때마다 더욱 팀원들의 목소리에 귀를 기울이려고 했습니다.

  한 예로 클라이언트에서 서버에 요청을 보내기 위해 uri를 사용하였는데, 팀원 중 저 포함 다른 분과 함께 왜인지 착각을 하여 두 개의 다른 요청임에도 불구하고 같은 uri를 작성했었습니다. 다행히 팀장님이 그 부분을 발견하여 수정할 것을 요쳥했지만, 저와 다른 팀원은 다른 요청에는 uri가 달라야한다는 것을 파악하지 못하고 문제가 없을 것이라 주장했었습니다. 이 과정에서 저희 팀은 의사소통에 문제를 겪었고 서로가 말하고자 하는 바를 이해하지 못했습니다. 하지만 여기서 누구하나 자신의 의견을 강하게 끌고가려는 팀원은 없었습니다. 각자의 논리를 바탕으로 왜 그렇게 생각하는지에 대해 집중했고 이야기를 나누다보니 저와 다른 팀원은 uri에 대한 개념을 잘못 인지하고 있음을 알아차리고 바로 피드백을 수용했습니다.

  이 과정은 팀 프로젝트를 진행하며 모든 의논사항이나 이슈가 있을 때에 똑같이 적용되었으며, 수 많은 상의를 거치며 팀원들간의 나름의 노하우도 생겼습니다. 상대방의 말하고자하는 바를 이해하지 못한다면 우선 정확히 어떤 부분에서 이해가 되지 않는지 본인의 충분한 설명이 필요했으며 상대방도 설명을 듣고 어떤 부분을 더 설명해주면 좋을지 고민해야했습니다. 초반에 의사소통을 매끄럽게 하기 위해 시간 투자를 많이 하였지만 결국 프로젝트 후반에는 이러한 과정이 시간을 아껴주었고 서로의 의견을 더욱 활발하게 교환할 수 있었습니다.

  팀 프로젝트를 진행하며 저희 팀의 가장 큰 장점이라고 생각하고 의사소통하는 부분에 있어서 최선을 다해준 팀원분들께 감사함을 느낍니다.

### 김다은

- Character Animation

  게임 요소가 생기면서 가장 고민한 것 중 하나는 게임 캐릭터의 애니메이션이었습니다. 캐릭터 애니메이션은 ‘react-responsive-spritesheet’ 라이브러리를 사용했는데, 팀원들과의 논의 끝에 클리커 게임으로 게임의 장르가 정해졌고, 클리커라고 하면 캐릭터가 한 번의 애니메이션 작업을 실행하고 마치는 작업을 클릭을 할 때 마다가 되어야 한다고 생각했습니다. 그리고 애니메이션이 끝나면 다시 처음 프레임으 로 돌아가 실행하고, 원하는 프레임에서 자유롭게 멈출 수 있어야 된다는 기준에 걸맞다고 생각이 되어 ‘react-responsive-spritesheet’ 라이브러리를 사용하게 되었습니다.

- 전역 상태 관리 라이브러리 사용 이유

  팀원들과의 회의를 통해 메인으로 사용될 컴포넌트들을 분리해 작업을 하게되었고, 나중에 각각의 컴포넌트들을 통합하는 작업을 진행을 하게 되었습니다. 통합과정을 진행하다보니, 유저와 모달, 그룹의 데이터를 필요한 컴포넌트에 전달하는 작업에 props를 사용하게되었고, 그 때문에 props를 전달받는 컴포넌트에 Proptypes를 일일히 설정을 하고보니 생각보다 컴포넌트 간의 데이터 전달이 많다는 것을 느끼게 되었습니다.
  처음 기획할 때에는 페이지 간의 이동도 적고, 컴포넌트 간의 데이터 전달이 적을 것으로 생각해 게임 관련 외에는 전역 상태 관리 라이브러리를 사용하지 않아도 된다고 생각했지만, 위와 같은 상황과 더불어 state 값이 변화가 되었을 때 렌더링이 되지 않는 문제까지 겹쳐지면서 팀원들과 의논한 끝에 전역 상태 관리 라이브러리를 사용하기로 했습니다.

  팀 프로젝트를 진행하면서 아침마다 항상 되새기고 했던 것 중 하나가 팀원들과의 커뮤니케이션을 하면서 의견이 제대로 전달되지 않아 서로 다른 이야기를 하고 있을 때, 지레짐작으로 넘어가지 않고 제대로 이해를 하고 넘어갔는지를 파악하는 것이었습니다. 그래서 항상 다른 이야기를 하는 것 같다는 낌새가 보이면 그 때 회의를 멈추고 현재 각자 어떤 것을 이야기하고 있는지를 말하고 다른 이야기를 하고 있다면 지금 이 주제를 논의하고 있다고 말하고 이해가 안되면 이해가 될 때 까지 계속 말하면서 회의에 따라오지 못하는 분이 없도록 노력했습니다. 나중에는 저 뿐만이 아니라 다른 팀원 분들도 제가 못 따라온다던지 하면 바로 파악하고 이해하고 따라올 수 있도록 해주셨습니다.

  프로젝트를 진행하면서 피곤하고 지쳐서 포기하고 싶었던 순간이 여러번이었는데, 팀원들이 많이 다독여주었고 팀원들의 노력하는 모습을 보면서 그만큼 더 에너지를 얻어 피곤하더라도 포기하지 않고 계속 노력할 수 있었던 것 같습니다.

## 🐜 팀원 소개

[![공지현](https://img.shields.io/badge/%EA%B3%B5%EC%A7%80%ED%98%84-jihyun2462%40gmail.com-red)](https://github.com/JihyunGong)
[![강원희](https://img.shields.io/badge/%EA%B0%95%EC%9B%90%ED%9D%AC-eggfreitag%40gmail.com-blue)](https://github.com/eggfreitag)
[![김다은](https://img.shields.io/badge/%EA%B9%80%EB%8B%A4%EC%9D%80-kimde1031%40gmail.com-brightgreen)](https://github.com/KimDaEun1031)
