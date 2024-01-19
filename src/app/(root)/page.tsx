import SignoutButton from "@/components/buttons/signout.button";
import Post from "@/components/post";

export default async function Page() {
  return (
    <div>
      <h1>page</h1>
      <Post postImg="https://images.pexels.com/photos/14875250/pexels-photo-14875250.jpeg" />
      <SignoutButton />
    </div>
  );
}
