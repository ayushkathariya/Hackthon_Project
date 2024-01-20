import { getPost } from "@/actions/post.action";
import Comment from "@/components/comment";
import CreateComment from "@/components/create-comment";
import SinglePost from "@/components/single-post";

export default async function Page({ params }: { params: { id: string } }) {
  const { wrappedPost } = await getPost(params.id);

  return (
    <div className="flex justify-around flex-col items-center">
      {wrappedPost && (
        <SinglePost
          id={wrappedPost?.id}
          caption={wrappedPost?.caption}
          commentsCount={wrappedPost?.commentsCount}
          likesCount={wrappedPost?.likesCount}
          postImg={wrappedPost?.postImage}
          timeAgo={wrappedPost?.timeAgo}
          userId={wrappedPost?.user?.id}
          userImage={wrappedPost?.user?.image as string}
          userName={wrappedPost?.user?.name}
          key={wrappedPost?.id}
        />
      )}
      <div className="mt-3">
        <CreateComment postId={wrappedPost?.id as string} />
      </div>
      <div className="mt-3">
        <Comment />
      </div>
    </div>
  );
}
