let server = require("./server");
let router = require("./router");
let requestHandler = require("./requestHandler");

//mariadb 모듈 불러오기 (conn 변수가 mariadb에 담김)
const mariadb = require("./database/connect/mariadb");
mariadb.connect(); //연결됨

//server의 start 함수 호출
server.start(router.route, requestHandler.handle); //루트 함수를 전달
