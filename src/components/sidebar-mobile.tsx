"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import SidebarLink from "./sidebar-link";

export default function SideBarMobile() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key="left">
        <SheetTrigger asChild>
          <Button variant="outline">
            <HamburgerMenuIcon width={20} height={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Eco Unity</SheetTitle>
          </SheetHeader>
          {/* Content */}
          <div className="mt-48">
            <SidebarLink />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
