const express = require('express');
const plantRouter = express.Router();

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
    res.render('plants',
      {
        nav: [{ link: '/plants', title: 'Plants' },
          { link: '/cars', title: 'Cars' }],
        title: 'My ApP',
        plants
      });
  });

plantRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.render(
      'plantView',
      {
        nav: [{ link: '/plants', title: 'Plants' },
          { link: '/cars', title: 'Cars' }],
        title: 'My ApP',
        plant: plants[id]
      });
  });

module.exports = plantRouter;