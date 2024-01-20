import AvatarIcon from "@/components/avatar-photo";
import SideBarMobile from "./sidebar-mobile";
import SidebarDesktop from "./sidebar-desktop";
import ModeToggle from "./buttons/toggle-button";
import { getAuthSession } from "@/utils/auth";
import Link from "next/link";
import { IoEarthSharp } from "react-icons/io5";

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
          <Link href={"/"}>
            <IoEarthSharp className="text-[32px] mt-1 text-green-500" />
          </Link>
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
