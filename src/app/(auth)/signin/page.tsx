"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().min(8, {
    message: "Email must be at least 8 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.ok) {
      toast.success("Signin Successful", {
        autoClose: 1500,
      });
      router.push("/");
    } else {
      toast.error("Invalid Credentials", {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="flex h-screen border w-screen justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" border flex flex-col gap-2  px-4 py-3 rounded sm:px-8 sm:py-6"
        >
          <FormDescription className="text-center text-2xl font-semibold">
            Login
          </FormDescription>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="w-72 sm:w-80"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Signin
            </Button>
          </div>
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => signIn("google")}
            className="mt-1"
          >
            <FcGoogle className="mr-2 text-xl" />
            Google
          </Button>
          <FormDescription className="text-center font-semibold">
            Don't have an account ?
            <Link href={"/signup"} className="underline text-black ml-1">
              Signup
            </Link>
          </FormDescription>
        </form>
      </Form>
    </div>
  );
}
