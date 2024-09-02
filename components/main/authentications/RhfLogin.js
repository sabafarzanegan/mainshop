"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emailSignin } from "../../../db/action";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
const formSchema = z.object({
  email: z.string().email({
    message: "email is not invalid",
  }),
  password: z.string().min(1, {
    message: "password is required.",
  }),
});

function RhfLogin() {
  const [error, setError] = useState("");

  const { execute, status } = useAction(emailSignin, {
    onSuccess(data) {
      console.log(data);
    },
  });
  function onSubmit(values) {
    execute(values);
    console.log(values);
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="asdbkgn@gmail.com"
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
                <FormLabel>رمز</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary ">
            ورود
          </Button>
        </form>
      </Form>
    </>
  );
}

export default RhfLogin;
