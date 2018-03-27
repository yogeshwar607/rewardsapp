const getHandler = require('./get.handler');

module.exports = (router) => {


    router.get('/customerDetails/get', getHandler);


};