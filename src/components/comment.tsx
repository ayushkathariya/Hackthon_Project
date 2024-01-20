import { getPostComments } from "@/actions/comment.action";
import SingleComment from "./single-comment";

export default async function Comment() {
  const { wrappedComments } = await getPostComments();

  return (
    <div className="flex flex-col gap-4">
      {wrappedComments &&
        wrappedComments.map((comment) => (
          <SingleComment
            key={comment.id}
            id={comment.id}
            comment={comment.message}
            timeAgo={comment.createdAt}
            userImage={comment.user.userImage as string}
            userName={comment.user.userName}
          />
        ))}
    </div>
  );
}
