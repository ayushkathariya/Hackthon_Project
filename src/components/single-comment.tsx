import React from "react";
import AvatarPhoto from "./avatar-photo";

type SingleCommentProps = {
  id: string;
  userName: string;
  userImage: string;
  timeAgo: string;
  comment: string;
};

export default function SingleComment({
  id,
  comment,
  timeAgo,
  userImage,
  userName,
}: SingleCommentProps) {
  return (
    <>
      <div className="border px-1 py-2 rounded-lg">
        <div className="flex items-center justify-between w-[25rem] md:w-[37.5rem] gap-2">
          <div className="flex items-center gap-2">
            <AvatarPhoto
              imageUrl={`${userImage} || "https://images.pexels.com/photos/14875250/pexels-photo-14875250.jpeg"`}
            />
            <p className="font-semibold">{userName}</p>
          </div>
          <div>
            <p className="font-medium">{timeAgo}</p>
          </div>
        </div>
        <div className="mt-2">
          <p>{comment}</p>
        </div>
      </div>
    </>
  );
}
