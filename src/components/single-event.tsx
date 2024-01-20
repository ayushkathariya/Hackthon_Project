"use client";

import AvatarPhoto from "./avatar-photo";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { FacebookShareButton } from "react-share";
import { useRouter } from "next/navigation";

type EventProps = {
  id: string;
  title: string;
  description: string;
  location: string;
  eventImage: string;
  userId: string;
  userImage: string;
  userName: string;
  likesCount: number;
  timeAgo: String;
  expiresAt: string;
};

export default function SingleEvent({
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
  likesCount,
}: EventProps) {
  const router = useRouter();

  return (
    <div className="border mt-3 py-2 px-3 h-[80vh] flex flex-col justify-around  w-[26rem] md:w-[38rem] rounded">
      {/* Profile */}
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push(`/user/${userId}`)}
        >
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
          className="rounded h-64 object-cover w-full"
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-between mt-2 px-1">
        <div className="flex items-center gap-1">
          <AiOutlineLike color="blue" className="text-lg cursor-pointer" />
          <p>{likesCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegComment className="text-lg cursor-pointer" />
          {/* <p>{commentsCount}</p> */}
        </div>
        <div>
          <FacebookShareButton
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/events/${id}`}
            className="Demo__some-network__share-button"
          >
            <FaShare size={20} />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
}
