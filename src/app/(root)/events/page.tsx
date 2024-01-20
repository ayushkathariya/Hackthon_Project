import { getEvents } from "@/actions/event.action";
import Event from "@/components/event";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/utils/auth";
import { Role } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import NewEvents from "@/components/event-test";

export default async function Page() {
  const { wrappedEvents } = await getEvents();
  const session = await getAuthSession();

  return (
    <div className="pt-2">
      <div>
        {session?.user?.role === Role.Organization && (
          <Link href="/events/create">
            <Button className="ml-8 lg:ml-16 w-24">Create</Button>
          </Link>
        )}
      </div>
      <div className="Events-details text-4xl text-center m-4">
        <p className="titles font-extrabold ">Upcoming Events</p>
        <p className="titles text-xl">Check out some of our featured events!</p>
      </div>
      <div className="flex flex-wrap justify-around">
        {wrappedEvents?.map((event) => (
          <NewEvents
            key={event?.id}
            description={event?.description}
            eventImage={event?.eventImage as string}
            expiresAt={event?.timeAgo}
            id={event?.id}
            location={event?.location}
            timeAgo={event?.timeAgo}
            title={event?.title}
            userId={event?.user?.id}
            userImage={event?.user?.image}
            userName={event?.user?.name}
            deadLine={event?.deadLine}
            heldIn={event?.heldIn}
            price={event?.price}
          />
        ))}
      </div>
    </div>
  );
}
