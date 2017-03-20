import axios from 'axios';

const getWaterboats = () => {
  axios.get('/waterboats')
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