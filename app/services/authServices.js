const _ = require("lodash");
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");
const communicationHelper = require("../../utils/communicationHelper");
const communicationUtility = require("../../utils/communication");
const utils = require("../../utils/utilities");
const customError = require("../../utils/customResponse");
const {
  HTML_STATUS_CODE,
  APP_SECRETE,
  TOKEN_TIMEOUT,
} = require("../../utils/constant");
const userdao = require("../modelskavia/dao/userDao");
const moment = require("moment-timezone");
const { getMapping } = require("./mappingServices");

// const authService = {
//   async logIn(userCredentials) {
//     logger.debug("userCredentials---------" + JSON.stringify(userCredentials));
//     try {
//       if (
//         userCredentials == null ||
//         userCredentials.email == "" ||
//         userCredentials.password == ""
//       ) {
//         return Promise.reject(
//           customError.error(
//             HTML_STATUS_CODE.INVALID_DATA,
//             "Please enter vaild e-mail id and password"
//           )
//         );
//       }
//       let [userData] = await userdao.getOne({
//         $or: [
//           { email: userCredentials.email },
//           { name: userCredentials.email },
//           { userId: userCredentials.email },
//         ],
//       });
//       let role;
//       if (_.isEmpty(userData)) {
//         logger.debug("Invalid user");
//         return Promise.reject(
//           customError.error(HTML_STATUS_CODE.INVALID_DATA, "User not found.")
//         );
//       } else {
//         role = userData.roleData.name;
//       }

//       if (!userData.password) {
//         logger.debug("Password is Incorrect");
//         return Promise.reject(
//           customError.error(
//             HTML_STATUS_CODE.INVALID_DATA,
//             "Please enter valid password"
//           )
//         );
//       }
//       if (userCredentials.password !== utils.decrypt(userData.password))
//         return Promise.reject(
//           customError.error(
//             HTML_STATUS_CODE.INVALID_DATA,
//             "Please enter valid password."
//           )
//         );

//       userData = _.pick(userData, [
//         "name",
//         "userId",
//         "email",
//         "role",
//         // "depart",
//         "password",
//       ]);
//       let token = jwt.sign(userData, APP_SECRETE, { expiresIn: TOKEN_TIMEOUT });
//       return {
//         token,
//         userName: userData.name ? userData.name : "",
//         email: userData.email,
//         userId: userData.userId,
//         role: role,
//         // department: userData.depart,
//         loginDateAndTime: userData.loginDateAndTime
//           ? userData.loginDateAndTime
//           : moment.tz()._d,
//       };
//     } catch (err) {
//       logger.error("logIn Error " + err);
//       reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
//     }
//   },
//   async forgotPassword(emailData) {
//     try {
//       if (emailData == null) {
//         return Promise.reject(
//           customError.error(HTML_STATUS_CODE.INVALID_DATA, "Invalid User Data.")
//         );
//       }
//       let userData = undefined;
//       if (emailData.email.indexOf("@") != -1)
//         userData = await userdao.getOne({
//           email: emailData.email,
//         });
//       else
//         userData = await userdao.getOne({
//           name: emailData.email,
//         });
//       userData = userData[0];
//       if (userData == null) {
//         return Promise.reject(
//           customError.error(
//             HTML_STATUS_CODE.INVALID_DATA,
//             "Email does not exist."
//           )
//         );
//       }
//       const otp = utils.getRandomString(6);
//       const a = await userdao.update(
//         {
//           _id: userData._id,
//         },
//         {
//           otp: otp,
//         }
//       );

//       let emailOptions = communicationHelper.sendForgotOTPEmail(
//         userData.email,
//         userData.name,
//         otp
//       );
//       if (userData.role == ROLE.SUPERADMIN) emailOptions["superAdmin"] = true;

//       communicationUtility.sendMail(emailOptions);
//       return true;
//     } catch (error) {
//       logger.error("forgotPassword Error" + error);
//       return Promise.reject(
//         customError.error(
//           HTML_STATUS_CODE.INTERNAL_ERROR,
//           error.message,
//           error.stack
//         )
//       );
//     }
//   },
//   async resetPassword(userDetail) {
//     try {
//       if (
//         userDetail == null ||
//         userDetail.otp == null ||
//         userDetail.password == null
//       ) {
//         return Promise.reject(
//           customError.error(HTML_STATUS_CODE.INVALID_DATA, "Invalid User Data.")
//         );
//       }
//       const userData = await userdao.getByToken(userDetail.otp);
//       if (!userData) {
//         return Promise.reject(
//           customError.error(
//             HTML_STATUS_CODE.INVALID_DATA,
//             "Please enter correct OTP and try again."
//           )
//         );
//       }
//       const hashedPassword = utils.encrypt(userDetail.password);
//       if (hashedPassword == null) {
//         return Promise.reject(
//           customError.error(
//             HTML_STATUS_CODE.INTERNAL_ERROR,
//             "Something went wrong with password hashing"
//           )
//         );
//       }
//       const b = await userdao.update(
//         {
//           _id: userData._id,
//         },
//         {
//           password: hashedPassword,
//         }
//       );
//       return true;
//     } catch (error) {
//       logger.error("resetPassword Error" + error);
//       return Promise.reject(
//         customError.error(
//           HTML_STATUS_CODE.INTERNAL_ERROR,
//           error.message,
//           error.stack
//         )
//       );
//     }
//   },
// };

const authService = {
  async logIn(userCredentials) {
    logger.debug("userCredentials---------" + JSON.stringify(userCredentials));
    try {
      if (
        !userCredentials ||
        !userCredentials.email ||
        !userCredentials.password
      ) {
        return Promise.reject(
          customError.error(
            HTML_STATUS_CODE.INVALID_DATA,
            "Please enter a valid email and password"
          )
        );
      }

      // Hardcoded default user
      const defaultUser = {
        email: "admin@example.com",
        password: "Admin@123", // Ensure this is securely hashed if used in production
        name: "Admin User",
        userId: "admin123",
        role: "Admin",
      };

      let userData;

      // Check if user matches default user credentials
      if (
        userCredentials.email === defaultUser.email &&
        userCredentials.password === defaultUser.password
      ) {
        userData = { ...defaultUser };
      } else {
        // Fetch from database if not default user
        let [dbUserData] = await userdao.getOne({
          $or: [
            { email: userCredentials.email },
            { name: userCredentials.email },
            { userId: userCredentials.email },
          ],
        });

        if (_.isEmpty(dbUserData)) {
          logger.debug("Invalid user");
          return Promise.reject(
            customError.error(HTML_STATUS_CODE.INVALID_DATA, "User not found.")
          );
        }

        if (!dbUserData.password || userCredentials.password !== utils.decrypt(dbUserData.password)) {
          return Promise.reject(
            customError.error(
              HTML_STATUS_CODE.INVALID_DATA,
              "Please enter a valid password."
            )
          );
        }

        userData = _.pick(dbUserData, [
          "name",
          "userId",
          "email",
          "role",
        ]);
      }

      let token = jwt.sign(userData, APP_SECRETE, { expiresIn: TOKEN_TIMEOUT });
      return {
        token,
        userName: userData.name || "",
        email: userData.email,
        userId: userData.userId,
        role: userData.role,
        loginDateAndTime: moment.tz()._d,
      };
    } catch (err) {
      logger.error("logIn Error " + err);
      return Promise.reject(
        customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err.message)
      );
    }
  },
};


module.exports = authService;
