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

  // 도시명이 없으면 에러 메세지표시
  if (!city) {
    return res.render('sky', { weather: null, error: '도시명을 입력하세요.' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=kr`;
    const response = await axios.get(url);
    const weather = response.data;
    // 날씨 정보와 에러 없음 상태로 렌더링
    res.render('sky', { weather, error: null });
  } catch (err) {
    // api 요청 실패 시 에러 메세지 렌더링
    res.render('sky', { weather: null, error: '도시를 찾을 수 없습니다.' });
  }
});
module.exports = router;
// 서버에 대한 의미가없다. ejs로만 해도 충분히 가능함 뭔가 있어야함
// 지도를 넣으면 새로운 api가 들어가긴하는데 만점은 아니다