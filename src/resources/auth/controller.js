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
            phone: req.body.phone,
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

function protect(req, res, next) {
  console.log("INSIDE MIDDLEWARE: ", { headers: req.headers })

  const token = req.headers.authorization

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      res.status(401).json({ error: "Not Authorized" })
    }

    console.log({ payload })

    // Find the authenticated user in our DB
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    })

    console.log({ userInMiddleware: user })

    // Attach to request object in order to use in controllers
    req.user = user

    next()
  })
}
module.exports = {
  SignUp,
  LogIn,
  protect
};
