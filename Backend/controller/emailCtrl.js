const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
require('dotenv').config(); // Load environment variables

const sendEmail = async (data) => {
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.GMAIL_USER, // Updated to match .env file
        pass: process.env.GMAIL_PASS, // Updated to match .env file
      },
  });

  try {
      // Send mail with defined transport object
      let info = await transporter.sendMail({
          from: '"Hey 👻" <' + process.env.GMAIL_USER + '>', // Use your actual Gmail address
          to: data.to, // List of receivers
          subject: data.subject, // Subject line
          text: data.text, // Plain text body
          html: data.html, // HTML body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      return {
          message: "Email sent successfully",
          info
      };
  } catch (error) {
      throw new Error(error);
  }
};

module.exports = sendEmail;

