const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.eamil = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
            .then(result => {
                console.log('User Added');
            })
            .catch(err => { console.log(err) });
    }

    addToCart(product) {
        const cartProductIndext = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        const updatedCartItems = [...this.cart.items];

        let newQuantity = 1;
        if (cartProductIndext >= 0) {
            newQuantity = this.cart.items[cartProductIndext].quantity + 1;
            updatedCartItems[cartProductIndext].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id), quantity: newQuantity
            });
        }

        const updatedCart = { items: updatedCartItems };
        const db = getDb();
        return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
    }
}

module.exports = User;