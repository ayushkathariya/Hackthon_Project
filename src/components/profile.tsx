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
import Link from "next/link";

type ProfileProps = {
  name: string;
  image: string;
};

export default function Profile({ image, name }: ProfileProps) {
  return (
    <div className="h-[94vh] flex items-center justify-center">
      <Card className="w-[350px]  flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle className="text-center">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={
              image ||
              "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
            alt="image"
            className="w-60 h-60 rounded-full"
          />
          <CardDescription className="text-center mt-2 font-medium text-md">
            {`Name: ${name}`}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={"/"}>
            <Button variant={"secondary"} className="w-48">
              Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
