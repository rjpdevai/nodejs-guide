const express = require('express');
const path = require('path');


const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('68e8a0f89c4ec9c239c64cce')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000, () => {
        // const user = new User('ritesh', 'rjp@test.com');
        // user.save()
        //     .then(newUser => {
        //         console.log(newUser + ' is created');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

        console.log('Server is running on http://localhost:3000');
    });
});
