const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const generateAndStoreData = require("./Functions/generateAndStoreData");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();
const PORT = process.env.PORT || 8000;
const httpServer = createServer(app);
const io = new Server(httpServer);

// Allow requests from all origins
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/energy-monitoring-system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  // Call generateAndStoreData every 5 seconds
  // setInterval(generateAndStoreData, 5000);
});

// API routes
const graphController = require("./controllers/EnergyGraphsController");
app.get("/graph/:parameter", graphController.fetchGraphData);

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("Client connected");

  // Handle Socket.IO events here

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
