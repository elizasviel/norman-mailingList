"use strict";
//Jake: 6be1f6fd29c60b6b3fe333975be9d052-8a084751-4aa0e14a
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var form_data_1 = __importDefault(require("form-data"));
var mailgun_js_1 = __importDefault(require("mailgun.js"));
var key = "6be1f6fd29c60b6b3fe333975be9d052-8a084751-4aa0e14a";
var mailgun = new mailgun_js_1.default(form_data_1.default);
var mg = mailgun.client({
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
    .then(function (msg) { return console.log(msg); }) // logs response data
    .catch(function (err) { return console.log(err); }); // logs any error
