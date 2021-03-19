import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '4005',
      database : 'smart-brain'
    }
});

// db.select('*').from('users')
// .then(data => {
//     console.log(data)
// });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!')})

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) });
    
app.put('/image', (req, res) => { handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { handleApiCall(req, res) });

// const PORT = process.env.PORT
// app.listen(PORT, () => {
//     console.log(`app is runing on port ${PORT}`)
// })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is runing on port ${process.env.PORT}`)
})


/*
/ --> res = this is working
/signin --> POST = succes/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
