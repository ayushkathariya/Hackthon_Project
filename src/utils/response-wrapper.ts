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

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  eventImage: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  likes: {
    id: string;
    userId: string;
    eventId: string;
    createdAt: Date;
  }[];
  expiresAt: Date;
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

export const eventWrapper = (event: Event) => {
  return {
    id: event?.id,
    title: event?.title,
    description: event?.description,
    eventImage: event?.eventImage,
    location: event?.location,
    user: {
      id: event?.user?.id,
      name: event?.user?.name,
      email: event?.user?.email,
      image: event?.user?.image,
    },
    likesCount: event?.likes.length,
    timeAgo: timeAgo.format(event?.createdAt),
    expiresAt: timeAgo.format(event?.expiresAt),
  };
};
