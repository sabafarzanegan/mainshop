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

import Mainalert from "../Mainalert";
const formSchema = z.object({
  email: z.string().email({
    message: "email is not invalid",
  }),
  password: z.string().min(1, {
    message: "password is required.",
  }),
});

function RhfLogin() {
  const { execute, status, result } = useAction(emailSignin);
  function onSubmit(values) {
    execute(values);
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
          <Button
            disabled={status === "executing"}
            type="submit"
            className="w-full bg-primary hover:bg-primary ">
            {status === "executing" ? "در حال ورود" : "ورود"}
          </Button>
          {result?.data?.message === "success" && (
            <Mainalert
              title="موفقیت"
              variant="success"
              message="ورود با موفقیت انجام شد."
            />
          )}
          {result?.data?.message === "error" && (
            <Mainalert
              title="شکست"
              variant="destructive"
              message="دوباره تلاش کنید."
            />
          )}
        </form>
      </Form>
    </>
  );
}

export default RhfLogin;
