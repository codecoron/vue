const user = { ajinlong: 'password' }

// 登录
exports.login = function (username, password) {
    if (user[username] === undefined) {
        return false
    }
    return user[username] === password
}

