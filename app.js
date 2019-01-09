const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;


app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home');
})


const items = require('./controllers/items')(app);





app.listen(port, () => {
    console.log("app listening on port 3000");
});