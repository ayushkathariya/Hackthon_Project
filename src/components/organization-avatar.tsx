"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMeeting } from "@/actions/meeting.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type ProfileProps = {
  name: string;
  image: string;
  email: string;
  createdAt: String;
};

export default function Profile({
  name,
  image,
  createdAt,
  email,
}: ProfileProps) {
  const router = useRouter();

  const handleRoom = async () => {
    const { error, message } = await createMeeting(email);
    if (error) {
      toast.error(error);
    } else {
      router.push(message as string);
    }
  };

  return (
    <div className="h-[300px] flex items-center justify-center w-[300px]">
      <Card className="w-[350px]  flex flex-col justify-center items-center md:w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={
              image ||
              "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
            alt="image"
            className="w-40 h-40 rounded-full"
          />
          <CardDescription className="text-center mt-2 font-medium text-md">
            {`Name: ${name}`}
          </CardDescription>
          <CardDescription className="text-center mt-2 font-medium text-md">
            {`CreatedAt: ${createdAt}`}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between flex-col gap-2">
          <Button variant={"secondary"} onClick={handleRoom} className="w-48">
            Contact
          </Button>
          <Button className="w-48">Donate</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
