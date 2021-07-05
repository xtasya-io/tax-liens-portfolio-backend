const http = require("http");
const app = require("./app");

const port = process.env.PORT || "8000";
app.set("port", 8000);

const server = http.createServer(app);

server.listen(port, function () {
    console.info(`Server is up and running on port ${port}`);
});