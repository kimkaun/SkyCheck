const express = require('express');
const axios = require('axios'); // HTTP 요청을 보내기 위한 라이브러리
const router = express.Router();
require('dotenv').config(); 

// 초기 화면 표시
router.get('/', (req, res) => {
  res.render('sky', { weather: null, error: null });
});

// 사용자가 입력한 도시명으로 날씨 api 요청
router.post('/', async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.render('sky', { weather: null, air: null, error: '도시명을 입력하세요.' });
  }

  try {
    // 도시 날씨 정보 요청
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=kr`;
    const weatherResponse = await axios.get(weatherUrl);
    const weather = weatherResponse.data;

    // 해당 도시의 위도, 경도 추출
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;

    // 위도, 경도를 이용해 미세먼지 정보 요청
    const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const airResponse = await axios.get(airUrl);
    const air = airResponse.data.list[0];

    // 에러가 없으면 날씨와 미세먼지 렌더링
    res.render('sky', { weather, air, error: null });
  }
  // 에러가 있으면 ''문장 렌더링 
  catch (err) {
    res.render('sky', { weather: null, air: null, error: '도시를 찾을 수 없습니다.' });
  }
});
module.exports = router;
