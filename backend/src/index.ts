import express from "express";
import cors from "cors";
import sendEmail from "./mailgun";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/addUser", (req, res) => {
  console.log(req.body.firstName, req.body.lastName, req.body.email);
  res.send("User created");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
