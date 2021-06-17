const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const Emails = require("./models/Emails");

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
  res.send("Hello World!");
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
      from: `Knowbie contact us form  <dev@getknowbie.com>"`,
      to: "fomindmitrii12@gmail.com",
      replyTo: to_email,
      subject: "Contact",
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
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    response.status(400).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
