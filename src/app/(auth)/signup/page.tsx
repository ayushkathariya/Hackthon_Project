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
import { signupUser } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(8, {
    message: "Email must be at least 8 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Page() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("User");

  const handleRoleChange = (e: any) => {
    setSelectedRole(e.target.value);
  };

  useEffect(() => {
    console.log(selectedRole);
  }, [selectedRole]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error, message } = await signupUser(
      values?.name,
      values?.email,
      values?.password,
      selectedRole
    );
    if (error) {
      toast.error(error, {
        autoClose: 1500,
      });
      return;
    } else {
      toast.success(message, {
        autoClose: 1500,
      });
      router.push(`/verify?email=${values?.email}`);
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
            Signup
          </FormDescription>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className="w-72 sm:w-80"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <label htmlFor="roleSelect">Select Role:</label>
          <select
            id="roleSelect"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="User">User</option>
            <option value="Organization">Organization</option>
          </select>
          <div className="mt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Signup
            </Button>
          </div>
          <Button
            variant="secondary"
            type="button"
            onClick={() => signIn("google")}
            className="mt-1"
          >
            <FcGoogle className="mr-2 text-xl" />
            Google
          </Button>
          <FormDescription className="text-center font-semibold">
            Already have an account ?{" "}
            <Link href={"/signin"} className="underline text-black">
              Signin
            </Link>
          </FormDescription>
        </form>
      </Form>
    </div>
  );
}
