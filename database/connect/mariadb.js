//모듈을 바꿀 생각이 없음
//한 상자를 이 모듈을 위해서만 사용할 것
const mariadb = require("mysql");

//mariadb 연결 (통로 만들기)
const conn = mariadb.createConnection({
  //1. mariadb 접속 (db 집에 들어감)
  host: "localhost", //mariadb가 있는 주소값
  port: 3306, //도커로 마리아 설치할 때 사용한 번호
  user: "root",
  password: "root",
  database: "Tennis", //2. 방 선택
});

//연결 통로를 밖에서 이용
module.exports = conn;
