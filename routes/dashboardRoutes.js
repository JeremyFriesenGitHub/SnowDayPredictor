//constants
//insert your API_KEY here!
const API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const express = require('express');
const router = express.Router();
const axios = require('axios');

//dashboard route
router.post('/dashboard', async (req, res) => {
    //error
    if (!req.session.userId) {
      res.redirect('/users');
      return;
    }

    //use openweather api
    const city = req.body.city; 
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric' 
        }
      });
      const weatherData = response.data;
  
      
      const isSnowing = weatherData.weather.some(condition => condition.main === 'Snow');

      //render data for pug
      res.render('dashboard', {
        title: 'User Dashboard',
        username: req.session.username,
        weather: weatherData, 
        isSnowing: isSnowing
      });
      //catch error
    } catch (error) {
      console.error(error);
      res.status(500).render('dashboard', { errorMessage: 'An error occurred while retrieving weather data. City Not Found....' });
    }
  });

  //export route
  module.exports = router;
