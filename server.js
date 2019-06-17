//==============
// DEPENDENCIES
//==============
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const session = require('express-session');
const marketplaceController = require('./controllers/controller.js');
const nodemailer = require('nodemailer');

// port //
const PORT =  process.env.PORT || 3000;
// mongoose //
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project';

// connect to mongo //
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});
db.on('open', () => {
  console.log('connected to mongo');
});


//=============
// MIDDLEWARE
//=============
app.use(express.static('public'));
app.use(express.json());
//app.use('/marketplace', marketplaceController);
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'feedmeseymour',
    resave: false,
    saveUninitialized: false
}));

//===================
// Get User Session
//===================
app.get('/app', (req, res)=>{
    if(req.session.currentUser){
        res.json(req.session.currentUser);
    } else {
        res.status(401).json({
          status:401,
          message:'not logged in'
        });
    }
})

app.get('/', (req, res)=>{
  res.render('events.ejs')
})
//============
// SEND EMAIL
//============
app.post('/send', function(req, res, next) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lyndsssa@yahoo.com',
      pass: '!123!'
    }
  })
  const mailOptions = {
    from: `${req.body.email}`,
    to: `${req.body.sendTo}`,
    subject: `Testing`,
    text: `${req.body.message}`,
    replyTo: `${req.body.email}`
  }
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('Error: ', err);
    } else {
      console.log('Response: ', res)
    }
  })

})









// user controller for sign up
const userController = require('./controllers/users.js')
app.use('/users', userController);
// session controller for log in
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
// events controller for CRUD on items
const eventsController = require('./controllers/controller.js');
app.use('/events', eventsController);


//=============
// LISTENER
//=============
app.listen(PORT, () => {
  console.log('listening on port:', PORT);
})
