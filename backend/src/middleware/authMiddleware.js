const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
const {UnauthorizedError} = require("../customErrors");
const statusCodes = require("../statusCodes");

/*
Check if token in Authorization header is actually valid and not expired
    - if it is valid then the decoded payload of the JWT is available in req.user afterwards
    - throws 401 error otherwise
 */
const checkAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        throw new UnauthorizedError("authorization header is missing in request header")
    }
    const authHeaderSplit = req.headers.authorization.split(' ');
    if (authHeaderSplit.length !== 2) {
        throw new UnauthorizedError("authorization header was there but has wrong format, use following format 'Bearer access_token_string'")
    }

    const accessToken = authHeaderSplit[1];
    // from https://cognito-idp.us-east-1.amazonaws.com/us-east-1_rYJXZfify/.well-known/jwks.json
    const jwk = {
        "alg": "RS256",
        "e": "AQAB",
        "kid": "gdsQS1C/9HlBNqqBSBV8aI4d5V7ZwJNMiBvt/echwqU=",
        "kty": "RSA",
        "n": "0Y2LOr0lL6zcCj14i0Q67cDdgYqJM_5eJXGzwWDwmIFG4lwWGzIteRd4t7LRI4aGK8PDgVHK5gRAJ8AvvewuBWixKREdDtLUwP4zfizPiUCtv78bJK6JC-eL3Oka4HrRhETDZwjhGPQc28MZAJYwrJoBmLjhuOr0YYYORdkWuH4LPA3oU1t_7QadfVCT3kKdbHWce_DzgNhhRRjzUBaHS-dD2ldoRnpEoSuoXNskHlm_LaogAceMOWnby8yhYGYZSI2cQfAOz6_mVB1emeLAIdGui_QyHCGWXbftPkA1v1i_MXFDGYgGcoqPWWtBCVUH1MctvPcOelvgnh6_yKlt_Q",
        "use": "sig"
    };

    const pem = jwkToPem(jwk);
    jwt.verify(accessToken, pem, function (err, decoded) {
        if (err) {
            err.statusCode = statusCodes.UNAUTHORIZED;
            throw err;
        }
        req.user = decoded;
    });
    next();
}

module.exports = {
    checkAuth
}