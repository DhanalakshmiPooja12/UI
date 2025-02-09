var request = require("request");
var nodemailer = require("nodemailer");
var _ = require("lodash");
const logger = require("../utils/logger");

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "wimerareport@gmail.com",
    pass: "90", //'aaaa@789!'
  },
});

exports.sendSMS = function (mobileNumber, messageString) {
  const options = {
    method: "GET",
    url: "http://example.com",
    qs: {
      method: "SendMessage",
      send_to: mobileNumber,
      msg: messageString,
      msg_type: "TEXT",
      loginid: "<Username>",
      auth_scheme: "plain",
      password: "Abc@12345",
      v: "1.1",
      format: "text",
    },
    headers: {
      "Postman-Token": "<POSTMAN TOKEN>",
      "cache-control": "no-cache",
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    logger.debug(error + body);
  });
};

exports.sendMail = function (mailOptions) {
  mailOptions.from = "wimerareport@gmail.com";
  if (mailOptions.bcc) {
    mailOptions.bcc.push("info@wimerareport.org");
    mailOptions.bcc.push("auditbead@wimerareport.org");
    mailOptions.bcc.push("a@gmail.com");
  } else {
    mailOptions.bcc = ["info@wimerareport.org"];
    mailOptions.bcc = ["auditbead@wimerareport.org"];
    mailOptions.bcc = ["a@gmail.com"];
  }

  if (!_.isNil(mailOptions.superAdmin)) {
    delete mailOptions.superAdmin;
    smtpTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.debug(error);
      } else {
        logger.debug("Mail sent: " + info);
      }
    });
  } else {
    smtpTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.debug(error);
      } else {
        logger.debug("Mail sent: " + info);
      }
    });
  }
};
