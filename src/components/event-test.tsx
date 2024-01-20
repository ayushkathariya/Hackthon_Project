"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { donateMoney } from "@/actions/donate.action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type NewEventsProps = {
  id: string;
  title: string;
  description: string;
  location: string;
  eventImage: string;
  deadLine: string;
  heldIn: string;
  price: number;
  userId: string;
  userImage: string;
  userName: string;
  timeAgo: String;
  expiresAt: string;
};

export default function NewEvents({
  id,
  deadLine,
  description,
  eventImage,
  expiresAt,
  heldIn,
  location,
  price,
  timeAgo,
  title,
  userId,
  userImage,
  userName,
}: NewEventsProps) {
  const router = useRouter();

  return (
    <div className="h-fit">
      <div className="w-[100%]]">
        <div className="main flex flex-wrap">
          <Card className="w-[22rem] m-2">
            <CardHeader>
              <img
                className="w-100% h-64 rounded"
                src={eventImage}
                alt="Event Image"
              />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <p className="event-details text-2xl font-bold">{title}</p>
                <p className="event-details font-medium">Price: Rs.{price}</p>
                <p className="event-details font-medium">
                  Deadline: {deadLine}
                </p>
                <p className="event-details font-medium">Held In: {heldIn}</p>
                <p className="event-details font-medium">
                  Location: {location}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-3 justify-between flex-wrap">
                <Button
                  onClick={async () => {
                    const { data, error } = await donateMoney();
                    if (data) {
                      router.push(data.payment_url);
                    }
                    if (error) {
                      toast.error("Something went wrong");
                    }
                  }}
                >
                  Register
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
