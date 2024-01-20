import AvatarIcon from "@/components/avatar-photo";
import SideBarMobile from "./sidebar-mobile";
import SidebarDesktop from "./sidebar-desktop";
import ModeToggle from "./buttons/toggle-button";
import { getAuthSession } from "@/utils/auth";
import Link from "next/link";

export default async function AdminLayout() {
  const session = await getAuthSession();

  return (
    <div className="fixed top-1 z-20 w-full flex justify-between px-1">
      <div className="flex">
        <div>
          <span className="lg:hidden">
            <SideBarMobile />
          </span>
          <span className="hidden lg:block">
            <SidebarDesktop />
          </span>
        </div>
        <div className="lg:ml-[21.5rem]">
          <h1 className="font-bold">Eco Unity</h1>
        </div>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <Link href={`/user/${session?.user?.id}`}>
          <AvatarIcon
            imageUrl={session?.user?.image || "https://github.com/shadcn.png"}
          />
        </Link>
      </div>
    </div>
  );
}
