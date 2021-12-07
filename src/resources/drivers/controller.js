const prisma = require("../../utils/database");

const Driver = prisma.driver;

const getAll = async (req, res) => {
  try {
    const drivers = await Driver.findMany({});

    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOneById = async (req, res) => {
  const driverId = parseInt(req.params.id);
  try {
    const driverData = await Driver.findUnique({
      where: {
        id: driverId,
      },
    });
    res.json(driverData);
  } catch (error) {
    console.error("[ERROR] getAll: ", { error });
    res.status(500).json({ error });
  }
};

module.exports = {
  getAll,
  getOneById,
};
