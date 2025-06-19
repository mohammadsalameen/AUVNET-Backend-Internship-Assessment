  import nodemailer from "nodemailer";

  const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
      port: 587,
      secure: false,
    });
    const info = await transporter.sendMail({
      from: `"M-Shop" <${process.env.SENDER_EMAIL}>`, // sender address
      to,
      subject,
      html,
    });
  };
  export default sendEmail;