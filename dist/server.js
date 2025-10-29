"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Check the README.md file for instructions to the exercise
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const FILE_PATH = path_1.default.join(__dirname, "../dist/images", "veryhappydog.jpg");
const server = http_1.default.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Welcome to my sever");
        return;
    }
    if (req.url === "/view-image" && req.method === "GET") {
        fs_1.default.readFile(FILE_PATH, (err, data) => {
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
});
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error("Missing port!");
}
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
