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
        const { recordset } = await request.query('select * from plants');
        res.render(
          'plantListView',
          {
            nav,
            title: 'My ApP',
            plants: recordset
          });
      });
    });

  plantRouter.route('/:id')
    .all((req, res, next) =>{
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = 
        await request.input('id', sql.Int, id)
          .query('select * from plants where id = @id');
        [req.plant] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render(
        'plantView',
        {
          nav,
          title: 'My ApP',
          plant: req.plant
        }
      );      
    });
  return plantRouter;
}

module.exports = router;