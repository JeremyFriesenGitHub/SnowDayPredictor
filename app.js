//constants
const express = require('express');
const app = express();
const session = require('express-session');
const db = require('./database');


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.use(express.static('public'));

//start session
app.use(session({
  secret: 'keyis123',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }  
}));

app.use(express.json()); 

//POST Routes from routes folder
const loginRoutes = require('./routes/loginRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/', loginRoutes);
app.use('/register', registrationRoutes);
app.use('/', dashboardRoutes);
app.use('/', feedbackRoutes);


//Get routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Page'
  });
});

//Get routes
app.get('/index', (req, res) => {
  res.render('index', {
    title: 'Home Page'
  });
});

app.get('/users', (req, res) => {
  res.render('users', {
    title: 'Login Page'
  });
});

app.get('/users/register', (req, res) => {
  res.render('register', {
    title: 'Registration Page'
  });
});

app.get('/admin', (req, res) => {
  res.render('admin', {
    title: 'Login Page'
  });
});

//special admin login route
app.get('/login', (req, res) => {
  const data = {};
 
  db.all("SELECT * FROM GuestUser", [], (err, users) => {
      if (err) {
          console.error(err);
          res.status(500).send('An error occurred retrieving users');
          return;
      }
      data.users = users;

   
      db.all("SELECT * FROM Feedback", [], (err, feedback) => {
          if (err) {
              console.error(err);
              res.status(500).send('An error occurred retrieving feedback');
              return;
          }
          data.feedback = feedback; 

         
          db.all("SELECT * FROM Admin", [], (err, admins) => {
              if (err) {
                  console.error(err);
                  res.status(500).send('An error occurred retrieving admins');
                  return;
              }
              data.admins = admins; 

             
              res.render('login', {
                  title: 'Admin Dashboard', 
                  ...data
              });
          });
      });
  });
});


//special dashboard logged in route
app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
   
    res.render('dashboard', {
      title: 'User Dashboard',
      username: req.session.username 
    });
  } else {
    
    res.redirect('/users');
  }
});

//middleware
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send('Internal Server Error');
});

//server
app.listen(1234, () => {
  console.log("Server is running at: http://localhost:1234");
});
