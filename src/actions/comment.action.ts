"use server";

import prisma from "@/utils/prisma";

export const getComments = async () => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        post: true,
        user: true,
      },
    });

    return { comments };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const postComment = async () => {
  try {
    return { message: "Hello world" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
