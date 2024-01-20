import { getUser } from "@/actions/user.action";
import Profile from "@/components/profile";
import UpdateImage from "@/components/update-image";
import { getAuthSession } from "@/utils/auth";

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await getUser(params.id);
  const session = await getAuthSession();
  const isAdmin = params.id === session?.user?.id;

  return (
    <>
      {isAdmin ? (
        <UpdateImage image={session?.user?.image} name={session?.user?.name} />
      ) : (
        <>
          <Profile
            image={user?.image as string}
            name={user?.name as string}
            key={user?.id}
          />
        </>
      )}
    </>
  );
}
