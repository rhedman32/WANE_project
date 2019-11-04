const express = require('express');
const plantRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:plantRoute');

function router(nav) {
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
  plantRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const result = await request.query('select * from plants');
        res.render(
          'plantListView',
          {
            nav,
            title: 'My ApP',
            plants: result.recordset
          });
      });
    });
  plantRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'plantView',
        {
          nav,
          title: 'My ApP',
          plant: plants[id]
        }
      );
    });
  return plantRouter;
}

module.exports = router;