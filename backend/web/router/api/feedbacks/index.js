const getAllHandler = require('./getAll.handler');
const getHandler = require('./get.handler');

module.exports = (router) => {

    router.get('/feedback/admin/getAll', getAllHandler);
    router.get('/feedback/admin/get/:id', getHandler);


};