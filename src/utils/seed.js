const dbClient = require("./database");

async function seed() {
  // If user has no relations to delete, just deleteMany like normal
  await dbClient.user.deleteMany();

  // If user has related records to delete, use a transaction to execute both deletes at the same time
  // https://www.prisma.io/docs/concepts/components/prisma-client/crud#cascading-deletes-deleting-related-records
  // const deleteUsers = dbClient.user.deleteMany();
  // const deleteProfiles = dbClient.profile.deleteMany();
  // await dbClient.$transaction([deleteProfiles, deleteUsers]);

  // const users = [];

  // Create 100 users
  // let i = 100;
  // while (i-- > 0) {
  //   const createdUser = await dbClient.user.create({
  //     data: {
  //       first_name: "Mark",
  //       last_name: "Lewis",
  //       email: "lewis@yahoo.com",
  //       password: "123456",
  //       role: "USER",
  //       contact: {
  //         create: {
  //           street: "4 Lewis Lane",
  //           postcode: "SA4 7TV",
  //           phone: parseInt("07643653428"),
  //         },
  //       },
  //     },
  //   });

  //   users.push(createdUser);
  // }

  // Create a single user
  const user = await dbClient.user.create({
    data: {
      first_name: "Mike",
      last_name: "Lewis",
      email: "mike@mail.com",
      password: "Quarty",
      role: "ADMIN",
      contact: {
        create: {
          street: "12 Mike Quarters",
          postcode: "BS4 7TV",
          phone: parseInt("07643553028"),
        },
      },
    },
  });

  // console.log("Created:", user, users);
  console.log("Created:", user);
}

seed()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await dbClient.$disconnect();
    process.exit(0);
  });

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// async function seed() {
//   const users = [
//     {
//       name: Mike,
//       email: "mike@mail.com",
//       password: Quarty,
//       role: Admin,
//       contactId: 3,
//     },
//     {
//       name: Nathan,
//       email: "nathan@mail.com",
//       password: Quarty,
//       role: user,
//       contactId: 6,
//     },
//   ];

//   const userPromises = users.map(async (user) => {
//     return await prisma.user.create({ data: user });
//   });

//   try {
//     await Promise.all(userPromises);
//   } catch (error) {
//     console.error("[ERROR] Seeding user model: ", {
//       code: error.code,
//       error: error.message,
//     });

//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seed();
