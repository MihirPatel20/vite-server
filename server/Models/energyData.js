const mongoose = require("mongoose");

const energyDataSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true,
    },
    device_no: {
      type: String,
      required: true,
    },
    status: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const EnergyData = mongoose.model("EnergyData", energyDataSchema);

module.exports = EnergyData;
