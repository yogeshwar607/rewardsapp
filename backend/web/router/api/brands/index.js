// const bulkGetHandler = require('./bulkGet.handler');
const createHandler = require('./create.handler');
const getAllHandler = require('./getAll.handler');
const getHandler = require('./get.handler');
const updateHandler = require('./updateHandler');

module.exports = (router) => {

    router.post('/brand/create', createHandler);
    router.get('/brand/getAll', getAllHandler);
    router.get('/brand/get/:_id', getHandler);
    router.get('/brand/update', updateHandler);
};