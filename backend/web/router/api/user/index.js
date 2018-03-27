// const bulkGetHandler = require('./bulkGet.handler');
const createHandler = require('./create.handler');
const getAllHandler = require('./getAll.handler');
const loginHandler = require('./login.handler');
module.exports = (router) => {
    router.post('/user/create', createHandler);
    router.get('/user/getAll', getAllHandler);
    router.post('/user/login', loginHandler);

};