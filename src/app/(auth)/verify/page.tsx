"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyUser } from "@/actions/auth.action";
import { toast } from "react-toastify";

type Input = {
  otp: number;
};

export default function Page() {
  const parmas = useSearchParams();
  const router = useRouter();

  const otpSchema = z.object({
    otp: z
      .string()
      .min(6, "6 digits are required")
      .max(6, "6 digits are required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const { message, error } = await verifyUser(
      data?.otp as number,
      parmas.get("email") as string
    );
    if (error) {
      toast.error(error, {
        autoClose: 1500,
      });
    } else {
      toast.success(message, {
        autoClose: 1500,
      });
      router.push("/signin");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border flex flex-col gap-2 px-5 py-8 rounded"
      >
        <p className="text-center font-semibold">OTP Verification</p>
        <Input
          type="number"
          placeholder="Enter the OTP"
          className="w-72 mt-4"
          {...register("otp")}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm">{errors?.otp?.message}</p>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}
