const getAllHandler = require('./getAll.handler');
const getHandler = require('./get.handler');
const updateHandler = require('./updateHandler');

module.exports = (router) => {

    router.get('/order/admin/getAll', getAllHandler);
    router.get('/order/admin/get/:id', getHandler);
    router.post('/order/admin/update', updateHandler);


};