"use client";

import AvatarPhoto from "./avatar-photo";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { doPostLike } from "@/actions/like.action";
import { toast } from "react-toastify";
import { FacebookShareButton } from "react-share";

type PostProps = {
  id: string;
  caption: string;
  postImg: string;
  userId: string;
  userImage: string;
  userName: string;
  timeAgo: String;
  likesCount: number;
  commentsCount: number;
};

export default function SinglePost({
  postImg,
  caption,
  commentsCount,
  id,
  likesCount,
  timeAgo,
  userId,
  userImage,
  userName,
}: PostProps) {
  return (
    <div className="border md:ml-24 lg:ml-36 mt-3 py-2 px-3 h-[80vh] flex flex-col justify-around   w-[26rem] md:w-[38rem] rounded">
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
      {/* Caption */}
      <div>
        <p>{caption}</p>
      </div>
      {/* Image */}
      <div className="mt-2">
        <img
          src={postImg}
          alt="Post"
          className="rounded h-52 object-cover w-full"
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-between mt-2 px-1">
        <div
          className="flex items-center gap-1"
          onClick={async () => {
            const { error } = await doPostLike(id);
            if (error) {
              toast.error(error);
            }
          }}
        >
          <AiOutlineLike color="blue" className="text-lg cursor-pointer" />
          <p>{likesCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegComment className="text-lg cursor-pointer" />
          <p>{commentsCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <FacebookShareButton
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`}
            className="Demo__some-network__share-button"
          >
            <IoIosShareAlt className="text-lg cursor-pointer" />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
}