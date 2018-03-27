// const bulkGetHandler = require('./bulkGet.handler');
const createHandler = require('./create.handler');
const getAllHandler = require('./getAll.handler');

module.exports = (router) => {
    router.post('/user/create', createHandler);
    router.get('/user/getAll', getAllHandler);

};