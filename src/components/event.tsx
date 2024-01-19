"use client";

import AvatarPhoto from "./avatar-photo";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { useState } from "react";

type EventProps = {
  id: string;
  title: string;
  description: string;
  location: string;
  eventImage: string;
  userId: string;
  userImage: string;
  userName: string;
  timeAgo: String;
  expiresAt: string;
};

export default function Event({
  eventImage,
  description,
  expiresAt,
  location,
  title,
  id,
  timeAgo,
  userId,
  userImage,
  userName,
}: EventProps) {
  const [likes, setLike] = useState(false);

  return (
    <div className="border md:ml-24 lg:ml-36 mt-3 py-2 px-3 w-[26rem] md:w-[38rem] rounded">
      {/* Profile */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AvatarPhoto
            imageUrl={userImage || "https://github.com/shadcn.png"}
          />
          <p className="font-semibold">{userName}</p>
        </div>
        <div>
          <p className="font-medium">{timeAgo}</p>
        </div>
      </div>
      {/* Title */}
      <div>
        <p className="mt-2 font-medium text-sm">{`Title: ${title}`}</p>
      </div>
      {/* Description */}
      <div>
        <p className="mt-1 font-medium text-sm">{`Description: ${description}`}</p>
      </div>
      {/* Location */}
      <div>
        <p className="mt-1 font-medium text-sm">{`Location: ${location}`}</p>
      </div>
      {/* Exprires At */}
      <div>
        <p className="mt-1 font-medium text-sm">{`Starts In: ${expiresAt}`}</p>
      </div>
      {/* Image */}
      <div className="mt-2">
        <img
          src={eventImage}
          alt="Post"
          className="rounded h-52 object-cover w-full"
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
          {/* <p>{likesCount}</p> */}
        </div>
        <div className="flex items-center gap-1">
          <FaRegComment className="text-lg cursor-pointer" />
          {/* <p>{commentsCount}</p> */}
        </div>
        <div className="flex items-center gap-1">
          <IoIosShareAlt className="text-lg cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
