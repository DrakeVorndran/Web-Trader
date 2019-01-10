require('dotenv').config();
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;



app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(cookieParser()); 
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

app.use(express.static(__dirname + '/public'));

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


app.get('/', (req, res) => {
     var currentUser = req.user;
//    console.log(req.user)
//    console.log(res.cookie())
  res.render('home',{user:currentUser});
})


require('./controllers/items')(app);
require('./controllers/catalog')(app);
require('./controllers/auth')(app);





app.listen(port, () => {
    console.log("app listening on port 3000");
});