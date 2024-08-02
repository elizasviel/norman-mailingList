import sendEmail from "./mailgun";
import express from "express";
import cors from "cors";
import prisma from "./client";

const app = express();

app.use(express.json());
app.use(cors());

//return all mailing lists
app.get("/mailingLists", async (req, res) => {
  const mailingLists = await prisma.mailingList.findMany({});
  res.send(mailingLists);
});

//create a mailing list
app.post("/mailingLists", async (req, res) => {
  const mailingList = await prisma.mailingList.create({
    data: {
      name: req.body.name,
    },
  });
  res.send(mailingList);
});

//delete a mailing list
app.delete("/mailingLists/:id", async (req, res) => {
  const mailingList = await prisma.mailingList.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send(mailingList);
});

//return all recipients in a mailing list
app.get("/mailingLists/:id", async (req, res) => {
  const recipients = await prisma.recipient.findMany({
    where: {
      mailingListId: parseInt(req.params.id),
    },
  });
  res.send(recipients);
});

//create a recipient and add to a mailing list
app.post("/mailingLists/:id/add", async (req, res) => {
  console.log(req.params.id);
  const recipient = await prisma.recipient.create({
    data: {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mailingListId: parseInt(req.params.id),
    },
  });

  res.send({ data: recipient });
});

//send an email to all recipients in a mailing list. Add the email to "recently sent"
app.post("/mailingLists/:id/send", async (req, res) => {
  const recipients = await prisma.recipient.findMany({
    where: {
      mailingListId: parseInt(req.params.id),
    },
  });
  const emails = await Promise.all(
    recipients.map((recipient) =>
      sendEmail(recipient.email, req.body.subject, req.body.body)
    )
  ).then(() => {
    prisma.recentlySent.create({
      data: {
        mailingListId: parseInt(req.params.id),
        subject: req.body.subject,
        content: req.body.content,
      },
    });
  });
  res.send({ data: emails });
});

//delete a recipient from a mailing list
app.delete("/mailingLists/:id/:recipientId", async (req, res) => {
  const recipient = await prisma.recipient.delete({
    where: {
      id: parseInt(req.params.recipientId),
    },
  });
  res.send({ data: recipient });
});

export default app;
