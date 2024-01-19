import { getPost } from "@/actions/post.action";
import SinglePost from "@/components/single-post";

export default async function Page({ params }: { params: { id: string } }) {
  const { error, wrappedPost } = await getPost(params.id);

  return (
    <>
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
    </>
  );
}
