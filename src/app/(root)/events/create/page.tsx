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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcAddImage } from "react-icons/fc";
import { toast } from "react-toastify";
import { createEvent } from "@/actions/event.action";
import { useSession } from "next-auth/react";
import { Role } from "@/utils/constants";
import { redirect } from "next/navigation";

export default function Page() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [image, setImage] = React.useState("");
  const [heldIn, setHeldIn] = React.useState("");
  const [price, setPrice] = React.useState("");

  const session = useSession();
  if (session?.data?.user?.role !== Role.Organization) {
    redirect("/");
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setImage(fileReader.result as string);
        }
      };
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setImage("");
    setDeadline("");
    setPrice("");
    setHeldIn("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, message } = await createEvent(
      title,
      description,
      location,
      image,
      deadline,
      heldIn,
      Number(price)
    );

    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.success(message);
    }

    handleReset();
  };

  return (
    <div className="px-3">
      <div className="w-full mt-4 flex justify-center">
        <form onSubmit={handleSubmit}>
          <Card className="w-[450px] md:w-[500px]">
            <CardHeader>
              <CardTitle className="text-center">Event Form</CardTitle>
              <CardDescription className="text-center">
                Create website events easily with our simple and easy online
                form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title of the event"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the description of the event"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter the location"
                    required
                  />
                </div>
                {/* Deadline */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Enter Deadline"
                    required
                  />
                </div>
                {/* Held In */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="heldin">Held In</Label>
                  <Input
                    id="heldin"
                    type="text"
                    value={heldIn}
                    onChange={(e) => setHeldIn(e.target.value)}
                    placeholder="Enter Held In"
                    required
                  />
                </div>
                {/* Price */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="In Nrs."
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">
                    <FcAddImage className="text-4xl cursor-pointer" />
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image"
                    height={300}
                    onChange={handleImageChange}
                  />
                  {image && <img src={image} alt="image" />}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
