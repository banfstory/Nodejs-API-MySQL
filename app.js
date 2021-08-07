const express = require('express');
// https://github.com/mysqljs/mysql
const mysql = require('mysql');
const prettierJSON = require('./prettier.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'forum_db'
});

db.connect(err => {
    if(err) throw err;
    console.log('MySql Connected');
});

const database_init = require('./routes/setup/database_init.js');
const values_init = require('./routes/setup/values_init.js');
const api = require('./routes/api.js');

app.use((req, res, next) => {
    res.locals.db = db;
    res.locals.db.prettierJSON = prettierJSON;
    next();
});

app.use('/database', database_init);
app.use('/values', values_init);
app.use('/api', api);

app.listen(5000, () => {
    console.log('Listening on port 5000');
});
