
        
# 웹/모바일(웹 기술) 스켈레톤 프로젝트

<!-- 필수 항목 -->

## 카테고리

| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :black_square_button: AI | :white_check_mark: JavaScript | :white_check_mark: Vue.js |
| :white_check_mark: Mobile Web | :black_square_button: Big Data | :white_check_mark: TypeScript | :black_square_button: React |
| :white_check_mark: Responsive Web | :black_square_button: Blockchain | :black_square_button: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :black_square_button: IoT | :black_square_button: C# | :white_check_mark: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :black_square_button: Python | :black_square_button: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :white_check_mark: Java | :white_check_mark: Spring/Springboot |
| | | :black_square_button: Kotlin | |

<!-- 필수 항목 -->
## 📢 프로젝트 소개
우리프로젝트 로고


### :question: Why Pin to Pin?
- Pin to Pin은 함께 여행가고 싶은 사람들이 함께 여행 계획을 짤 수 있도록 도와주는 어플리케이션입니다.
<br/>
<br/>

### :star2: 특징
- 사용자들과 함께 화상 채팅을 하며 여행 계획을 짤 수 있습니다.
- 실시간 통신을 통해 Kakao Map위에 나만의 핀을 찍고 소통할 수 있습니다.
- 키워드 검색을 통해 장소 검색 가능! 해당 장소의 위치 및 로드뷰 또한 확인 가능! 당연히 Map에 핀으로 등록 가능!
- 기록해둔 내용이 사라질까봐 두려우신가요? Map위에 찍은 핀들과 Text저장소에 저장한 내역들 모두 실시간으로 저장됩니다.
<br/><br/>

### :gift_heart: 주요 기능
    * 회원 관리 (회원가입, 로그인, 수정, 탈퇴)
    * 화상 채팅 (비디오/ 마이크 On/Off)
    * WebSocket을 활용한 실시간 Kakao Map 공유
    * 키워드 검색 및 로드뷰 제공
    * 링크, 준비물 등 Text 정보 기록을 위한 Text저장소 제공
    * 외 사용자 편의 기능 
      (방장 권한 등)
<br/>

### ⚙️ 주요 기술
    * WebSocket/ WebRTC
      => Pin to Pin은 WebSocket 기반으로 통신하여 사용자가 찍은 핀, 작성한 내용 등이 실시간으로 다른 사용자의 Client에 반영되고, 데이터베이스에 저장됩니다. 
    * Spring Security/ JWT Authentication
      => 사용자의 간편 로그인과 보안을 위해 Spring Security를 통해 사용자 정보를 암호화 합니다.
    * JPA
      => 불필요한 SQL문 작성 등, 관계형 데이터베이스와 객체 지향 프로그래밍 간의 패러다임 불일치를 피하기 위해 JPA 인터페이스 기반으로 코드를 작성했습니다.
    * REST API
      => Server와 Frontend와의 효율적인 협업을 위해 REST API방식으로 통신합니다.
<br/>

### 💎 참조 리소스
    * Kakao Map API: 
    * React MUI: 디자인 전반 적용
    * Openvidu: 화상 채팅 구현 사용
    * STOMP : 텍스트 채팅 구현 사용
    * Sock JS : 웹소켓 미지원 브라우저와의 호환을 위해 사용
<br/>

### :ship: 배포 환경
    URL : [https://i6a201.p.ssafy.io/]


<!-- 자유 양식 -->

## 팀 소개 
⭐︎ 이혜민 : 팀장, 백엔드 개발 및 Jira 관리자 <br/>
 ⚝ 강수현 : 프론트엔드 개발 및 Designer <br/> 
 ⚝ 김한나 : 백엔드 개발 및 Git 관리자 <br/> 
 ⚝ 이규은 : 프론트 엔드 개발 및 발표자 <br/>
 ⚝ 손수연 : 백엔드 개발 및 UCC 제작자 <br/>
 ⚝ 최정민 : 백엔드 개발 및 AWS, CI/CD 담당자 <br/> 
<br/>
<br/>

<!-- 자유 양식 -->

## 프로젝트 상세 설명
### 개발 환경

- JIRA : 애자일 및 소프트웨어 개발 프로젝트를 기획, 트래킹 및 관리 협업 툴
- Gitlab : 깃 저장소 및 CI/CD, 이슈 추적, 보안성 테스트 등의 기능을 갖춘 웹 기반의 데브옵스 플랫폼
- Visual Studio Code : JavaScript 및 웹 개발을 위한 소스 코드 편집기, 다양한 확장 기능 제공
- Eclipse : 자바를 비롯한 다양한 언어를 지원하는 프로그래밍 통합 개발 환경

<br/>

### 🔨 기술 스택
- Kurento Media Server, STOMP, Sock JS
- Node.js, Vue3
- Typescript4 (with Javascript(ECMA6))
- HTML5, CSS3
- JAVA (Open JDK 1.8.0)
- Spring Boot
- MySQL 5.7, JPA
- Serverless Cloud(AWS)
- CI/CD (Dokcer, Jenkins)
- Eclipse IDE 2020-06 R (Spring Tools 3, Lombok)

### And Our Basic Skills 🛠️
---
Backend : <img src="https://img.shields.io/badge/JAVA-007396?style=flat-square&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white">
<br/>
Frontend : <img src="https://img.shields.io/badge/html-E34F26?style=flat-square&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=flat-square&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/jquery-0769AD?style=flat-square&logo=jquery&logoColor=white&">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white">

<br/>
<br/>


### 🚩 시스템 구성도
![SYSTEM.png](./img/SYSTEM.png)

<br/>

### 🎫 ERD 
  * 사용자 정보 저장을 위한 User 테이블
  * 미팅 정보 저장을 위한 Meeting 테이블
  * 미팅 참가자 정보 저장을 위한 Participant 테이블
  * 다양한 파일을 일괄 관리하기 위한 Archive 테이블
  * 직군 정보 저장을 위한 Industry 테이블
  * 회사명 정보 저장을 위한 Company 테이블
  * 직군별 질문지 관리를 위한 Question 테이블
  
  <br/>

![ERD_TABEL.png](./img/ERD_TABEL.png)

<br/>

### 기능 상세 설명
👉️ [기능 설명 & 시연 시나리오](https://hana-275-programming.notion.site/a240903ebc7b499aa998b2f3c1a8eb4c) 👈️

 1. 유저 - 회원 가입, 이메일 인증, 닉네임&이메일 중복 검사, 카카오 로그인, 일반 로그인, JWT 토큰 검증, 회원정보 수정, 회원탈퇴, 비밀번호 찾기, 
 2. 미팅 관리 - 미팅 생성, 미팅 삭제, 미팅 수정, 미팅 참가, 미팅 조회, 미팅 검색 및 미팅 필터링, 미팅 비밀번호 검증

 3. 미팅 참여 - 미팅 대기실, 텍스트 채팅, 화상 채팅, 참여자 목록 확인, 파일업로드, 미팅 종료, 녹화, 마이크&카메라 on/off, 참가자 강제퇴장, 기본 면접 평가지 제공, 면접 평가 저장, 랜덤 방장 선출, 면접 답변용 타이머 기능(30초, 60초, 90초), 미팅 녹화    

 4. 미팅 결과 조회 - 미팅 녹화 파일 다운로드(수정중), 메모 다운로드, 면접 평가 다운로드, 파일 다운로드, 채팅 내역 다운로드, 파일 내역 조회, 결과 다운 가능 기한 표시

 5. 마이페이지 - 참가한 미팅 내역 조회, 참가 예정 미팅 조회,

 6. 랜딩 페이지 - 사이트 소개 
 7. 메인 페이지 - 키워드 미팅 검색 제공
 8. 상세 검색 페이지 - 미팅 필터링 검색 제공 

