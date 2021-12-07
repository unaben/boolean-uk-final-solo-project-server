const prisma = require("../../utils/database");

const User = prisma.user;

const getAll = async (req, res) => {
  try {
    const users = await User.findMany({
      include: {
        contact: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOneById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const userData = await User.findUnique({
      where: {
        id: userId,
      },
    });
    res.json(userData);
  } catch (error) {
    console.error("[ERROR] getAll: ", { error });
    res.status(500).json({ error });
  }
};

module.exports = {
  getAll,
  getOneById,
};
