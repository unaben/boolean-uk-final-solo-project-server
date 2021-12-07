const prisma = require("../../utils/database");

const Contact = prisma.contact;

const getAll = async (req, res) => {
  try {
    const contacts = await Contact.findMany({});

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOneById = async (req, res) => {
  const contactId = parseInt(req.params.id);
  try {
    const contactData = await Contact.findUnique({
      where: {
        id: contactId,
      },
    });
    res.json(contactData);
  } catch (error) {
    console.error("[ERROR] getAll: ", { error });
    res.status(500).json({ error });
  }
};

module.exports = {
  getAll,
  getOneById,
};
