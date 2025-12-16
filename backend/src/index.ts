import http from "http";
import app from "./app";
import { config } from "./config";

let server: http.Server;

async function startServer() {
  try {
    server = http.createServer(app);
    server.listen(config.PORT, () => {
      console.log(
        `Server is listening on port:${config.PORT} in ${config.NODE_ENV} mode.`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
