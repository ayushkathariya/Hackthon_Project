import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

type Post = {
  id: string;
  caption: string;
  postImage: string;
  user: {
    id: string;
    name: string;
    email: string;
    password: string | null;
    image: string | null;
    createdAt: Date;
  };
  likes: {
    id: string;
  }[];
  comments: {
    id: string;
  }[];
  createdAt: Date;
};

export const postWrapper = (post: Post) => {
  return {
    id: post?.id,
    caption: post?.caption,
    postImage: post?.postImage,
    user: {
      id: post?.user?.id,
      name: post?.user?.name,
      email: post?.user?.email,
      image: post?.user?.image,
    },
    likesCount: post?.likes.length,
    commentsCount: post?.comments.length,
    timeAgo: timeAgo.format(post?.createdAt),
    createdAt: timeAgo.format(post?.createdAt),
  };
};
