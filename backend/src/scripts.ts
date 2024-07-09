import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("x");
  const allUsers = await prisma.userName.findMany();
  console.log(allUsers);
  console.log("y");

  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    console.log("a");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

console.log("z");

/*
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.userName.findMany();
  return allUsers;
}

await main()
  .then(async (r) => {
    console.log("abc");
    console.log(r);
    await prisma.$disconnect();
    console.log("def");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
*/
