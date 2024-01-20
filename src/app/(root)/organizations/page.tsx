import { getOrganizations } from "@/actions/organization.action";
import OrganizationAvatar from "@/components/organization-avatar";

export default async function Page() {
  const { wrappedUsers } = await getOrganizations();

  return (
    <div className="mt-36">
      <div className="flex flex-wrap justify-around gap-y-36">
        {wrappedUsers &&
          wrappedUsers?.map((user) => (
            <OrganizationAvatar
              key={user?.id}
              name={user?.name}
              email={user?.email}
              image={user?.image as string}
              createdAt={user?.createdAt}
            />
          ))}
      </div>
    </div>
  );
}
