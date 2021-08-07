const express = require('express');
const joi = require('@hapi/joi');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    const username = req.query.username;
    let sql = '';
    if(username) {
        sql = `SELECT * FROM user WHERE username="${username}"`;
    } else {
        sql = `SELECT * FROM user`;
    }
    res.locals.db.query(sql, (err, result) => {
        res.header('Content-Type','application/json');
        if(err) throw err;
        res.send(res.locals.db.prettierJSON(result));
    }); 
});

router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM user WHERE id=${req.params.id}`;
    res.locals.db.query(sql, (err, result) => {
        res.header('Content-Type','application/json');
        if(result.length === 0) res.status(404).send(res.locals.db.prettierJSON({'message':'user not found'}));
        if(err) throw err;
        res.send(res.locals.db.prettierJSON(result[0]));
    }); 
});

router.post('/', async (req, res) => {
    // use salt to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashed_password;

    const schema = joi.object({
        username: joi.string().min(4).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    // validate user
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const sql = 'INSERT INTO user SET ?';
    res.locals.db.query(sql, req.body, (err, result) => {
        res.header('Content-Type','application/json');
        if(err) throw err;
        const sql_inserted = `SELECT * FROM user WHERE id=${result.insertId}`;
        res.locals.db.query(sql_inserted, (err, result) => {
            res.header('Content-Type','application/json');
            if(err) throw err;
            res.send(res.locals.db.prettierJSON(result[0]));
        }); 
    }); 
});

router.patch('/:id', (req, res) => {
    if(Object.keys(req.body).length === 0) res.status(400).send(res.locals.db.prettierJSON({'message':'body cannot be empty'}));
    const schema = joi.object({
        username: joi.string().min(4),
        email: joi.string().min(6).email(),
        password: joi.string().min(6)
    });
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const sql = `UPDATE user SET ? WHERE id=${req.params.id}`;
    res.locals.db.query(sql, req.body, (err, result) => {
        res.header('Content-Type','application/json');
        if(err) throw err;
        const sql_inserted = `SELECT * FROM user WHERE id=${result.insertId}`;
        res.locals.db.query(sql_inserted, (err, result) => {
            res.header('Content-Type','application/json');
            if(err) throw err;
            res.send(res.locals.db.prettierJSON(result[0]));
        }); 
    });
});

module.exports = router;