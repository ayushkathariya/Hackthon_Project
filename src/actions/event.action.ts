"use server";

import prisma from "@/utils/prisma";
import { cloudinaryConfig } from "@/utils/cloudinary";
import { getAuthSession } from "@/utils/auth";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { eventWrapper } from "@/utils/response-wrapper";
import { Role } from "@/utils/constants";

// Cloudinary Configuration
cloudinaryConfig();

export const getEvent = async (id: string) => {
  try {
    const event = await prisma?.event.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        likes: true,
      },
    });

    if (!event) {
      return { error: "Not Found" };
    }

    const wrappedEvent = eventWrapper(event as any);

    return { wrappedEvent };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const getEvents = async () => {
  try {
    const events = await prisma?.event.findMany({
      include: {
        user: true,
        likes: true,
      },
    });

    const wrappedEvents = events
      ?.map((event) => eventWrapper(event as any))
      .reverse();

    return { wrappedEvents };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const createEvent = async (
  title: string,
  description: string,
  location: string,
  eventImage: string,
  expiresAt: number
) => {
  try {
    if (!title || !description || !location || !eventImage || !expiresAt) {
      return { error: "All fields are required" };
    }

    const session = await getAuthSession();
    if (!session || session?.user?.role !== Role.Organization) {
      return { error: "Not Authorized" };
    }

    const cloudinaryImage = await cloudinary.uploader.upload(eventImage, {
      folder: "EventPosts",
    });

    await prisma.event.create({
      data: {
        title,
        description,
        location,
        eventImage: cloudinaryImage.url,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
        expiresAt: new Date(new Date().getTime() + expiresAt * 60 * 1000),
      },
    });

    return { message: "Event Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/events");
  }
};
