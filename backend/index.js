// set environment variables first
require("appdynamics").profile({
    controllerHostName: 'city2017112619545017.saas.appdynamics.com',
    controllerPort: 443,

    // If SSL, be sure to enable the next line
    controllerSslEnabled: true,
    accountName: 'city2017112619545017',
    accountAccessKey: 'red9qsrc32l3',
    applicationName: 'newBrand',
    tierName: 'BrandTouch',
    nodeName: 'process' // The controller will automatically append the node name with a unique number
});
require('./envVars');

// set globals
require('./globals');

const { mongoose, server } = require('./config');

mongoose.init();

// Start API Server
require('./web/server');

logger.info(`Environment: ${server.env}`);

// uncaughtException Exception notification sent to Slack channel
process.on('uncaughtException', (err) => {
    logger.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
});