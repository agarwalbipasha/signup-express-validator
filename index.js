require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoString = process.env.DATABASE_URL;
const router = require('./routers/router');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error);
})

database.once('connected', () => {
    console.log('Database connected')
})


app.use(express.json());
app.use('/api', router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Successful");
})

app.post('/', (req, res) => {
    res.send(req.body);
})

app.listen(3000, () => {
    console.log("Connected to server at port no 3000");
})