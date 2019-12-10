const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {


  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch(err => debug(err));
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/plants', title: 'Plants' },
  { link: '/cars', title: 'Cars' }
];
const plantRouter = require('./src/routes/plantRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/plants', plantRouter);
app.use('/admin', adminRouter);

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
