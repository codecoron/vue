const express = require('express')
const router = express.Router();

router.get('/list', (req, resp) => {
    resp.send('动态列表')
});

module.exports = router
