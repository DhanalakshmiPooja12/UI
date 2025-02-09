const http = require("http");
const server = require("./listener/server");
const  serverinit = require('./app/init/init');
const {PORT} = require("./utils/constant")
const logger = require("./utils/logger")

serverinit.serverinit();

async function init() {
  const app = http.createServer(server);
  app.listen(PORT,()=>{
    logger.debug(`server is running at ${PORT}`)
  });
}
init();

module.exports = init;
