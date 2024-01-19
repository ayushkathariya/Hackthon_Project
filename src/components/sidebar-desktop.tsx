"use client";

import SidebarLink from "./sidebar-link";

export default function SideBarDesktop() {
  return (
    <div className="lg:w-[21rem] h-full fixed z-10 top-0 left-0 border-r">
      <div className="h-full flex flex-col">
        <div className="mt-3">
          <h1 className="text-center text-xl font-bold">Eco Unity</h1>
        </div>
        <div className="mt-60">
          <SidebarLink />
        </div>
      </div>
    </div>
  );
}
