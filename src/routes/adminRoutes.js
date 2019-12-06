const express = require('express');
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');

const plants = [
  {
    name: 'suku',
    type: 'succulent'
  },
  {
    name: 'brasavola',
    type: 'orchid'
  }
];
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017'
      const dbName = 'MyApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connect correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('plants').insertMany(plants);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;