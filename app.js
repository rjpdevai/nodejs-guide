const express = require('express');
const path = require('path');
const errorController = require('./controllers/error');
const expressHbs = require('express-handlebars');

const db = require('./util/database');

const app = express();

//app.engine('hbs', expressHbs.engine({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));
//app.set('view engine', 'hbs');

// app.set('view engine', 'pug');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
