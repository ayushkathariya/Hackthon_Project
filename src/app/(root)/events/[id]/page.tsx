import { getEvent } from "@/actions/event.action";
import SingleEvent from "@/components/single-event";

export default async function Page({ params }: { params: { id: string } }) {
  const { wrappedEvent, error } = await getEvent(params.id);

  return (
    <>
      {wrappedEvent && (
        <SingleEvent
          id={wrappedEvent?.id as string}
          expiresAt={wrappedEvent?.expiresAt}
          likesCount={wrappedEvent?.likesCount}
          location={wrappedEvent?.location}
          timeAgo={wrappedEvent?.timeAgo}
          title={wrappedEvent?.title}
          userId={wrappedEvent?.user?.id}
          userImage={wrappedEvent?.user?.image}
          userName={wrappedEvent?.user?.name}
          key={wrappedEvent?.id}
          description={wrappedEvent?.description as string}
          eventImage={wrappedEvent?.eventImage as string}
        />
      )}
    </>
  );
}
