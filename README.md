        
# Pin to Pin

--------pin to pin 배너자리---------

---

실시간 여행 계획 플랫폼, pin to pin입니다.

---



:black_large_square: 사이트 주소

https://http://i7a407.p.ssafy.io/



:black_large_square: UCC 영상

-------------유튜브 링크 자리-----------


---



## 1️⃣ 문제 제기 및 프로젝트 개발 필요성

webex, zoom과 같은 화상 채팅과 여행 계획 수립을 병행하기에 적합한 어플리케이션의 부재를 느꼈습니다.

한 사람이 화면 공유를 하고 나머지 사람들의 의견을 종합하는 구조는 소통이 힘듭니다.

Notion, Google Sheet와 같은 기능을 사용해보며, <strong>Kakao Map, Naver Map과 같은 기능들도 공유할 수 있다면...<strong>이라는 생각을 하게 되었습니다.

이러한 배경에서 온라인 여행 계획 플랫폼 'Pin to Pin'을 기획하게 되었습니다.







## 2️⃣ 프로젝트 소개

>  비대면 온라인 화상 채팅을 통한 소통이 증가함에 따라 **여행 계획만을 위한** 실시간 여행 계획 플랫폼을 개발하게 되었습니다. 본 플랫폼의 주요 기능은 크게 3가지로 나뉩니다.


### :star2: 24시간 열려 있는 채널



---- gif ----



👩 채널은 24시간 열려 있기 때문에 언제든지 접속 가능합니다.

방장이 있어야만 소통할 수 있는 webex 등과 달리 채널에 참여된 인원들 모두 접속되어 있는 인원들과 24시간 소통이 가능합니다.




### :star2: Web RTC 기능(화상 수업)



------gif자리------------



👩  WebRTC 기능을 통한 원격 화상 채팅 서비스를 제공합니다.

채널에 참여하게 되면 자동으로 화상 채팅 서비스에 접속되고, 해당 채널의 인원들과 소통할 수 있습니다.





### :star2: 실시간 여행 계획

------gif자리-------------



👩 WebSocket 기반으로 구현된 실시간 여행 계획 서비스를 제공합니다.

채널의 인원들과 함께 Kakao Map 위에 Pin을 등록하며 여행 계획을 수립할 수 있습니다.

등록한 Pin 및 메모는 실시간으로 다른 Client들의 Map에 반영되기 때문에 사용자의 의견이 곧바로 다른 사용자들에게 제기될 수 있어 양방향 소통이 가능합니다.

원활한 Pin 등록을 위해 키워드 기반 장소 검색 기능도 제공합니다. 검색된 장소들의 위치 또한 Map을 통해 제공되며 해당 장소의 로드뷰 또한 조회할 수 있습니다.

등록된 정보들이 사라질까봐 두려우신가요? 등록된 Pin 및 메모 내용들은 실시간으로 데이터베이스에 저장되기 때문에 걱정하실 필요 없습니다!




## :three: Install and Usage

### 시스템 환경

Pin to Pin은 아래와 같은 환경에서 실행 중입니다.

- Cloud : AWS EC2
- OS : Ubuntu 20.04.3 LTS
- CPU 모델 : Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz
- Total Memory : 16396056 kB
- 물리 cpu 개수 : 1 | cpu당 물리 코어 : 4 

### 시스템 구성

- docker : 20.10.12
- docker-compose : 1.29.2
- DB : mysql  8.0.28
- WebRTC : openvidu 2.20.0
- FrontEnd : Vue build 파일 
- BackEnd : Springboot 
- SSLIS : uwsgi  2.0.20 | django
- Modeling : blender  3.0

### Server Port

| 이름                | 포트 번호 |
| ------------------- | --------- |
| web server(nginx)   | 80        |
| springboot (tomcat) | 8080      |
| django(uwsgi)       | 8000      |
| openvidu(http)      | 4442      |
| openvidu(https)     | 4443      |
| https               | 443       |
| mysql               | 3306      |


#### Ubuntu 버전 업 및 기본 설치

```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

#### frontend 빌드 및 backend 무중단 배포

```
#frontend
npm run build

#backend
nohup java -jar bf.jar & 
```

#### HTTPS 키 발급

```
sudo apt-get install letsencrypt
# 만약 nginx를 사용중이면 중지
sudo systemctl stop nginx
# 인증서 발급
sudo letsencrypt certonly --standalone -d www제외한 도메인 이름

# 아래 키가 발급되는 경로를 /etc/nginx/sites-availabe/default 설정파일에 넣어줘야 함.
 ssl_certificate /etc/letsencrypt/live/도메인이름/fullchain.pem; 
 ssl_certificate_key /etc/letsencrypt/live/도메인이름/privkey.pem;
```



## :four: 개발 플로우

### :star: 아키텍처

-----아키텍쳐 이미지 자리-----------



### :star: WebRTC

#### :scroll: OpenVidu

> WebRTC 기반의 화상 서비스 커스텀 플랫폼
>
> Kurento Media Sever 와 OpenVidu Server 간 Web Socket 통신
>
> 많은 프레임워크와 높은 호환성을 자랑
>
> https://docs.openvidu.io/en/stable/



![image-20220218102231419](BF_Barrier_Free_Project.assets/image-20220218102231419.png)



Web RTC 기술 기반으로 쉽고 간편하게 화상 회의 서비스를 커스텀할 수 있는 OpenVidu 플랫폼을 활용하여 서비스를 개발하였습니다.

- Session

- Publisher
- Subscriber



- **주의점**
  - HTTPS SSL 필수
  - Backend에서 얻어온 토큰 값을 frontend에서 사용하여 세션 연결(공식문서에서 권장하고 있음)







### :star: Kakao Map API



---카카오 맵 API 이미지 자리-------

웹사이트와 모바일 애플리케이션에서
지도를 이용한 서비스를 제작할 수 있도록 다양한 기능을 제공하고 있는 Kakao Map Api를 기반으로 실시간으로 Pin정보를 공유할 수 있는 서비스를 개발하였습니다. 또한 로드뷰 및 키워드 기반 장소 검색 서비스도 개발되었습니다.





## :five: 기능 명세 요구 사항 정의서

https://ibb.co/C04Jwqd

(이미지 크기가 커서 링크로 대체합니다.)



## :seven: REST API



![img](BF_Barrier_Free_Project.assets/unknown-16451149236688.png)





## :eight: ERD

![img](BF_Barrier_Free_Project.assets/Im_Your_BF_DB_ERD.png)





## :nine: 와이어 프레임



![img](BF_Barrier_Free_Project.assets/unknown.png)







## :keycap_ten:  Coding Convention



### :triangular_ruler: Language Convention

- JAVA : 네이버 - [JAVA 코딩 컨벤션](https://naver.github.io/hackday-conventions-java/)
- JAVASCRIPT : AIRBNB - [JAVASCRIPT 컨벤션](https://github.com/airbnb/javascript)
- 주석 : /**

### :triangular_ruler: Commit Message Convention



```
feat : 새로운 기능에 대한 커밋
fix : 버그 수정에 대한 커밋
build : 빌드 관련 파일 수정에 대한 커밋
chore : 그 외 자잘한 수정에 대한 커밋
ci : CI관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋
style : 코드 스타일 혹은 포맷 등에 관한 커밋
refactor :  코드 리팩토링에 대한 커밋
test : 테스트 코드 수정에 대한 커밋
```





### :triangular_ruler: 우선순위 규칙

| Highest(1) | 이걸 끝내지 않고서는 다음 단계로 갈 수 없음                  |
| ---------- | ------------------------------------------------------------ |
| High(2)    | Highest를 끝내고 해야하는 것                                 |
| Mid(3)     | 항상 있는 것 or 중요하지만 시간이 많이 남음(우선 순위를 미룰 수 있음) |
| Low(4)     | 해도 되고 안 해도 됨                                         |
| Lowest(5)  | 진짜 필요할 때만                                             |



### :triangular_ruler: Jira Epic
| 이름 			| 내용			|
|----------------|------------------------|
| 기획          | 기획서, 명세서, 요구사항 정리, 문서 작성             |
| Sign Language | 수어 번역 관련 모든 처리                             |
| WebRTC        | WebRTC 관련 모든 처리(openvidu)                      |
| Project       | 백엔드, 프론트엔드 REQ&RES, DB스키마, 데이터 처리 등 |
| Design        | 와이어 프레임, 프로토타입, 화면 구성, 레이아웃 배치  |
| 배포 및 CI/CD | 배포, action, jenkins, CI/CD 등                      |
| 발표          | PPT 제작, 발표 연습, 시연 영상 찍기 등의 발표 준비   |
| UCC           | UCC 스토리보드  제작, UCC 제작 회의 및 촬영          |
| Docs          | Readme, 기타 제출해야 할 문서 작성                   |









## :family: 팀 소개



### :angel: 팀원 소개

> | 소개  | 이름   | 역할                            | Github		 |
> | ----- | ------ | ------------------------------- | ----------|
> | 🐻팀장 | 이경준 | 프로젝트 총괄, Frontend, 발표자 | 음 |
> | 🐨팀원 | 이주영 | Frontend 리더, UCC, 디자인      | 음 |
> | 🐯팀원 | 조민수 | 알고리즘 개발 및 세부 기능 설계 | 음 |
> | 🐱팀원 | 이상권 | Backend 리더, API, KaKao MAP  | 음 |
> | 🐰팀원 | 유경훈 | Backend, API, DB, ERD          | 음 |
> | 음팀원 | 윤경식 | Backend, API, CRUD, WebRTC     | 음 |


### :palm_tree: Front end

- **남궁휘(팀장, frontend)**
  - 발표 총괄
  - BF 네비게이션 바 구현 및 스타일링
  - BF 메인 페이지 구현 및 CSS 스타일링

- **김순요(팀원, frontend)**

  - 회의 기록 담당
  - Web Speech API를 활용한 STT 구현
    - 음성에 매핑한 수어 영상 출력
    - 음성을 자막 텍스트로 출력
  - 강의실 CSS 디자인
  - 강의실 기본 기능 구현
    - 화면 공유
    - 채팅
    - 마이크 on/off
    - 음소거 on/off
    - 자막 on/off
    - 수어 on/off
    - 호스트, 참여자 화상 소통
    - 수업 기록
    - 강의 종료

- **한승훈(팀원, frontend)**

  - PyKomoran, django로 수어 형태소 분석 구현
    
    - PyKomoran : STT로 들어오는 단어의 형태소 분석
    - django : DB에 영상, 수어 단어 모델링
    
    - AI API·DATA로 단어간 유사도 분석
      - AI API·DATA : DB안에 이름이 중복된 단어가 존재할시 문장에서 단어간의 유사도 분석을 통해 올바른 단어 파싱

  - 강의실 리스트, 프로필 페이지, 로그인, 회원가입 기능 구현 및 CSS 스타일링

  - 아이디 찾기, 비밀번호 찾기 CSS 스타일링

  - BF 메인 페이지 구현 및 CSS 스타일링



### :railway_track: Back end

- **손모은(팀원, backend)**

  - 서버 총괄

  - BF 로그인, 회원가입, 프로필 CRUD 백엔드 API 구축(회원관리)

  - 배포 환경 구축

    - ubuntu
    - nginx 
    - vue
    - spring boot
    - django
    - openVidu 
    - HTTPS SSL 

  - 수어 데이터 크롤링

  - MySQL 데이터베이스 구축 및 연동

    

- **황보라(팀원 backend)**

  - UCC 영상 촬영, 편집 총괄
  - BF 강의실 CRUD 백엔드 API 구축(강의실 관리)
  - 이미지 관리 API 구축
  - OpenVidu Java 백엔드 API 구축
  - 수어 애니메이션 아바타 모델링
  - 수어 데이터 크롤링
  - MySQL 데이터베이스 구축 및 연동
  



## :heart: 소감



**남궁휘**: 갑작스러운 팀장님의 이탈로 팀장 역할을 이어 받게 됐는데 좋은 팀원분들과 함께 프로젝트 진행을 할 수 있어서 너무 즐거웠습니다. 다들 너무 잘해주셔서 저는 크게 프로젝트에 기여한게 없는것 같아 너무 죄송하네요. 다음 특화 프로젝트도 함께 진행하니까 더 열심히 공부해서 프로젝트에 좀 기여를 더 하고 싶어요! 모두 수고 많으셨습니다!



**한승훈**: 이제 끝이났네요.. 생전 처음 체계적으로 프로젝트를 진행해보며 부족한점이 많았지만 팀원들 덕분에 잘 버티고 이겨냈다고 생각합니다.. 또 너무 열심히하고 싶은 마음에 팀원분들에게 폐를 끼쳤을까봐 죄송한 마음도 있습니다.  프로젝트를 진행에 도움과 디자인 논의를 했던 우리 팀장 휘님, 강의실 관련 문제로 항상 얘기를 나눴던 보라님, 회원관리와 서버에러잡기로 저를 불러내주시던 모은님, 프론트 기능 논의로 매일 저와 씨름했던 순요님 모두 감사합니다!!! 특화, 자율 프로젝트, 더 나아가 취업에서도 모두 만났으면 좋겠습니다!



**김순요**: 처음 이번 프로젝트의 아이디어가 선정되었을 때, 너무 어려울 것 같다고 징징 거리기도 하고 팀원들과 다른 방향으로 자꾸만 가고 싶어했던 터라 팀원들이 많이 답답했을 것 같습니다. 시도하기도 전에 겁을 집어 먹는 성격이라 이번 프로젝트를 잘 끝마칠 수 있을지 자신이 없었는데, 팀원분들의 도움 덕분에 무사히 프로젝트 발표를 마칠 수 있었습니다. 되려 제가 맡은 부분에서 계속 이슈가 생겨서 죄송하기까지 합니다. 더 넓은 시각에서 프로젝트 방향을 잡아주신 모은님, 저의 답답한 의견에도 항상 경청해주시고 대안을 제시해주신 보라님, 넘치는 끼와 매력적인 목소리로 팀을 발표까지 이끌어주신 휘님, 마지막으로 미드필더처럼 이곳 저곳에서 결정적인 도움을 주시면서 활약하신 승훈님 모두 감사드립니다! 다음 프로젝트도 화이팅입니다!



**황보라**:너무 좋은 팀원분들을 만나, 활발히 소통하면서 만드는 프로젝트를 경험해 볼 수 있었습니다. 지금까지 2명이 진행하는 프로젝트만 해왔던 터라 협업능력을 위해 필요한 툴들을 쓰려하지 않았는데, 5-6명으로 진행하는 팀프로젝트에서 협업도구는 작업능률에 엄청 큰 영향을 미친다는 것을 알게되었습니다. 다음 프로젝트가 바로 다음주에 기다리고 있으니, 협업도구에 대해 더 공부해야겠습니다. 팀원분들 다들 너무 수고 많으셨습니다. 다들 취뽀합시다~ 



**손모은**: 해보고 싶었던 수어 번역 서비스를 해볼 수 있어서 많은 의미가 있는 프로젝트였습니다, openvidu/Spring boot/Django까지 3개의 서버를 AWS서버에 올리려다보니 크고 작은 이슈가 매일 생겨서 조금 지쳤던 것 같지만, 다 해결했을때 뿌듯함이 기억에 남습니다. 빌드와 배포를 해봐서 backend를 마스터 한 느낌이네요. 다들 너무 고생 많으셨고, 다음 프로젝트 화이팅 입니다!
