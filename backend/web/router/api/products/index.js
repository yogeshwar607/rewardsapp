// const bulkGetHandler = require('./bulkGet.handler');
const createHandler = require('./create.handler');
const getAllHandler = require('./getAll.handler');
const getHandler = require('./get.handler');
const updateHandler = require('./updateHandler');

module.exports = (router) => {

    router.post('/product/admin/create', createHandler);
    router.get('/product/admin/getAll/:_id', getAllHandler);
    router.get('/product/admin/get/:_id', getHandler);
    router.get('/product/admin/update', updateHandler);


};