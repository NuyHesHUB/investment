# PROJECT 투자플랫폼 웹페이지

> ## **프로젝트명**

- 커뮤니티를 생성하고 포스트와 댓글기능이 있는 커뮤니티 페이지 (👨🏻‍💻 1인 프로젝트)

<br/>

> ## **프로젝트 미리보기**

<img src="https://github.com/NuyHesHUB/project01_suwon/assets/115362203/75f35e13-8323-40f9-b610-bfc169902ab9" alt="page"/>

<br/>
<br/>

> ## **프로젝트 링크**
 
- 배포링크 : <http://ec2-3-24-85-149.ap-southeast-2.compute.amazonaws.com/>
- 시연영상 : <https://www.youtube.com/watch?v=8E1KGiLDe_Y>

<br/>

> ## **프로젝트의 설명**

- 이 프로젝트의 동기는 React와 TypeScript의 기초 문법을 학습하고, Next.js의 빠른 로딩과 쉬운 페이지 라우팅 기능을 경험하고자 했습니다. 한편으로는 프론트엔드만으로도 제 역량이 부족하다는 사실은 알고있지만 실제 운영되는 커뮤니티와 유사한 시스템을 구현해보고 싶었습니다. 이 프로젝트를 통해 데이터베이스를 사용하는 실제 커뮤니티 페이지를 구축하고, AWS의 기초적인 사용법을 배워 서버를 배포하는 경험을 해보고 싶었습니다. 프론트엔드부터 백엔드까지 전체적인 개발 과정을 경험하며, 프로젝트를 완성하기 위해 필요한 다양한 기술과 도구들을 학습하고 적용해보고자 React와 TypeScript를 기반으로 프론트엔드 개발 능력을 향상시키는 동시에 백엔드 개발과 서버 배포에 대한 이해를 도모하고자 하는 목적을 가지고 시작되었습니다.

- 이 프로젝트를 통해 실제 웹 애플리케이션의 개발과 배포 과정을 경험함으로써 기초를 알게되었습니다. AWS EC2 인스턴스 생성 및 설정, Express.js와 PostgreSQL을 사용한 백엔드 개발, Docker를 사용한 컨테이너화와 배포 등에 대한 이해력과 실습 경험이 생기게 되었습니다. 또한, 문제 해결 능력과 자기 학습 능력을 키움으로써 웹 개발 역량을 향상시킬 수 있었습니다.<br/><br/>
**특징** <br/>
1) React와 기초문법을 익히기 위해 사용한 TypeScript를 기반으로 한 풀스택 개발이라는 점입니다. Express.js를 사용하여 웹 서버를 구축하고 PostgreSQL을 데이터베이스로 활용했습니다. AWS EC2를 통해 가상 서버를 생성하고 Docker를 사용하여 애플리케이션을 컨테이너화하여 배포했습니다. 이를 통해 프론트엔드와 백엔드 간의 상호작용과 클라우드 환경에서의 애플리케이션 배포에 대한 경험을 얻을 수 있었습니다. <br/>
2) React Context를 사용하여 상위 컴포넌트에서 생성한 컨텍스트를 하위 컴포넌트에서 직접 접근하여 상태를 공유할 수 있습니다. 이를 통해 회원가입에 필요한 정보와 상태를 관리하고, 필요한 컴포넌트에서 해당 정보를 손쉽게 사용할 수 있었습니다.<br/>
3) 프로젝트를 AWS EC2 인스턴스에 배포하였습니다. 이를 통해 실제 운영 환경에 프로젝트를 배포하고 사용자들에게 서비스를 제공하는 경험을 할 수 있었습니다.<br/>
4) API를 생성하여 유저의 권한을 체크하고 데이터베이스에 정보를 저장한 후, 해당 정보를 프론트엔드로 전달하여 커뮤니티를 생성하는 기능을 구현하였습니다.<br/><br/>
**어려웠던 점** <br/>
- 프론트엔드와 백엔드 간의 데이터 흐름을 이해하는 것이 엄청 어려웠습니다. 사용자가 프론트엔드에서 커뮤니티 생성 요청을 보내면, 해당 요청을 백엔드에서 받아 처리하고 데이터베이스에 저장해야 했습니다. 이 과정에서 데이터의 형식, 전송 방식, 백엔드에서의 데이터 처리 등을 고려해야 했습니다.
- 타입 시스템의 개념과 문법을 익히는 것이 처음에는 어려웠습니다. 어떤 타입을 사용해야 하는지, 타입 주석 및 타입 추론 방식을 이해하는 데 시간이 걸렸습니다.
- Next.js의 프로젝트 구조와 파일 시스템 라우팅 개념을 익히는 데 어려움을 겪었습니다. 어떤 파일을 어떤 위치에 작성해야 하는지, 페이지 및 컴포넌트의 구조를 어떻게 설계해야 하는지 학습하는 데 시간이 걸렸습니다.
- Express.js의 미들웨어의 개념과 사용법을 이해하는 데 어려움을 겪었습니다. 어떤 미들웨어를 사용해야 하는지, 미들웨어 함수의 작성 방법 및 순서를 어떻게 설정해야 하는지 학습하는데 많은 시간이 필요했습니다.
- AWS EC2 인스턴스를 설정하는 것이 어려웠습니다. 초기 설정, 보안 그룹, SSH 접속 등을 제대로 이해하고 구성해야 했습니다. 처음 사용하는 것이라 어떤 옵션을 선택해야 하는지 헷갈렸고, 설정들이 서로 연결되어 있어 한 가지를 바꿀 때 다른 설정에도 영향을 줄 수 있다는 것을 알게 되었습니다.
<br/>

> ## **프로젝트 기간**

- 8주

<br/>

> ## **프로젝트 주요기능**

- <strong>React-Context</strong>를 이용한 회원가입 기능
- <strong>커뮤니티</strong> 생성, 배너와 커뮤니티 대표이미지 업로드 기능
- <strong>포스트</strong>작성과 좋아요 , 싫어요 기능
- <strong>유저</strong>정보를 볼 수 있고, 유저가 작성한 글 , 작성 댓글 보기 기능
- 상위 <strong>커뮤니티</strong> 나열 기능

<br/>

> ## **프로젝트 기술스택**

### ✔️ Front-end

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">


### ✔️ Back-end

<img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white"><img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"><img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"><img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/pm2-2B037A?style=for-the-badge&logo=pm2&logoColor=white">


### ✔️ Library
<img src="https://img.shields.io/badge/react_router_dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"><img src="https://img.shields.io/badge/typeORM-black?style=for-the-badge&logo=0&logoColor=white"><img src="https://img.shields.io/badge/class_names-gray?style=for-the-badge&logo=0&logoColor=white"><img src="https://img.shields.io/badge/day.js-black?style=for-the-badge&logo=0&logoColor=white"><img src="https://img.shields.io/badge/react_icons-gray?style=for-the-badge&logo=0&logoColor=white"><img src="https://img.shields.io/badge/sharp-black?style=for-the-badge&logo=0&logoColor=white">

<hr/>


