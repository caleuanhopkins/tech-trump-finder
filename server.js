const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = 3000;


nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.render('home.html', { title: 'Hey', message: 'Hello there!' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));