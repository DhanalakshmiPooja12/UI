const crypto = require("crypto");

const ENCRYPTION_KEY = "as12der23uji78uy6tg67uj8ikju90uj"; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

exports.encrypt = (text) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + "@" + encrypted.toString("hex");
};

exports.decrypt = (text) => {
  let textParts = text.split("@");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join("@"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

exports.getRandomString = (length) => {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
  let result = "";
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

exports.decode = (b64string) => {
  let buf = "";
  if (typeof Buffer.from === "function") {
    // Node 5.10+
    buf = Buffer.from(b64string, "base64").toString();
  } else {
    // older Node versions
    buf = Buffer.from(b64string, "base64").toString();
  }
  return buf;
};

exports.encode = (argString) => {
  if (argString == null) {
    return undefined;
  }
  let buf = "";
  if (typeof Buffer.from === "function") {
    // Node 5.10+
    buf = Buffer.from(argString).toString("base64");
  } else {
    // older Node versions
    buf = Buffer.from(argString).toString("base64");
  }
  return buf;
};
