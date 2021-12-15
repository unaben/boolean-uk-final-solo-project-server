const prisma = require("../../utils/database");

const Taxi = prisma.taxi;

const getAll = async (req, res) => {
  try {
    const registedTaxis = await Taxi.findMany({
      include: {
        contact: true,
      },
    });

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
            phone: req.body.phone,
          },
        },
      },
    });
    res.json({ data: newTaxi });
  } catch (error) {
    console.error("[ERROR] createOne: ", { error });
    res.status(500).json({ error });
  }
};

const updateOneById = async (req, res) => {
  console.log({ params: req.params, body: req.body });

  const { id } = req.params;

  try {
    const taxiToUpdate = await Taxi.update({
      where: { id: parseInt(id) },
      data: {
        business_name: req.body.business_name,
        contact: {
          update: {
            postcode: req.body.postcode,
            street: req.body.street,
            phone: req.body.phone,
          },
        },
      },
      include: {
        contact: true,
      },
    });
    res.json({ data: taxiToUpdate });
  } catch (error) {
    console.error("[ERROR] updateOneById", { error });

    res.status(500).json({ error: error.message });
  }
};

const deleteOneTaxi = async (req, res) => {
  // const targetId = parseInt(req.params.id);
  try {
    const deleteTrips = await Taxi.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({ data: deleteTrips });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getOneById,
  createOne,
  updateOneById,
  deleteOneTaxi,
};
