const verify = require('./verify.handler');

module.exports = (router) => {

    router.get('/email/verify/:id', verify);

};