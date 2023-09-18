import nodemailer from "nodemailer";
import config from "../config/dotenv.config.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.userNodemailer,
    pass: config.passNodemailer,
  },
});

export default transport