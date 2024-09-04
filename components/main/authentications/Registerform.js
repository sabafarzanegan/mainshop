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
import { emailSignup } from "../../../db/action";
import { useAction } from "next-safe-action/hooks";
import Mainalert from "../Mainalert";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "username is required.",
  }),
  email: z.string().email({
    message: "email is not invalid",
  }),
  password: z.string().min(8, {
    message: "password is required.",
  }),
});

function Registerform() {
  const { execute, status, result } = useAction(emailSignup);

  function onSubmit(values) {
    execute(values);
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      naem: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="asdbkgn@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {result?.data?.message === "error" && (
                  <Mainalert
                    className="w-[40%] mt-10 inline-block"
                    title="خطا"
                    variant="destructive"
                    message="این ایمیل از  قبل ثبت شده است"
                  />
                )}
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
            {status === "executing" ? "در حال ارسال" : "ثبت نام"}
          </Button>
        </form>
      </Form>
      <div>
        <div className="mt-8">
          {result?.data?.message === "success" && (
            <Mainalert
              title="موفقیت"
              variant="success"
              message="ایمیل تایید برای شما ارسال شد."
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Registerform;
