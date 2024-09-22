"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";

import { useAction } from "next-safe-action/hooks";
import { updateUser } from "../../../db/action";
import { UploadButton } from "../../api/uploadthing/uoload";

export const formSettings = z.object({
  name: z.optional(z.string()),
  image: z.optional(z.string()),

  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(8)),
  newPassword: z.optional(z.string().min(8)),
});
function Cardsettings({ session }) {
  const form = useForm({
    resolver: zodResolver(formSettings),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      email: session.user?.email || undefined,
      name: session.user?.name || undefined,
      image: session.user?.image || undefined,
    },
  });

  function onSubmit(values) {
    updateUser(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`سلام ${session?.user?.name}`}</CardTitle>
        <CardDescription>
          میتوانید اطلاعات کاربری خود را تغییر دهید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام کاربری</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              type="hidden"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تصویر کاربر</FormLabel>
                  <div>
                    {!form.getValues("image") && (
                      <div>{session.user?.name.charAt(0).toUpperCase()}</div>
                    )}
                    {form.getValues("image") && (
                      <img
                        className="rounded-full w-8 h-8"
                        src={form.getValues("image")}
                      />
                    )}

                    <UploadButton
                      className="scale-75 ut-button:ring-primary  ut-label:bg-red-50  ut-button:bg-primary/75  hover:ut-button:bg-primary/100 ut:button:transition-all ut-button:duration-500  ut-label:hidden ut-allowed-content:hidden"
                      endpoint="avatarUploader"
                      onUploadBegin={() => {
                        // setAvatarUploading(true);
                      }}
                      onUploadError={(error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        });
                        // setAvatarUploading(false);
                        return;
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url);
                        // setAvatarUploading(false);
                        return;
                      }}
                      content={{
                        button({ ready }) {
                          if (ready) return <div>Change Avatar</div>;
                          return <div>Uploading...</div>;
                        },
                      }}
                    />
                  </div>
                  <FormControl>
                    <Input type="hidden" placeholder="shadcn" {...field} />
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
                    <Input disabled placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز جدید</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">ذخیره تغییرات</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Cardsettings;
