import express from 'express';
import Weather from './models/Weather.js';

const router = express.Router();

// Post a new weather search
router.post('/weather', async (req, res) => {
  const { city, country, temperature, conditionText, icon } = req.body;

  try {
    const newWeather = new Weather({
      city,
      country,
      temperature,
      conditionText,
      icon
    });

    const savedWeather = await newWeather.save();
    res.status(201).json(savedWeather);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all weather searches
router.get('/weather', async (req, res) => {
  try {
    const weathers = await Weather.find();
    res.json(weathers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
