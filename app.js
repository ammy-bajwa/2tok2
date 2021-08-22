const express = require("express");
const next = require("next");
const NextjsExpressRouter = require("./nextjs_express_router");
const Middleware = require("./middleware");
const httpServer = (express) => {
  return require("http").createServer(express);
};
class Server {
  constructor(port) {
    this.port = port;
    this.express = express();
    this.next = next({ dev: process.env.NODE_ENV !== "production" });
    this.middleware = new Middleware(this.express);
    this.router = new NextjsExpressRouter(this.express, this.next);
  }

  async start() {
    await this.next.prepare();
    await this.middleware.init();
    await this.router.init();
    this.server = httpServer(this.express);
    this.server.listen(this.port);
  }
}

module.exports = Server;
