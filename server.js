const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const PORT = 5000 || process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static("client"));

let smtpTransport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send-email", (request, response) => {
  const { to_email, message, subject } = request.body;

  const templateParams = {
    to_email,
    message: "This is a test email",
  };

  let mailOptions = {
    from: "Knowbie Team <dev@getknowbie.com>",
    to: to_email,
    subject: subject,
    html: `
      <h1>Hello there</h1>
    `,
  };

  smtpTransport
    .sendMail(mailOptions)
    .then((res) =>
      response.status(200).json({ message: "Message was sent successfully" })
    )
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
