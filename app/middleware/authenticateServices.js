const { HTML_STATUS_CODE, APP_SECRETE } = require("../../utils/constant");
const jwt = require("jsonwebtoken");
const userdao = require("../modelskavia/dao/userDao");
const customResponse = require("../../utils/customResponse");

async function isAuthenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (token == null) {
      throw customResponse.error(
        HTML_STATUS_CODE.UNAUTHORIZED,
        "Token not found in the request"
      );
    }
    token = token.replace(/^Bearer\s/, "");
    const userDetail = jwt.verify(token, APP_SECRETE);
    if (userDetail == null) {
      throw customResponse.error(
        HTML_STATUS_CODE.UNAUTHORIZED,
        "Invalid Token"
      );
    }
    let user = await userdao.getUserAndRole({ _id: userDetail._id });
    user = user ? user.toJSON() : {};
    req.user = user;
    next();
  } catch (error) {
    if (error.name && error.name.includes("TokenExpiredError") > -1) {
      res.status(401).json(error);
    } else {
      res.status(HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    }
  }
}
module.exports = isAuthenticate;
