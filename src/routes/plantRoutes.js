const express = require('express');
const plantRouter = express.Router();

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
      res.render(
        'plantListView',
        {
          nav,
          title: 'My ApP',
          plants
        }
      );
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