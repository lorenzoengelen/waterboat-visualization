import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:3000'});

const getWaterboats = (cb) => {
  instance.get('/api/waterboats')
    .then(function (res) {
      cb(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

export default {
  getWaterboats
};