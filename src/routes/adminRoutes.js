const express = require('express');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017'
      const dbName = 'MyApp';

      
      res.send('inserting plants');
    });
  return adminRouter;
}

module.exports = router;