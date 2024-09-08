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
import { useSearchParams } from "next/navigation";
import { db } from "../../../db/drizzle";
import { products } from "../../../db/schema";
import { useEffect } from "react";
import { eq } from "drizzle-orm";
import { CardTitle } from "../../ui/card";

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
  const searchParam = useSearchParams();
  const editMode = searchParam.get("id");
  const checkProduct = async () => {
    if (editMode) {
      try {
        const data = await db
          .select()
          .from(products)
          .where(eq(products.id, editMode));
        console.log(data);

        if (data.length > 0) {
          form.setValue("title", data[0].title);
          form.setValue("description", data[0].description);
          form.setValue("price", data[0].price);
          form.setValue("id", data[0].id);

          return { message: "success" };
        } else {
          return { message: "محصول مورد نظر یافت نشد" };
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    checkProduct();
  }, []);

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
    <>
      <CardTitle className="mb-4">
        {editMode ? "ادیت محصول" : "ساختن محصول"}
      </CardTitle>
      <Form className="" {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان</FormLabel>
                <FormControl>
                  <Input
                    className="hidden"
                    type="number"
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
                  <Tiptap value={field.value} />
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
            {status === "executing"
              ? "در حال ساخت"
              : `${editMode ? "اصلاح" : "ساختن"}`}
          </Button>
          {result?.data?.message && (
            <Mainalert
              variant="success"
              message={result.data.message}
              title="موفق"
            />
          )}
        </form>
      </Form>
    </>
  );
}

export default ProductForm;
