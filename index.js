require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const PORT = process.env.PORT || 3000;

require('./db/conn');

const registerRouter = require('./routes/register');
const usersRouter = require('./routes/users');
const logoutRouter = require('./routes/logout');
const passport = require('./auth/passport');
const auth = require('./auth/auth');


app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 60000 * 60 // 60 minutes
    },
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@cluster0.cgzxuut.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    })
}));

app.use(passport.authenticate('session'));

app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);

app.get('/', auth.disauthorize, (req, res) => {
    res.render('index');
});

app.post('/', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/'
}))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})