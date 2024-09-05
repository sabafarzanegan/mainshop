"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Tiptap from "./Tiptab";
import { useAction } from "next-safe-action/hooks";
import { create_product } from "../../../db/action";
import Mainalert from "../Mainalert";

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string().min(8, {
    message: "description must be atleast 8 char1cters",
  }),
  price: z.coerce
    .number({ invalid_type_error: "price must be number" })
    .positive({ message: "price mist be positive number" }),
});

function ProductForm() {
  const { execute, status, result, reset } = useAction(create_product);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
    mode: "onChange",
  });
  function onSubmit(values) {
    execute(values);
  }
  return (
    <Form className="" {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="عنوان مورد نظر را وارد کنید"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Tiptap value={form.value} />
                {/* <Input placeholder="توضیحات مورد نظر را وارد کنید" {...field} /> */}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="قیمت مورد نظر را وارد کنید"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={status === "executing"} type="submit">
          {status === "executing" ? "در حال ساخت" : "ساختن"}
        </Button>
        {result?.data?.message === "success" && (
          <Mainalert
            variant="success"
            message="محصول با موفقیت اضافه شد."
            title="موفق"
          />
        )}
      </form>
    </Form>
  );
}

export default ProductForm;
