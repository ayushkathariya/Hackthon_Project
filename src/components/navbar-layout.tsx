import AvatarIcon from "@/components/avatar-photo";
import SideBarMobile from "./sidebar-mobile";
import SidebarDesktop from "./sidebar-desktop";
import ModeToggle from "./buttons/toggle-button";

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
          <h1 className="font-bold">Eco Unity</h1>
        </div>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <AvatarIcon imageUrl="https://images.pexels.com/photos/14875250/pexels-photo-14875250.jpeg" />
      </div>
    </div>
  );
}
