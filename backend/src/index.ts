//Jake: 6be1f6fd29c60b6b3fe333975be9d052-8a084751-4aa0e14a

import formData from "form-data";
import Mailgun from "mailgun.js";
import { PrismaClient } from "@prisma/client";

const key = "6be1f6fd29c60b6b3fe333975be9d052-8a084751-4aa0e14a";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || key,
});

mg.messages
  .create("sandbox3fdc655a61914ad2a1a5e8c10733daa1.mailgun.org", {
    from: "Excited User <mailgun@sandbox3fdc655a61914ad2a1a5e8c10733daa1.mailgun.org>",
    to: ["normanqian@gmail.com"],
    subject: "Hello2",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>",
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)); // logs any error

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
