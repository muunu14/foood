import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();
const { AUTH_EMAIL, AUTH_PASS } = process.env;
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});
export const sendVerificationEmail = async (
  receiver: string,
  verifyEmail: string,
) => {
  await transport.sendMail({
    from: `"Food Delivery App" <${AUTH_EMAIL}>`,
    to: receiver,
    subject: "Verify your email",
    html: `
<div style="
        width:600px;
        margin:0 auto;
        background-color:rgb(164,212,228);
        padding:60px 20px;
        border-radius:20px;
        text-align:center;
      ">
<h1 style="
          font-size:18px;
          font-weight:600;
          margin-bottom:30px;
        ">
          Welcome to our application!
</h1>
<p>Please verify your email address</p>
<a href="${verifyEmail}"
          target="_blank"
          style="
            display:inline-block;
            margin-top:20px;
            padding:12px 24px;
            background-color:#007bff;
            color:white;
            text-decoration:none;
            border-radius:8px;

            font-weight:600;

          "
>

          Verify Email
</a>
<p style="margin-top:40px; font-size:12px; color:#555;">

          If you didn’t request this, you can ignore this email.
</p>
</div>

    `,
  });
};
