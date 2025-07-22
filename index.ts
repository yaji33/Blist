import WebServer from "@blockless/sdk-ts/dist/lib/web";
const server = new WebServer();
server.statics("dist", "/");
server.start();
