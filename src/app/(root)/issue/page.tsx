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
import { MdCall } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { submitIssue } from "@/actions/issue.action";
import { toast } from "react-toastify";
import { createMeeting } from "@/actions/meeting.action";
import { useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [contact, setContact] = React.useState<string>("");
  const [location, setLocation] = React.useState("");
  const [image, setImage] = React.useState("");
  const router = useRouter();

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
    setContact("");
    setLocation("");
    setImage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, success } = await submitIssue(
      title,
      description,
      location,
      contact as any,
      image
    );

    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success(success);
    }

    handleReset();
  };

  const handleRoom = async () => {
    const { error, message } = await createMeeting(
      process.env.MAIL_ORGANIZATION!
    );
    if (error) {
      toast.error(error);
    } else {
      router.push(message as string);
    }
  };

  return (
    <div className="px-3">
      <div className="text-start">
        <Button
          className="mt-2 ml-4 lg:ml-52"
          type="button"
          onClick={handleRoom}
        >
          Emergency Call <MdCall className="ml-2 text-2xl" color="green" />
        </Button>
      </div>{" "}
      <div className="w-full flex mt-4 justify-center">
        <form onSubmit={handleSubmit}>
          <Card className="w-[450px] md:w-[500px]">
            <CardHeader>
              <CardTitle className="text-center">Issue Form</CardTitle>
              <CardDescription className="text-center mt-1">
                Report website issues easily with our simple and easy online
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
                    placeholder="Enter the title of the issue"
                    minLength={5}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the description of the issue"
                    minLength={10}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    type="number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter your contact number"
                    minLength={10}
                    maxLength={10}
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
                    minLength={4}
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
