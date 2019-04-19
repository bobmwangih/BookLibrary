const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql=require('mssql');
// list of packages used

const app = express();
const port = process.env.PORT || 3000;

const config = {    //mssql configurations
  user: 'Bob',
  password: 'Mathenge85',
  server: 'section6.database.windows.net',
  database: 'BOBlibrary',
  pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
  },
  options:{
    encrypt:true
  }
};


sql.connect(config).catch(err=>debug(err));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(morgan('tiny'));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
// app.set('view engine','pug');  //when using pug template
app.set('view engine', 'ejs');     //when using ejs template



const nav=[{title:'Book',link:'/books'}, {title:'Author',link:'/authors'}];

const bookRouter= require('./src/routes/bookRoutes')(nav);
app.use('/books',bookRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html')); //rendering a plain html file
  res.render('index', { nav: [{title:'Books',link:'/books'}, {title:'Authors',link:'/authors'}], title: 'GAME OF BOOKS!' });
});

app.listen(port, () => {
  debug(`listening to port: ${chalk.red(port)}`);
});