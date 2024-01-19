import { getEvents } from "@/actions/event.action";
import Event from "@/components/event";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const { wrappedEvents } = await getEvents();

  return (
    <div>
      <div>
        <Link href="/events/create">
          <Button className="ml-2">Create</Button>
        </Link>
      </div>
      {wrappedEvents?.map((event) => (
        <Event
          key={event?.id}
          description={event?.description}
          eventImage={event?.eventImage as string}
          expiresAt={event?.expiresAt}
          id={event?.id}
          location={event?.location}
          timeAgo={event?.timeAgo}
          title={event?.title}
          userId={event?.user?.id}
          userImage={event?.user?.image}
          userName={event?.user?.name}
          likesCount={event?.likesCount}
        />
      ))}
    </div>
  );
}
