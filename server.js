const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const path = require("path");

const Emails = require("./models/Emails");

dotenv.config();

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

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("error", (error) => {
  console.log("Failed to connect to DB: ", error);
});

mongoose.connection.on("connected", (error, res) => {
  console.log("Mongoose is connected");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.get("/terms/servers", (req, res) => {
  res.sendFile(path.join(__dirname, "client/terms", "servers.html"));
});

app.get("/privacypolicy/servers", (req, res) => {
  res.sendFile(path.join(__dirname, "client/privacypolicy", "servers.html"));
});

app.post("/send-email", async (request, response) => {
  try {
    const { to_email, message, subject } = request.body;

    const emailToAdd = await Emails.findOne({ email: to_email });

    if (emailToAdd) {
      throw new Error("This email is already in wait list");
    }

    const newMail = new Emails({ email: to_email });
    await newMail.save();

    let mailOptions = {
      from: "Knowbie Team <dev@getknowbie.com>",
      to: to_email,
      subject: "What's next?",
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
  } catch (err) {
    response.status(400).json({ message: "Something went wrong" });
  }
});

app.post("/send-form-email", async (request, response) => {
  try {
    const {
      fullName,
      to_email,
      companyType,
      companyName,
      message,
    } = request.body;
    let mailOptions = {
      from: `Knowbie landing page  <dev@getknowbie.com>"`,
      to: "info@getknowbie.com",
      replyTo: to_email,
      subject: "Knowbie Landing page",
      html: `
       <h4>Full name: ${fullName}</h4> 
       <h4>Email: ${to_email}</h4> 
       <h4>Company type: ${companyType}</h4> 
       <h4>Company name: ${companyName}</h4> 
        <p>${message}</p>
      `,
    };

    smtpTransport
      .sendMail(mailOptions)
      .then((res) =>
        response.status(200).json({ message: "Message was sent successfully" })
      )
      .catch((err) =>
        response.status(400).json({ message: "Something went wrong" })
      );
  } catch (err) {
    response.status(400).json({ message: "Something went wrong" });
  }
});

app.listen(process.env.PORT || 5006, () =>
  console.log(`Server listening on port ${process.env.PORT || 5006}`)
);
