const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/Signin');
const register = require('./controllers/Register');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true   
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, db)});
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {  
    console.log(`app is running on port ${process.env.PORT}`);
})  