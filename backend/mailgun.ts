import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
});

const sendEmail = (to: string, subject: string, body: string) => {
  mg.messages
    .create("sandbox3fdc655a61914ad2a1a5e8c10733daa1.mailgun.org", {
      from: "Excited User <mailgun@sandbox3fdc655a61914ad2a1a5e8c10733daa1.mailgun.org>",
      to: [to],
      subject: subject,
      text: body,
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)); // logs any error
};

export default sendEmail;
