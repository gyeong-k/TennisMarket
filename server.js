let http = require("http"); //모듈(http(프로토콜) 기능)을 require 함수로 부름 --> http 변수에 담아 사용할 것
let url = require("url"); //url 모듈 불러오기

function start(route, handle) {
  function onRequest(request, response) {
    //요청 발생할때마다 호출될 함수
    let pathname = url.parse(request.url).pathname; //parse:문자열 캐치, pathname: 경로 알아오기, 기본 false: 문자열로 속성 저장
    let queryData = url.parse(request.url, true).query; //true: 객제로 속성 저장

    route(pathname, handle, response, queryData.productId);
  }

  http.createServer(onRequest).listen(8888);
}

//현 파일 내 start함수를 파일 외부에서도 사용할 수 있도록 export함
exports.start = start;
