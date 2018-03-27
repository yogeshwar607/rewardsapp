const getAllHandler = require('./getAll.handler');
const getHandler = require('./get.handler');
// const updateHandler = require('./update.handler');
const craeteHandler = require('./create.handler');
module.exports = (router) => {

    router.get('/order/getAll', getAllHandler);
    router.get('/order/get', getHandler);
    // router.post('/order/update', updateHandler);
    router.post('/order/create', craeteHandler);


};