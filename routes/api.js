const express = require('express');
const router = express.Router();

const users_api = require('./CRUD/users.js');
const forums_api = require('./CRUD/forums.js');
const posts_api = require('./CRUD/posts.js');

router.use('/users', users_api);
router.use('/forums', forums_api);
router.use('/posts', posts_api);

module.exports = router;