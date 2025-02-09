const constant = require("./../utils/constant");
const utils = require("../utils/utilities");

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

exports.sendWelcomeMessageEmail = function (toEmail, name, ipaddress) {
  let now = new Date().toLocaleString("en-US", { timeZone: timezone });
  now = new Date(now);

  return {
    to: toEmail, // list of receivers
    subject: "Welcome to Wimera Systems Pvt.Ltd", // Subject line
    text:
      "Hello " +
      name +
      "Your Password has been changed successfully, Please Log in to your account for further operations.",
    html:
      "Hello " +
      name +
      ",<br/><br/>" +
      "You have successfully loggedIn from IP: " +
      ipaddress +
      "at " +
      utils.convert24To12Hour(now.getHours() + ":" + now.getMinutes()) +
      " <br />" +
      "If you have any concerns or queries, we’re happy to help. Please reach out to us at info@wimerasys.com.</p>" +
      "<p><b>Regards,</b></p>" +
      "<p><b>Team Wimera Systems Pvt.Ltd</b></p>", // html body
  };
};

exports.sendForgotOTPEmail = function (toEmail, name, otp) {
  return {
    to: toEmail, // list of receivers
    subject: "Forgot Password ", // Subject line
    text:
      "Hello " +
      name +
      "Your Password has been changed successfully, Please Log in to your account for further operations.",
    html:
      "Hello " +
      name +
      ",<br/><br/>" +
      "The OTP for reset password is: <b>" +
      otp +
      "</b> <br /> <br />" +
      "If you have any concerns or queries, we’re happy to help. Please reach out to us at info@wimerasys.com.</p>" +
      "<p><b>Regards,</b></p>" +
      "<p><b>Team Wimera Systems Pvt.Ltd</b></p>", // html body
  };
};
