const express = require('express');
// https://github.com/mysqljs/mysql
const mysql = require('mysql');
const app = express();

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

const database_init = require('./routes/database_init.js');
app.use((req, res, next) => {
    res.locals.db = db;
    next();
});
app.use('/database', database_init);

app.listen(5000, () => {
    console.log('Listening on port 5000');
});
