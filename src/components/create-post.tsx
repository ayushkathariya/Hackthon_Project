"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { createPost } from "@/actions/post.action";
import { FcGallery } from "react-icons/fc";
import { Input } from "./ui/input";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, message } = await createPost(caption, postImage);

    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.success(message);
    }

    setCaption("");
    setPostImage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setPostImage(fileReader.result as string);
        }
      };
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-[480px] lg:w-[800px] items-start ml-2 mt-3 lg:ml-36"
    >
      <div>
        <div className="flex justify-center gap-3">
          <Input
            type="text"
            placeholder="Enter your issue"
            className="px-2 py-2  border rounded outline-none w-96 lg:w-[610px] mt-4 focus:ring focus:ring-blue-100"
            onChange={(e) => setCaption(e.target.value)}
            minLength={10}
            required
          />
        </div>
        {postImage && (
          <img
            alt="post"
            className="justify-center rounded h-52 w-96 mt-3 lg:w-[610px] lg:h-60"
            src={postImage}
          />
        )}
      </div>
      <div className="flex gap-72 lg:gap-[32.3rem]">
        <span>
          <input
            id="create-post"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <label htmlFor="create-post" className="cursor-pointer">
            <FcGallery className="text-[2.2rem] text-green-600 cursor-pointer" />
          </label>
        </span>
        <Button type="submit">Post</Button>
      </div>
    </form>
  );
}
