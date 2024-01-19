import Link from "next/link";
import { HomeIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { MdEvent } from "react-icons/md";
import { Command, CommandItem } from "@/components/ui/command";
import { GoOrganization } from "react-icons/go";
import LogoutLink from "@/components/logout-link";

export default function SidebarLink() {
  return (
    <Command className="flex flex-col gap-2">
      <Link href={"/"}>
        <CommandItem className="cursor-pointer">
          <HomeIcon className="mr-2 h-4 w-4 lg:h-5 lg:w-5 lg:mr-3" />
          <span className="lg:text-lg font-medium">Home</span>
        </CommandItem>
      </Link>
      <Link href={"/events"}>
        <CommandItem className="cursor-pointer">
          <MdEvent className="mr-2 h-4 w-4  lg:h-5 lg:w-5 lg:mr-3" />
          <span className="lg:text-lg font-medium">Events</span>
        </CommandItem>
      </Link>
      <Link href={"/issue"}>
        <CommandItem className="cursor-pointer">
          <EnvelopeClosedIcon className="mr-2 h-4 w-4 lg:h-5 lg:w-5 lg:mr-3" />
          <span className="lg:text-lg font-medium">Issue</span>
        </CommandItem>
      </Link>
      <Link href={"/organizations"}>
        <CommandItem className="cursor-pointer">
          <GoOrganization className="mr-2 h-4 w-4 lg:h-5 lg:w-5 lg:mr-3" />
          <span className="lg:text-lg font-medium">Organizations</span>
        </CommandItem>
      </Link>
      <LogoutLink />
    </Command>
  );
}
