import axios from 'axios';

const API_KEY = '9169f93ced248be4d821292aaa11022f';

export const getWeatherByCity = (city) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}`);
};