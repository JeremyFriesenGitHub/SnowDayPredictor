const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'pug');
app.use(express.static('public'));

// Session Middleware Configuration
app.use(session({
  secret: 'keyis123',  // Replace with a real secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }  // secure: 'auto' will use 'true' if https, 'false' otherwise
}));

// Body Parser Middleware
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json

// Routes
const loginRoutes = require('./routes/loginRoutes');
app.use('/', loginRoutes);

app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.render('dashboard', {
      title: 'User Dashboard',
      username: req.session.username
    });
  } else {
    res.redirect('/users'); // Redirect to login page if not logged in
  }
});

app.get('/', (req, res) => {
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

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(1234, () => {
  console.log("Server is running at http://localhost:1234");
});
