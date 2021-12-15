const prisma = require("../../utils/database");
const Trip = prisma.trip;

const getAll = async (req, res) => {
  try {
    const trips = await Trip.findMany({
      include: {
        user: true,
        driver: true,
      },
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ Error });
  }
};

const getOneById = async (req, res) => {
  console.log({ param: req.params });
  const tripId = parseInt(req.params.id);
  try {
    const tripData = await Trip.findUnique({
      where: {
        id: tripId,
      },
    });
    res.json(tripData);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createOne = async (req, res) => {
  const { pickup_postcode, pickup_time, dropoff_postcode, status } = req.body;
  console.log({ body: req.body });
  const tripToCreate = {
    pickup_postcode,
    pickup_time,
    dropoff_postcode,
    status,
  };
  try {
    const newTrip = await Trip.create({
      data: {
        ...tripToCreate,
        pickup_time: new Date(pickup_time),
        user: {
          connect: { id: req.body.userId },
        },
        driver: {
          connect: { id: req.body.driverId },
        },
      },
    });
    res.json({ data: newTrip });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const updateOneById = async (req, res) => {
  console.log({ params: req.params, body: req.body });

  const { id } = req.params;

  try {
    const tripToUpdate = await Trip.update({
      where: { id: parseInt(id) },
      data: { ...req.body },
    });
    res.json({ data: tripToUpdate });
  } catch (error) {
    console.error("[ERROR] updateOneById", { error });

    res.status(500).json({ error: error.message });
  }
};

const deleteOneTrip = async (req, res) => {
  // const targetId = parseInt(req.params.id);
  try {
    const deleteTrips = await Trip.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({data: deleteTrips });
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
  deleteOneTrip,
};
