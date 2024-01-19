import Post from "@/components/post";
import SignoutButton from "@/components/buttons/signout.button";
import { getPosts } from "@/actions/post.action";
import CreatePost from "@/components/create-post";

export default async function Page() {
  const { error, wrappedPosts } = await getPosts();

  return (
    <div>
      <div className="mt-3">
        <CreatePost />
      </div>
      <div className="mt-3">
        {wrappedPosts?.map((post) => (
          <Post
            key={post?.id}
            postImg={post?.postImage}
            caption={post?.caption}
            id={post?.id}
            commentsCount={post?.commentsCount}
            likesCount={post?.likesCount}
            userId={post?.user?.id}
            userImage={post?.user?.image as string}
            userName={post?.user?.name}
            timeAgo={post?.timeAgo}
          />
        ))}
      </div>
      <SignoutButton />
    </div>
  );
}
