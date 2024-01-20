"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Provider, Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { donateMoney } from "@/actions/donate.action";
import { toast } from "react-toastify";

type OrganizationProps = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  provider: Provider;
  role: Role;
  createdAt: string;
};

export default function Organization({
  id,
  name,
  email,
  image,
  provider,
  role,
  createdAt,
}: OrganizationProps) {
  const router = useRouter();

  return (
    <div className="container my-10">
      <div className="profile ">
        <Card>
          <CardHeader>
            <CardTitle>
              <div>
                <img
                  className="h-[480px] w-[100%] rounded-xl object-contain"
                  src={image as string}
                  alt="User Background Images"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start gap-4 ">
              <p className="font-medium">Organization Name: {name}</p>
              <p className="font-medium">Email: {email}</p>
              <div className="event flex gap-4 flex-wrap">
                <Button
                  className="px-8"
                  variant="secondary"
                  onClick={() => router.push("/events")}
                >
                  Upcoming
                </Button>
                <Button
                  className="px-8"
                  onClick={async () => {
                    const { data, error } = await donateMoney();
                    if (error) {
                      toast.error("Something went wrong");
                    }
                    if (data) {
                      router.push(data?.payment_url);
                    }
                  }}
                >
                  Donate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
