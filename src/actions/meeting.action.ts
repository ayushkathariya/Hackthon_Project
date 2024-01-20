"use server";

import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export const createMeeting = async (email: string) => {
  try {
    const randomId = uuidv4();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_HOST,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_HOST,
      to: email,
      subject: "OTP Verification",
      text: `Your meeting room link is <a>&{${process.env.NEXT_PUBLIC_BASE_URL}/room/${randomId}}</a>`,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return { error: "Failed to send email" };
      } else {
        return {
          message: `${process.env.NEXT_PUBLIC_BASE_URL}/room/${randomId}}}`,
        };
      }
    });

    return {
      message: `${process.env.NEXT_PUBLIC_BASE_URL}/room/${randomId}`,
    };
  } catch (error) {
    return { error: "Somthing went wrong" };
  }
};
