const getAllHandler = require('./getAll.handler');
const getHandler = require('./get.handler');
const updateHandler = require('./updateHandler');
const createHandler = require('./create.handler');

module.exports = (router) => {
    router.post('/interest/create', createHandler);

    router.get('/interest/getAll', getAllHandler);
    router.get('/interest/get', getHandler);
    router.post('/interest/update', updateHandler);


};