const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');
const { checkJwt } = require('../middleware/auth');

router.get('/cities', checkJwt, async (req, res) => {
  try {
    const result = await weatherService.getWeatherForAllCities();
    res.json({
      success: true,
      cached: result.cached,
      data: result.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/cache/status', async (req, res) => {
  const stats = weatherService.getCacheStats();
  res.json({
    success: true,
    cache: stats
  });
});

module.exports = router;