"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Donation Successful!
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for your charity. Your money will be wisely utitlized.
        </p>
        <div className="text-center">
          <Button onClick={() => router.push("/")}>Home</Button>
        </div>
      </div>
    </div>
  );
}
