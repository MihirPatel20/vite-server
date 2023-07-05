// generateAndStoreData.js

const EnergyData = require("../Models/energyData");

const generateAndStoreData = async (io) => {
  const newData = new EnergyData({
    device_id: Math.floor(Math.random() * 1000000).toString(), // Generate a random 6-digit device ID
    device_no: generateRandomString(8), // Generate a random alphanumeric device number with length 8
    status: generateRandomStatus(), // Generate random status object
  });

  // Set datetime field in the status object to the current time
  newData.status.datetime = getCurrentDateTime();

  try {
    await newData.save();
    console.log("Data generated and stored successfully");

    // Emit the newly generated data to all connected clients
    io.sockets.emit("newData", newData.status );
  } catch (error) {
    console.error("Failed to generate and store data:", error);
  }
};

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomStatus() {
  return {
    Vrn: Math.random() * 300,
    Vyn: Math.random() * 300,
    Vbn: Math.random() * 300,
    Vry: Math.random() * 300,
    Vyb: Math.random() * 300,
    Vbr: Math.random() * 300,
    Ir: Math.random() * 100,
    Iy: Math.random() * 100,
    Ib: Math.random() * 100,
    power_factor: Math.random() * 100,
    Frequency: Math.random() * 100,
  };
}

module.exports = generateAndStoreData;
