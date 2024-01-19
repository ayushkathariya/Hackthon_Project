"use server";

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { cloudinaryConfig } from "@/utils/cloudinary";
import { postWrapper } from "@/utils/response-wrapper";

// Cloudinary Configuration
cloudinaryConfig();

export const getPosts = async () => {
  try {
    const session = await getAuthSession();

    const posts = await prisma?.post.findMany({
      include: {
        user: true,
        comments: true,
        likes: true,
      },
    });

    const wrappedPosts = posts
      ?.map((post) => postWrapper(post as any))
      .reverse();
    return { wrappedPosts };

    console.log(wrappedPosts);
  } catch (error) {
    return { error: "Error" };
  }
};

export const createPost = async (caption: string, postImage: string) => {
  try {
    if (!caption || !postImage) {
      return { error: "All fields are required" };
    }

    const session = await getAuthSession();
    if (!session) {
      return { error: "Not Authorized" };
    }

    const cloudinaryImage = await cloudinary.uploader.upload(postImage, {
      folder: "IssuePosts",
    });

    await prisma.post.create({
      data: {
        caption,
        postImage: cloudinaryImage.url,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });

    return { message: "Post Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/");
  }
};
