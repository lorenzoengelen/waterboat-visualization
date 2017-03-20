const _ = require('lodash');
const router = require('express').Router();

const info = require('../db/info.json');

router.route('/waterboats')
  .get((req, res) => {
    let obj = _.reduce(info, (result, boat) => {
      
      let number = boat.name.replace(/\D/g, '');

      result[number] = {
        number: number,
        mmsi: boat.mmsi,
        name: `Waterboat ${number}`,
        shipType: boat.shipType,
        length: boat.positionOfTransponder.distanceToBow + boat.positionOfTransponder.distanceToStern,
        width: boat.positionOfTransponder.distanceToPort + boat.positionOfTransponder.distanceToStarboard,
      };
      
      return result;
    }, {});
    
    res.send(obj);
  });


module.exports = router; 