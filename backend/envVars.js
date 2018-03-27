process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    process.env.PORT = 4700;
    process.env.LOGGER_LEVEL = 'debug';
    process.env.DB = 'brandtouch-development';
    process.env.DB_URI = 'localhost';

    // process.env.DB_URI = 'sid:test@ds149905.mlab.com:49905';
    process.env.JWT_SECRET = 'brandtouch';
} else if (process.env.NODE_ENV === 'staging') {
    process.env.PORT = 4700;
    process.env.LOGGER_LEVEL = 'info';
    process.env.DB = 'brandtouch-staging';
    process.env.DB_URI = 'localhost';

    // process.env.DB_URI = 'sid:test@ds249545.mlab.com:49545';
    process.env.JWT_SECRET = 'brandtouch';
}