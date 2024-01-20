"use server";

import prisma from "@/utils/prisma";

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
