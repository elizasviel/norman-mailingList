import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/users", async (req, res) => {
  const prisma = new PrismaClient();
  async function main() {
    await prisma.user.create({
      data: {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      },
    });

    const allUsers = await prisma.user.findMany({});
    console.dir(allUsers, { depth: null });
  }

  await main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
