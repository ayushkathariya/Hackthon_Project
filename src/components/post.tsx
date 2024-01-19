"use client";

import Image from "next/image";
import AvatarPhoto from "./avatar-photo";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { useState } from "react";

type PostProps = {
  postImg: string;
};

export default function Post({ postImg }: PostProps) {
  const [likes, setLike] = useState(false);

  return (
    <div className="border w-80 py-2 px-3 rounded">
      {/* Profile */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AvatarPhoto imageUrl="https://github.com/shadcn.png" />
          <p className="font-semibold">Ayush Kathariya</p>
        </div>
        <div>
          <p className="font-medium">5 hrs ago</p>
        </div>
      </div>
      {/* Image */}
      <div className="mt-2">
        <Image
          src={postImg}
          alt="Post"
          width={300}
          height={500}
          className="rounded"
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-between mt-2 px-1">
        <div className="flex items-center gap-1">
          {likes ? (
            <AiOutlineLike className="text-lg cursor-pointer" />
          ) : (
            <AiOutlineLike color="blue" className="text-lg cursor-pointer" />
          )}
          <p>50</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegComment className="text-lg cursor-pointer" />
          <p>9</p>
        </div>
        <div className="flex items-center gap-1">
          <IoIosShareAlt className="text-lg cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
