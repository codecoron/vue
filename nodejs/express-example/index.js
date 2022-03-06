const express = require('express')
const app = express()

const user = require('./user')
const timeline = require('./timeline')

app.use('/user', user);
app.use('./timelin', timeline);

app.listen(8080, () => {
    console.log('listen on 8080')
})

