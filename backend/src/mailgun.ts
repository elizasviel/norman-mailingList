import formData from "form-data";
import Mailgun from "mailgun.js";

const key = "6be1f6fd29c60b6b3fe333975be9d052-8a084751-4aa0e14a";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || key,
});

const sendEmail = () => {
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
};

export default sendEmail;
