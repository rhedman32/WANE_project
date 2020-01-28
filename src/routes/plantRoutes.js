const express = require('express');
const plantRouter = express.Router();
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:plantRoutes');

function router(nav) {
  plantRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'MyApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connect correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('plants');

          const plants = await col.find().toArray();
          res.render(
            'plantListView',
            {
              nav,
              title: 'My ApP',
              plants
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  plantRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017'
      const dbName = 'MyApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connect correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('plants');

          const plant = await col.findOne({_id:new ObjectID(id) });
          debug(plant)
          res.render(
            'plantView',
            {
              nav,
              title: 'My ApP',
              plant
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return plantRouter;
}

module.exports = router;
