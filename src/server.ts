// Check the README.md file for instructions to the exercise
import http from "http";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const FILE_PATH = path.join(__dirname, "../dist/images", "veryhappydog.jpg");

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("Welcome to my sever");
      return;
    }

    if (req.url === "/view-image" && req.method === "GET") {
      fs.readFile(FILE_PATH, (err, data) => {
        if (err) {
          res.writeHead(500, { "content-type": "text/plain" });
          res.end(`Error reading file: ${err}`);
          return;
        }
        res.writeHead(200, { "content-type": "image/jpeg" });
        res.end(data);
      });
      return;
    }
  },
);

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("Missing port!");
}

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
