import sendEmail from "./mailgun";
import express from "express";
import cors from "cors";
import prisma from "./client";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({});
  res.send(users);
});

app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    },
  });

  res.send({ data: user });
});

app.delete("/users/:id", async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send({ data: user });
});

app.post("/emails", async (req, res) => {
  const users = await prisma.user.findMany({});
  const emails = await Promise.all(
    users.map((user) => sendEmail(user.email, req.body.subject, req.body.body))
  );
  res.send({ data: emails });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
