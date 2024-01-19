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

export default function Page() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [expiresAt, setExpiresAt] = React.useState("");
  const [image, setImage] = React.useState("");

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
    setExpiresAt("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, message } = await createEvent(
      title,
      description,
      location,
      image,
      Number(expiresAt)
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
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the description of the event"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="expire">Expires at</Label>
                  <Input
                    id="expire"
                    type="text"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    placeholder="In minutes"
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
                    placeholder="Example: Koshi Province, Sunsari, Dharan"
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
