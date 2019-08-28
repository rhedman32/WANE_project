const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const nav = [
  { link: '/plants', title: 'Plants' },
  { link: '/cars', title: 'Cars' }
];
const plantRouter = require('./src/routes/plantRoutes')(nav);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/plants', plantRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/plants', title: 'Plants' },
        { link: '/cars', title: 'Cars' }],
      title: 'My ApP'
    }
  );
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green(port)}`);
});
