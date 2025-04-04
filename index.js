// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const seDataInvalida = (data) => data.toUTCSting() === "Data Inválida"


// your first API endpoint... 
app.get("/api/:data", function (req, res) {
  let data = new Date(req.params.data)

  if(seDataInvalida(data)){
    data = new Date(+req.params.data)
  }

  if(seDataInvalida(data)){
    res.json({error: "Data inválida"})
    return
  }

  res.json({
    unix: data.getTime(),
    utc: data.toUTCSting
  });

  app.get("/api", (req, res) => {
    res.json({
      unix: new Date().getTime(),
      utx: new Date().toUTCSting()
    });
  })
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
