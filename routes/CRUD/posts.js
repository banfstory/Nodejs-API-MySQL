const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('DB added');
});

module.exports = router;