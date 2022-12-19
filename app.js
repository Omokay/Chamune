const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cors = require('cors');




dotenv.config();

const indexRouter = require('./server/routes/patients.routes');
const usersRouter = require('./server/routes/hospital.routes');
const Hospital = require('./server/models/hospitalSchema');
const {secretKey} = process.env;

const app = express();

app.use(cors({
    origin: ['https://639fb6ace97dd3787e98a060--quizzical-leavitt-78bc04.netlify.app/',]
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}))

// Connecting to the DB using mongoose client
mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true,
              useUnifiedTopology: true
            }).then(() => console.log('DB is connected'));

mongoose.connection.on('error', err => {
    console.log(`${err.message}`)
});

//Passport Configurations
app.use(passport.initialize());

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
   Hospital.findById(id, id, (err, user ) => {
       done(err, user);
   })
});

passport.use(
    new LocalStrategy({username: 'username' }, (username, password, done) => {
        Hospital.findOne({username: username})
            .then((err, user) => {
                if (err) return done(null);
                if (!user) return done(null, false, {message: 'Username does exist'});

                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) return done(err);
                    if (res === false) return done(null, false, {message: 'Incorrect password'});

                    return done(null, user);
                })

            }).catch(err => console.log(err.message));
    }));


const port = process.env.PORT || 1819;
app.listen(port,() => `Server is running @ ${port}`)

module.exports = app;
