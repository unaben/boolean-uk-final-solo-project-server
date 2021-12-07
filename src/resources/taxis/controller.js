const prisma = require("../../utils/database");

const Taxi = prisma.taxi;

const getAll = async (req, res) => {
  try {
    const registedTaxis = await Taxi.findMany({});

    res.json(registedTaxis);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOneById = async (req, res) => {
  const registedTaxiId = parseInt(req.params.id);
  try {
    const registedTaxiData = await Taxi.findUnique({
      where: {
        id: registedTaxiId,
      },
    });
    res.json(registedTaxiData);
  } catch (error) {
    console.error("[ERROR] getAll: ", { error });
    res.status(500).json({ error });
  }
};

const createOne = async (req, res) => {
  try {
    const newTaxi = await Taxi.create({
      data: {
        business_name: req.body.business_name,
        contact: {
          create: {
            street: req.body.street,
            postcode: req.body.postcode,
            phone: parseInt(req.body.phone),
          },
        },
      },
    });
    res.json({ data: newTaxi });
  } catch (error) {
    console.error("[ERROR] createOne: ", { error });
    res.json({ error });
  }
};

module.exports = {
  getAll,
  getOneById,
  createOne,
};
