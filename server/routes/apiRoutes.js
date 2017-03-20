const _ = require('lodash');
const router = require('express').Router();

const info = require('../db/info.json');
const history = require('../db/history.json');

// GET WATERBOAT INFO
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
    
    res.json(obj);
  });

// GET TIMESPAN OF DATA AVAILABLE
router.route('/timespan')
  .get((req, res) => {
    let min = _.minBy(history, log => {
      return log.timeLastUpdate;
    });
    let max = _.maxBy(history, log => {
      return log.timeLastUpdate;
    });

    res.json({
      min: min.timeLastUpdate,
      max: max.timeLastUpdate
    });
  });

module.exports = router; 