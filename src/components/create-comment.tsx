"use client";

import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import { createPostComment } from "@/actions/comment.action";

type CreateCommentProps = {
  postId: string;
};

export default function CreateComment({ postId }: CreateCommentProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, message } = await createPostComment(postId, comment);
    if (error) {
      toast.error(error);
    }
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        placeholder="Share your thoughts"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-[23.4rem] md:w-[35rem]"
        minLength={3}
      />
      <button>
        <IoMdSend className="text-3xl text-blue-500" />
      </button>
    </form>
  );
}
