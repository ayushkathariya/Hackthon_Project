"use server";

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { postCommentWrapper } from "@/utils/response-wrapper";
import { revalidatePath } from "next/cache";

export const getPostComments = async () => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        post: true,
        user: true,
      },
    });

    const wrappedComments = comments.map((comment) =>
      postCommentWrapper(comment)
    );

    return { wrappedComments };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const createPostComment = async (postId: string, message: string) => {
  try {
    if (!postId || !message) {
      return { error: "All fields are required" };
    }

    const session = await getAuthSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    await prisma.comment.create({
      data: {
        message,
        userId: session?.user?.id,
        postId: postId,
      },
    });

    return { message: "Comment created successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/posts/:id");
  }
};
