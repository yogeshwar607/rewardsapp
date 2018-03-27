const AppError = rootRequire('commons').ERROR;
const { userDAO } = rootRequire('commons').DAO;
const { jwtSecret } = rootRequire('config').server;

const jwt = require('jsonwebtoken');
// const Schema = require('mongoose').Schema;

function authorization(router) {
  router.use((req, res, next) => {
    // validate user and X-ACCESS-TOKEN
    const token = req.get('X-ACCESS-TOKEN');
    const clientId = req.get('X-CLIENT-ID');
    if (!token) return next(new AppError.AuthorizationError('X-ACCESS-TOKEN header is required'));
    if (!clientId) return next(new AppError.AuthorizationError('X-CLIENT-ID header is required'));
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        logger.error(`The error while decoding token ${err}`);
        return next(err);
      }
      userDAO().getUserPrivileges({ _id: decoded.sub }).then((user) => {
        if (!user) return next(new AppError.AuthorizationError('Authentication failed. User not found.'));
        const clientAccessIds = user.client_access.map((client) => {
          return client.id;
        });
        if (clientAccessIds.indexOf(clientId) === -1) {
          return next(new AppError.AuthorizationError('User Not Authorised to access this client.'));
        }

        // TODO: change the system._id to real system id
        req.context = {
          user,
          clientId,
          clientAccessIds,
          system: {
            _id: user._id,
          },
        };

        return next();
      }).catch((err) => {
        logger.error(`The error while fetching user privileges ${err}`);
        return next(err);
      });
    });
  });
}

module.exports = authorization;