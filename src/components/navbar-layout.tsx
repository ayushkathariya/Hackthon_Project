import AvatarIcon from "@/components/avatar-photo";
import SideBarMobile from "./sidebar-mobile";
import { Input } from "@/components/ui/input";
import SidebarDesktop from "./sidebar-desktop";

export default async function AdminLayout() {
  return (
    <div className="fixed top-0 z-20 w-full flex justify-between px-1">
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
          <Input
            type="text"
            placeholder="Search"
            className="w-40 sm:w-56 md:w-72"
          />
        </div>
      </div>
      <div>
        <AvatarIcon imageUrl="https://images.pexels.com/photos/14875250/pexels-photo-14875250.jpeg" />
      </div>
    </div>
  );
}
