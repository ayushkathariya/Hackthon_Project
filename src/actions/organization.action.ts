"use server";

import prisma from "@/utils/prisma";
import { organizationUserWrapper } from "@/utils/response-wrapper";
import { Role } from "@prisma/client";

export const getOrganizations = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: { equals: Role.Organization as Role },
      },
    });

    const wrappedUsers = users?.map((user) =>
      organizationUserWrapper(user as any)
    );

    return { wrappedUsers };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
