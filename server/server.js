require('./config/config')

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

<<<<<<< HEAD
app.get('/usuario', (req, res) => {
    res.json('get usuario LOCAL')
});

app.post('/usuario', (req, res) => {

    let body = req.body;
=======
>>>>>>> 440970b7a93818d0c132c80a010162d7a5322c44

app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});


app.listen(process.env.PORT, () => console.log('Escuchando en el puerto ', 3000));