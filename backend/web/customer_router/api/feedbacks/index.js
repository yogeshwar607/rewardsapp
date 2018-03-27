const getAllHandler = require('./getAll.handler');
const getHandler = require('./get.handler');
const updateHandler = require('./update.handler');
module.exports = (router) => {

    router.get('/feedback/getAll', getAllHandler);
    router.get('/feedback/get', getHandler);
    router.post('/feedback/update', updateHandler);


};