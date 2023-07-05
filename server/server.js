// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { faker } = require("@faker-js/faker");
const { getCurrentTime } = require("./Functions/getCurrentTime");

const app = express();
const PORT = process.env.PORT || 8000;

// Allow requests from all origins
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create HTTP server
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:4000", // Replace with your client's URL
  },
});

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
  setInterval(() => generateAndStoreData(io), 5000);
});



io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// API routes
const graphController = require("./controllers/EnergyGraphsController");
const generateAndStoreData = require("./Functions/generateAndStoreData");

app.get("/graph/:parameter", graphController.fetchGraphData);

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
