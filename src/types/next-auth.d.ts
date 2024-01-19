import type { Session } from "next-auth";
import { Role, Provider } from "@/utils/constants";
import { string } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: Role;
      provider: Provider;
    };
  }
}
