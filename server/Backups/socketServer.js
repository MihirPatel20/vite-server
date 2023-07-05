const { Server } = require("socket.io");
const { createServer } = require("http");
const { faker } = require("@faker-js/faker");
const { getCurrentTime } = require("./Functions/getCurrentTime");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:4000", // Replace with your client's URL
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send a random text every 10 seconds
  const interval = setInterval(() => {
    const randomText = faker.hacker.phrase();
    const currentTime = getCurrentTime();
    socket.emit("ping", { serverSentTime: currentTime, text: randomText });
  }, 10000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const port = process.env.PORT || 8000;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
