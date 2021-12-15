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
Deploying your backend with Heroku, step by step

Heroku Dashboard Config
1. Go to https://dashboard.heroku.com/ and log in
2. Click New -> Create new app in the top right
3. Enter a name (this is what will be your production app URL: e.g. entering boolean-checkers will result in a URL of https://boolean-checkers.herokuapp.com
4. Set Region to Europe
5. Click Create app
6. In the Deployment method section, click Connect to GitHub
7. Enter the name of the repository and then click Search
8. The repo will show up, click Connect
9. In the Automatic deploys section, make sure the branch is set to main and click Enable Automatic Deploys
10. Scroll all the way up and click Settings
11. In the Config Vars section, click Reveal Config Vars and enter your environment variable key & value for your database - you don't need any other variables, just the db
12. In the Buildpacks section, click Add buildpack and choose nodejs

Code config
1. Add a new script to your package.json file called something like prod-start, with a value of node src/index.js (if your app's entry point is called app.js, use that in place of index.js)
2. Important: make sure the prisma dependency is in the "dependencies" object, NOT "devDependencies" - if it is, move it into dependencies
3. Create a new file in the root of your project called Procfile
4. In that Procfile, add the following (replace prod-start for whatever you chose as your new script name in package.json):
release: npx prisma migrate deploy
web: npm run prod-start

5. Git add, commit, push
6. Go back to the app you created in Heroku and make sure you're in the Overview tab; wait for a "Build in progress..." message
7. Click "View build progress" and follow it until it says "Done"
8. Click More in the top right and then View logs
9. Wait for State changed from starting to up to appear in the log, then click Open app in the top right
@here is the recording of the session: https://drive.google.com/file/d/1Ynyf0tL5QSy_dS3RhJsJXCxow7_jPFTq/view?usp=sharing
