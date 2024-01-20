"use server";

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { cloudinaryConfig } from "@/utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Cloudinary
cloudinaryConfig();

export const getUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return { error: "Not Found" };
    }

    return { user };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const updateUser = async (image: string, name: string) => {
  try {
    const session = await getAuthSession();

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (!user) {
      return { error: "Not Found" };
    }

    const cloudinaryImage = await cloudinary.uploader.upload(image, {
      folder: "UserProfile",
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: cloudinaryImage.url,
        name,
      },
    });

    return { message: "Profile Updated Successful" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/:id");
  }
};
