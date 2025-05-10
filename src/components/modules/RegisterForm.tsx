// RegisterForm.tsx
"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidationSchema } from "./RegisterValidation";
import { registerUser } from "@/services/AuthServices";
import { toast } from "sonner";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(RegisterValidationSchema),
  });
  const isSubmitted = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await registerUser(data);
    console.log(res);
    if (res.success) {
      toast.success("Registered Succesfully");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-rose-50 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 border border-rose-200">
        <h2 className="text-3xl font-bold text-rose-600 text-center">
          Register
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Enter your username"
                      {...field}
                      value={field.value || ""}
                    />
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
                  <FormLabel className="text-rose-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      value={field.value || ""}
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
                  <FormLabel className="text-rose-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold"
            >
              {isSubmitted ? "Creating.." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-rose-600 hover:underline font-medium"
          >
            Please login
          </Link>
        </p>
      </div>
    </div>
  );
}
