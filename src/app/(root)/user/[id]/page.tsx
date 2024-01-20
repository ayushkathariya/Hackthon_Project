import { getUser } from "@/actions/user.action";
import Profile from "@/components/profile";

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await getUser(params.id);

  return (
    <>
      <Profile
        image={user?.image as string}
        name={user?.name as string}
        key={user?.id}
      />
    </>
  );
}
