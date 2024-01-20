"use server";

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export const doPostLike = async (postId: string) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return { error: "Unauthorized" };
    }

    const isLiked = await prisma.postLike.findFirst({
      where: {
        userId: session?.user?.id,
        postId: postId,
      },
    });

    if (isLiked) {
      await prisma.postLike.delete({
        where: {
          id: isLiked.id,
        },
      });
    } else {
      await prisma.postLike.create({
        data: {
          userId: session?.user?.id,
          postId: postId,
        },
      });
    }

    return { message: "Success" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/");
  }
};
