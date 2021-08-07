const express = require('express');
const router = express.Router();

// add user values (execute add values first)
router.get('/insertusers', (req, res) => {
    const insert_user = 'INSERT INTO user (username, email, password)';
    const values = ' VALUES("user", "user@gmail.com", "pass"),("banf", "banf@gmail.com", "pass111");';
    const sql = insert_user + values;

    res.locals.db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Users added');
    });
});


// add user values (execute add values first)
router.get('/insertusers', (req, res) => {
    const insert_user = 'INSERT INTO user (username, email, password)';
    const values = ' VALUES("user", "user@gmail.com", "pass"),("banf", "banf@gmail.com", "pass111");';
    const sql = insert_user + values;

    res.locals.db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Users added');
    });
});

// add forum values (execute add values second)
router.get('/insertforums', (req, res) => {
    const insert_user = 'INSERT INTO forum (name, about, userId)';
    const values = ' VALUES("FIFA", "Details about FIFA", "1"),("News", "Details about News", "2");';
    const sql = insert_user + values;

    res.locals.db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Forums added');
    });
});

// add post values (execute add values last)
router.get('/insertposts', (req, res) => {
    const insert_user = 'INSERT INTO post (title, content, userId, forumId)';
    const values = ' VALUES("FIFA Title", "Content on FIFA", "1", "1"),("News Title", "Content on News", "2", "2");';
    const sql = insert_user + values;

    res.locals.db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts added');
    });
});


module.exports = router;
 