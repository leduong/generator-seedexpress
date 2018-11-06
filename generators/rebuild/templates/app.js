const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const FileStore = require('session-file-store')(session);

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

const logger = require('morgan');

// Routers
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
<% _.each(entities, function(entity) { %>const <%= _.camelCase(entity.name) %>Router = require('./routes/<%= _s.classify(entity.name) %>');
<% }); %>


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore;
const secretKey = 'IamDontKnowWhatisThisKey';// should to change
if (config.redis) {
    var redisStoreoptions;
    redisStoreoptions = {
        host: config.redis.host,
        port: config.redis.port,
        db: config.redis.database,
        pass: config.redis.password
    };
    sessionStore = new RedisStore(redisStoreoptions);
} else {
    sessionStore = new FileStore();
}

var sess = {
    store: sessionStore,
    secret: crypto.createHash('sha256').update(secretKey).digest('hex'),
    resave: false,
    saveUninitialized: true,
    cookie: {},
    // genid: function (req) {
    //'req' is defined but never used  no-unused-vars
    genid: function() {
        return uuidv4(); // use UUIDs for session IDs
    }
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

// app.use(function (req, res, next) {
//   if (!req.session) {
//     return next(new Error("oh no")); // handle error
//   }
//   next();
// });

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
// Routers
<% _.each(entities, function(entity) { %>app.use('/<%= _.toLower(_s.classify(entity.name)) %>', <%= _.camelCase(entity.name) %>Router);
<% }); %>

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
// 'next' is defined but never used  no-unused-vars
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
