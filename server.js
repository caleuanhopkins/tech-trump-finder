require('dotenv').load({silent: true});
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = 3000;
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// respond with "hello world" when a GET request is made to the homepage

app.get('/create', function (req, res) {
    res.render('submit.html', { title: 'Hey', message: 'Hello there!' });
});

app.post('/submit', async (req, res) => {
    const results = [];
    // Grab data from http request
    const data = req.body;
    // Get a Postgres client from the connection pool

    if(!req.body.index){
        try {
            const client = await pool.connect()
            let insert = await client.query('INSERT INTO attendee(attendee, card, twitter) values($1, $2, $3)',[data.attendee, data.card, data.twitter]);
            client.release();
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    }else{
        try {
            const client = await pool.connect()
            let insert = await client.query('UPDATE attendee set card=$1 where id = $2',[data.card,data.index]);
            client.release();
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        } 
    }
});

app.get('/', async (req, res) => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM attendee order by id');
        const results =(result) ? result.rows : null;
        client.release();
        res.render('home.html', { people: JSON.stringify(results)});

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));