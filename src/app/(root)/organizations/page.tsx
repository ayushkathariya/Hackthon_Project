import { getOrganizations } from "@/actions/organization.action";
import Organization from "@/components/organization";

export default async function Page() {
  const { wrappedUsers } = await getOrganizations();

  return (
    <div>
      <div className="flex flex-wrap justify-around gap-y-36">
        {wrappedUsers &&
          wrappedUsers?.map((user) => (
            <Organization
              id={user?.id}
              provider={user?.provider}
              role={user?.role}
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
