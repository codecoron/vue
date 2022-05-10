exports.formatTime = function (timestamp) {
    const duration = parseInt(Date.now() / 1000, 10) - timestamp;
    console.log(duration)
    if (duration < 600) {
        return '刚刚'
    }
    if (duration < 3600) {
        return '1小时内'
    }
    if (duration < 3600 * 3) {
        return '3小时内'
    }
    if (duration < 3600 * 24) {
        return '今天'
    }
    if (duration < 3600 * 24 * 2) {
        return '1天前'
    }
    return new Date(timestamp * 1000).toString();
}