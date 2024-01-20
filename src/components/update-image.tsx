"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "./ui/input";
import { updateUser } from "@/actions/user.action";
import { toast } from "react-toastify";

type ProfileProps = {
  name: string;
  image: string;
};

export default function Profile({ image, name }: ProfileProps) {
  const [updateImage, setUpdateImage] = React.useState(image);
  const [updateName, setUpdateName] = React.useState(name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, message } = await updateUser(updateImage, updateName);

    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.success(message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setUpdateImage(fileReader.result as string);
        }
      };
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[94vh] flex items-center justify-center"
    >
      <Card className="w-[350px]  flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle className="text-center">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="image">
            <img
              src={
                updateImage ||
                "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
              alt="image"
              className="w-60 h-60 rounded-full cursor-pointer"
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            className="hidden"
            accept="image"
          />
          <Input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            className="mt-3"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-48">
            Update
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
