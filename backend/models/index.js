const mongoose = require('mongoose');

// Setting default SYSTEM PROMISE
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// loading all the models
const Customer = mongoose.model(
    'customer',
    require('./customer.schema')(Schema));
const Feedback = mongoose.model(
    'feedbacks',
    require('./feedbacks.schema')(Schema));
const Interest = mongoose.model(
    'interests',
    require('./interestsSchema.schema')(Schema));
const Category = mongoose.model('category', require('./category.schema')(Schema));

const Brand = mongoose.model('brand', require('./brand.schema')(Schema));
const Product = mongoose.model('product', require('./product.schema')(Schema));
const Order = mongoose.model('orders', require('./orders.schema')(Schema));
const User = mongoose.model('user', require('./user.schema')(Schema));
const Otp = mongoose.model('otp', require('./otp.schema')(Schema));

// registring models
const model = {
    Category,
    Customer,
    Feedback,
    Interest,
    Brand,
    Product,
    Order,
    User,
    Otp
};

module.exports = model;