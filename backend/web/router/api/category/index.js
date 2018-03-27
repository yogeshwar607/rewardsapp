const getAllHandler = require('./getAll.handler');

const createHandler = require('./create.handler');

module.exports = (router) => {
    router.post('/category/create', createHandler);

    router.get('/category/getAll', getAllHandler);



};