const express = require('express');
const path = require('path');

const expressHbs = require('express-handlebars');

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

app.use(adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
});

app.listen(3000);
