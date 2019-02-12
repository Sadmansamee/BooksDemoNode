const express = require('express');
const bp      = require('body-parser');
const signup  = require('./controllers/signup');
const login   = require('./controllers/login');
const books   = require('./controllers/books');
const auth    = require('./middlewares/auth');
const app     = express();
const errh    = require('./middlewares/error_handler');
const red     = require('./controllers/redirects');
const send    = require('./controllers/send__to_destination');
// Middlewares
app.use(bp.json());
app.use('/api',auth);
//Routes
app.use(signup);
app.use(login);
app.use(books);
app.use(red);
app.use(send);
app.use(errh);
const _port = process.env.PORT || 4000;
app.listen(_port,()=>{
    console.log(`Application listening on port: ${_port}`)
});