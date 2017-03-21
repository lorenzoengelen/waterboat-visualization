import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:3000'});

const getWaterboats = () => {
  instance.get('/api/waterboats')
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};

export default {
  getWaterboats
};