"use server";

import nodemailer from "nodemailer";
import { getAuthSession } from "@/utils/auth";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "@/utils/cloudinary";

export const submitIssue = async (
  title: string,
  description: string,
  location: string,
  contact: number,
  issueImage: string
) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!title || !description || !location || !contact) {
      return { error: "All fields are required" };
    }

    // Cloudinary Configuration
    cloudinaryConfig();

    if (issueImage) {
      const cloudinaryImage = await cloudinary.uploader.upload(issueImage, {
        folder: "Issues",
      });

      await prisma?.issue.create({
        data: {
          title,
          description,
          location,
          contact: Number(contact),
          issueImage: cloudinaryImage.url,
          user: {
            connect: {
              id: session?.user?.id,
            },
          },
        },
      });
    } else {
      await prisma?.issue.create({
        data: {
          title,
          description,
          location,
          contact: Number(contact),
          user: {
            connect: {
              id: session?.user?.id,
            },
          },
        },
      });
    }

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
      to: process.env.MAIL_ORGANIZATION,
      subject: "OTP Verification",
      text: `${description}`,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return { error: "Failed to send email" };
      }
    });

    return { success: "Issue submitted successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
