import { createServer } from "node:http";
import next from "next";

const port = Number(process.env.PORT || 3000);
const hostname = "0.0.0.0";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port number.");
}

const app = next({ dev: false, hostname, port });
await app.prepare();
const handle = app.getRequestHandler();
const server = createServer((request, response) => {
  handle(request, response).catch((error) => {
    console.error("Request failed", error);
    if (!response.headersSent) response.statusCode = 500;
    response.end("Internal server error");
  });
});

server.listen(port, hostname, () => {
  console.log(`DAISA is listening on ${hostname}:${port}`);
});