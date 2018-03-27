/**
 * Setting basic configurations for Express and only expose app (express) object
 * for further processing.
 */
const express = require('express');
const app = express();

module.exports = () => {
    // disabled for security reasons
    app.disable('x-powered-by');
    const path = process.env.PWD + '/uploads';
    console.log(path);
    app.use("/", express.static(path));
    console.log(path);

    return app;
};