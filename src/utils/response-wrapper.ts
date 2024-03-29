import { Provider, Role } from "@prisma/client";
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
  heldIn: string;
  deadline: string;
  price: number;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  createdAt: Date;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string | null;
  image: string | null;
  provider: Provider;
  role: Role;
  createdAt: Date;
};

type postComment = {
  id: string;
  message: string;
  userId: string;
  postId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    password: string | null;
    image: string | null;
    provider: Provider;
    role: Role;
    createdAt: Date;
  };
  post: {
    id: string;
    caption: string;
    postImage: string;
    userId: string;
    createdAt: Date;
  };
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
    heldIn: event?.heldIn,
    deadLine: event?.deadline,
    price: event?.price,
    user: {
      id: event?.user?.id,
      name: event?.user?.name,
      email: event?.user?.email,
      image: event?.user?.image,
    },
    timeAgo: timeAgo.format(event?.createdAt),
  };
};

export const organizationUserWrapper = (user: User) => {
  return {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    image: user?.image,
    provider: user?.provider,
    role: user?.role,
    createdAt: timeAgo.format(user?.createdAt),
  };
};

export const postCommentWrapper = (postComment: postComment) => {
  return {
    id: postComment.id,
    message: postComment.message,
    createdAt: timeAgo.format(postComment.createdAt),
    user: {
      userId: postComment.user.id,
      userName: postComment.user.name,
      userEmail: postComment.user.email,
      userImage: postComment?.user.image,
    },
    post: {
      postId: postComment.post.id,
    },
  };
};
