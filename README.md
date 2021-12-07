# boolean-uk-final-solo-project-server
Upstream for final solo projects

# Install Express and Prisma

# Inside your project folder.

# Run the following commands in the terminal:
- npm init -y
- npm i express morgan cors dotenv
- npm i -D nodemon prisma
- mkdir src
- touch src/index.js
- touch .env
- touch .gitignore

# Inside .env
NODE_ENV="development"
PORT=3030

DATABASE_URL="postgres://your-databaase-url-here?schema=exercise-name"
SHADOW_DATABASE_URL="postgres://your-shadow-database-url-here?schema=shadow"


# Inside .gitignore
node_modules
.env


# Inside package.json (replace "scripts")
"scripts": {
  "start": "nodemon src/index.js"
},


# Setup Express

# Inside src/index.js
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

/* SETUP MIDDLEWARE */

app.disable("x-powered-by")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

/* SETUP ROUTES */

app.get("*", (req, res) => {
  res.json({ ok: true })
})

/* START SERVER */

const port = process.env.PORT || 3030

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`)
})


# Run the following command in the terminal:

npm start
@here

# Setup Prisma

# Run the following command in the terminal:

npx prisma init

# The above command will create a prisma folder and a schema.prisma file.

Inside prisma/schema.prisma (add shadowDatabaseUrl and a model)
datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
 id       Int        @id @default(autoincrement())
 email    String     @unique
}


# Run the following commands in the terminal:
- npx prisma migrate dev --name init
- npm i @prisma/client
- touch prisma/seed.js
- mkdir src/utils
- touch src/utils/database.js

# Inside package.json (add)
"prisma": {
  "seed": "node prisma/seed.js"
},


# Inside prisma/seed.js
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function seed() {
  const users = [
    {
      email: "mike@mail.com",
    },
    {
      email: "nathan@mail.com",
    },
  ]

  const userPromises = users.map(async user => {
    return await prisma.user.create({ data: user })
  })

  try {
    await Promise.all(userPromises)
  } catch (error) {
    console.error("[ERROR] Seeding user model: ", {
      code: error.code,
      error: error.message,
    })

    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()


# Inside src/utils/database.js
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = prisma


# Seed your database

# Run the following command in the temrinal:

npx prisma db seed

# Prisma Studio

# Run the following command in a new temrinal:

npx prisma studio


# Step-by-step for implementing bcrypt and jsonwebtoken

- Install bcrypt and jsonwebtoken
- Use the bcrypt.hash method on the user's password before you store it in the database on "sign up"
- Use the bcrypt.compare method when validating a user's request to "sign in"
- Add a JWT_SECRET to your .env file (and restart the server)... import the environment variable to use with jwt methods
- Use the jwt.sign method to create a token, that contains user info as a payload, and send it in your responses (replacing the user object we've been working with)
- Store the token in state and localStorage
