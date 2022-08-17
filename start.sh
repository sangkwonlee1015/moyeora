#!/bin/sh



#빌드 전에 해야할 일들 


#sed -i 's/\"https:\/\/localhost:8080\"/\"https:\/\/i7a407.p.ssafy.io\"/g'
#sed -i 's/\"https:\/\/localhost:8080\/ws\"/\"https:\/\/i7a407.p.ssafy.io\/ws\"/g'
sed -i 's/8080/8081/g' ./backend/src/main/resources/application.properties
sed -i 's/1234/ssafy/g' ./backend/src/main/resources/application.properties
sed -i 's/root/ssafy/g' ./backend/src/main/resources/application.properties
sed -i 's/4443/8443/g' ./backend/src/main/resources/application.properties

sed -i 's/localhost:8080/i7a407.p.ssafy.io/g' ./backend/src/main/frontend/src/api/index.js
sed -i 's/localhost:8080/i7a407.p.ssafy.io/g' ./backend/src/main/frontend/src/components/MapArea.js
sed -i 's/localhost:8080/i7a407.p.ssafy.io/g' ./backend/src/main/frontend/src/components/Header/ChannelTest.js
sed -i 's/localhost:8080/i7a407.p.ssafy.io/g' ./backend/src/main/frontend/src/components/Sidebar/Sidebar.js
sed -i 's/localhost:8080/i7a407.p.ssafy.io/g' ./backend/src/main/frontend/src/container/MapPage.js
sed -i 's/localhost/i7a407.p.ssafy.io/g' ./backend/src/main/frontend/src/components/Openvidu/VideoRoomComponent.js
sed -i 's/4443/8443/g' ./backend/src/main/frontend/src/components/Openvidu/VideoRoomComponent.js



sed -i 's/http/https/g' ./backend/src/main/frontend/src/api/index.js
sed -i 's/http/https/g' ./backend/src/main/frontend/src/components/MapArea.js
sed -i 's/http/https/g' ./backend/src/main/frontend/src/components/Header/ChannelTest.js
sed -i 's/http/https/g' ./backend/src/main/frontend/src/components/Sidebar/Sidebar.js
sed -i 's/http/https/g' ./backend/src/main/frontend/src/container/MapPage.js

sed -i 's/httpss/https/g' ./backend/src/main/frontend/src/api/index.js
sed -i 's/httpss/https/g' ./backend/src/main/frontend/src/components/MapArea.js
sed -i 's/httpss/https/g' ./backend/src/main/frontend/src/components/Header/ChannelTest.js
sed -i 's/httpss/https/g' ./backend/src/main/frontend/src/components/Sidebar/Sidebar.js
sed -i 's/httpss/https/g' ./backend/src/main/frontend/src/container/MapPage.js






mkdir deployfolder
cd ./backend
#build
gradle clean build

#빌드 결과물인 jar파일 이동 시키기
rm -rf ../deploy/*.jar
cp ./build/libs/*.jar ../deployfolder/

#frontend폴더로 이동
cd src/main/frontend
#빌드 전에 해야할 일들

#build
npm install
npm run build

rm -rf ../../../../deployfolder/build
cp -r build ../../../../deployfolder
#cd ../../../../
#ls -al
#ls -al deploy


#kill -9 `ps -ef|grep ssafy|awk '{print $2}'`
#nohup java -jar *.jar &


