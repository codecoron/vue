const express = require('express');
const router = express.Router();
router.get('/login', (req, resp) => {
    resp.send('登录');
});
router.get('/register', (req, resp) => {
    resp.send('注册');
});

// 导出路由对象
module.exports = router;