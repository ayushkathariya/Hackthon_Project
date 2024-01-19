"use server";

import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import randomstring from "randomstring";

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    if (!name || !email || !password) {
      return { errror: "All fields are required" };
    }

    const oldUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (oldUser) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    await prisma.verifyUser.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        otp: Number(otp as any),
      },
    });

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
      text: `Your otp verification code ${otp}. Dont't share it with others`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return { error: "Failed to send email" };
      } else {
        return { message: `OTP sent to ${email}` };
      }
    });

    return { message: "OTP sent successfully" };
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};

export const verifyUser = async (otp: number, email: string) => {
  try {
    const verifiedUser = await prisma.verifyUser.findFirst({
      where: {
        email,
        otp: Number(otp),
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!verifiedUser) {
      return { error: "Invalid Token" };
    }

    await prisma.user.create({
      data: {
        name: verifiedUser.name,
        email: verifiedUser.email,
        password: verifiedUser?.password,
        provider: "Credentials",
      },
    });

    await prisma.verifyUser.delete({
      where: {
        id: verifiedUser.id,
      },
    });

    return { message: "OTP verified successfully" };
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
