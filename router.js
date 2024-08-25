function route(pathname, handle, response, productId) {
  console.log("pathname: " + pathname);

  if (typeof handle[pathname] == "function") {
    handle[pathname](response, productId); //소괄호 붙음! 딕셔너리지만, 함수처럼 사용함
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("not found");
    response.end();
  }
}

exports.route = route;
