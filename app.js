const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const skyRouter = require('./routes/sky');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/sky', skyRouter);

app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000/sky');
});