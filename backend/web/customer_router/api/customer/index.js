const getAllHandler = require('./getAll.handler');
const getHandler = require('./get.handler');
const createHandler = require('./create.handler');
const loginHandler = require('./login.handler');
const updateHandler = require('./update.handler');
const deleteAddress = require('./deleteAddress.handler');
module.exports = (router) => {

    // router.get('/customer/getAll/:pageNo', getAllHandler);
    router.get('/customer/get/:id', getHandler);
    router.post('/customer/create', createHandler);
    router.post('/customer/login', loginHandler);
    // router.post('/customer/login', loginHandler);
    router.post('/customer/update', updateHandler);
    router.post('/customer/delete/address', deleteAddress);



};