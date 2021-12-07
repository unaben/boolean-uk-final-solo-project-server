const prisma = require("../../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = prisma.user;

const SignUp = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const userToCreate = {
    first_name,
    last_name,
    email,
    password,
    role: "USER",
  };

  if (!userToCreate.email || !userToCreate.password) {
    res.status(400).json({ error: "Missing email or password." });
  }

  const hashedPassword = await bcrypt.hash(userToCreate.password, 8);

  console.log({
    plainPassword: userToCreate.password,
    securedPassword: hashedPassword,
  });
  console.log({ req: req.body });
  try {
    const user = await User.create({
      data: {
        ...userToCreate,
        password: hashedPassword,
        contact: {
          create: {
            street: req.body.street,
            postcode: req.body.postcode,
            phone: parseInt(req.body.phone),
          },
        },
      },
    });

    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "60days",
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    if (error.code === "P2002") {
      res.status(501).json({
        error: {
          ...error,
          message: "User already exists.",
        },
      });
    } else {
      res.status(500).json({ error });
    }
  }
};

const LogIn = async (req, res) => {
  const userCredentials = {
    ...req.body,
  };

  if (!userCredentials.email || !userCredentials.password) {
    res.status(400).json({ error: "Missing email or password." });
  }

  try {
    const user = await User.findUnique({
      where: {
        email: userCredentials.email,
      },
    });

    if (user) {
      const match = await bcrypt.compare(
        userCredentials.password,
        user.password
      );

      console.log({
        passwordFromRequest: userCredentials.password,
        passwordFromDatabase: user.password,
      });

      if (match) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "60days" }
        );
        res.status(201).json({ token });
      } else {
        res.status(401).json({ error: "Authentication failed." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
module.exports = {
  SignUp,
  LogIn,
};
