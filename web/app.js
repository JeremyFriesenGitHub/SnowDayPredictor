const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');
const fs = require('fs');
const schemaScript = fs.readFileSync('schema.sql', 'utf8');
const UserModel = require('./models/userModel'); // Adjust the path // Import UserModel
const userModel = new UserModel(db);

// Middleware for handling database connections and transactions
app.use((req, res, next) => {
  // Open a database connection
  db.serialize(() => {
    // Execute the schema script to ensure tables exist
    db.exec(schemaScript, (err) => {
      if (err) {
        console.error('Error creating schema:', err);
      } else {
        console.log('Schema created successfully');
      }
    });
  });

  // Attach the database connection and UserModel to the request object
  req.db = db;
  req.userModel = userModel;

  // Move to the next middleware or route handler
  next();
});

app.use(express.json());

// Process signals to close the database connection
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0); // Exit the application
  });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Use your userModel to insert data into the database
    userModel.createUser(username, password, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send('User registered successfully');
    });
  });

  app.get('/dashboard', (req, res) => {
    // Check if the user is authenticated (You should have a user authentication mechanism)
    if (req.user && req.user.isAuthenticated) {
      // Render the Dashboard template
      res.render('dashboard', {
        title: 'Dashboard',
        user: req.user, // You can pass user data to the template
      });
    } else {
      // If the user is not authenticated, you can redirect to the login page or show an error.
      res.redirect('/users/login'); // Redirect to the login page, adjust the URL as needed.
    }
  });
  
  

// Retrieve data
app.get('/get', (req, res) => {
  const userModel = req.userModel;
  userModel.getAllUsers((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// Update data
app.put('/update/:id', (req, res) => {
  const { name } = req.body;
  const id = req.params.id;

  const userModel = req.userModel;
  userModel.updateUser(id, name, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send('Data updated successfully');
  });
});

// Delete data
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  const userModel = req.userModel;
  userModel.deleteUser(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send('Data deleted successfully');
  });

});

// ... other routes

app.set('view engine', 'pug');
app.use(express.static('public'));

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

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).send('Internal Server Error');
});

app.listen(1234, () => {
  console.log("Server is running at http://localhost:1234");
});
