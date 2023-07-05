const EnergyData = require("../Models/energyData");

const fetchGraphData = async (req, res) => {
  const { parameter } = req.params;
  try {
    const data = await EnergyData.find(
      {},
      { [`status.${parameter}`]: 1, "status.datetime": 1 }
    );
    const labels = data.map((item) => item.status.datetime);
    const parameterValues = data.map((item) => item.status[parameter]);
    res.json({ labels, data: parameterValues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch graph data" });
  }
};

module.exports = {
  fetchGraphData,
};
