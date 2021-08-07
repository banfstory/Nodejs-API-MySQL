const express = require('express');
const router = express.Router();

// create database (remove property of 'database' to execute this code)
router.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE forum_db';
    res.locals.db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('DB added');
    });
});

// create user table (execute create table first)
router.get('/createusertable', (req, res) => {
    let sql = 'CREATE TABLE user(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), email VARCHAR(100),  password VARCHAR(300))';
    res.locals.db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User table created');
    }); 
});

// create forum table (execute create table second)
router.get('/createforumtable', (req, res) => {
    let sql = 'CREATE TABLE forum(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), about VARCHAR(100), userId int NOT NULL, FOREIGN KEY(userId) REFERENCES user(id))';
    res.locals.db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Forum table created');
    }); 
});

// create post table (execute create table last)
router.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE post(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100), content VARCHAR(100), userId int NOT NULL, forumId int NOT NULL, FOREIGN KEY(userId) REFERENCES user(id), FOREIGN KEY(forumId) REFERENCES forum(id))';
    res.locals.db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Forum table created');
    }); 
});

module.exports = router;