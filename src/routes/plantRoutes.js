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

plantRouter.route('/single')
  .get((req, res) => {
    res.send('hello single plant')
  });

module.exports = plantRouter;