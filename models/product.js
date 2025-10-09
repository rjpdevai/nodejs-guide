const getDb = require('../util/database').getDb;

class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        const db = getDb();
        return db.collection('products').insertOne(this)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }
    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }
    static findById(prodId) {
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
            .then(product => {
                return product;
            })
            .catch(err => console.log(err));
    }
}

module.exports = Product;