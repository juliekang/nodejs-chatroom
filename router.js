var fs = require('fs');
function route(request, response) {
  if (request.url == "/"){
    fs.readFile('./public/index.html', 'utf-8', function (err, data) {
      if (err) throw err;
      response.end(data);
    });
  } else {
    fs.readFile('./public' + request.url, 'utf-8', function (err, data) {
      if (err) {
        console.log(err);
        response.writeHead('404', {
          'Content-Type': 'text/plain'
        });
      }
      response.end(data);
    });
  }

}

exports.route = route
