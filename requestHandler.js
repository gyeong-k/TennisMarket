//화면 바꾸는 방법
const fs = require("fs"); //file system? 우리가 만들어둔 html 가져옴
const main_view = fs.readFileSync("./main.html", "utf8");
const orderlist_view = fs.Dir.readFileSync("./orderlist.html", "utf8");

//mariadb 소환
const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  //sql 던지기
  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);
  response.end();
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "INSERT INTO orderlist VALUES (" +
      productId +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    function (err, rows) {
      console.log(rows);
    }
  );
  response.write("order page");
  response.end();
}

function orderlist(response) {
  console.log("orderlist");

  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query("SELECT * FROM orderlist", function (err, rows) {
    response.write(orderlist_view);

    //for 반복문 같은것
    rows.forEach((element) => {
      response.write(
        "<tr>" +
          "<td>" +
          element.product_id +
          "</td>>" +
          "<td>" +
          element.order_date +
          "</td>" +
          "</tr>"
      );
    });

    response.write("</table>");
    response.end();
  });
}

let handle = {}; // key: value
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/* image 경로 */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
