const { auth } = require('express-oauth2-jwt-bearer');
const config = require('../config');

//middleware validation
const checkJwt = auth({
  audience: config.auth0.audience,
  issuerBaseURL: `https://${config.auth0.domain}/`,
  tokenSigningAlg: 'RS256'
});

module.exports = { checkJwt };