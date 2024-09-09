import React, { useEffect } from "react";
import { Input } from "../../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
} from "../../ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
export const VariantSchema = z.object({
  productID: z.number(),
  id: z.number().optional(),
  editMode: z.boolean(),
  productType: z
    .string()
    .min(3, { message: "Product type must be at least 3 characters long" }),
  color: z
    .string()
    .min(3, { message: "Color must be at least 3 characters long" }),
  tags: z.array(z.string()).min(1, {
    message: "You must provide at least one tag",
  }),
  variantImages: z.object({
    url: z.string().refine((url) => url.search("blob:") !== 0, {
      message: "Please wait for the image to upload",
    }),
    size: z.number(),
    key: z.string().optional(),
    id: z.number().optional(),
    name: z.string(),
  }),
});

function ProductVarient({
  productID,
  editMode,
  varient,
  variantImages,
  children,
}) {
  const form = useForm({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      tags: [],
      variantImages: [],
      color: "#000000",
      editMode,
      id: undefined,
      productID,
      productType: "",
    },
  });
  function onSubmit(values) {
    console.log(values);
  }
  useEffect(() => {
    console.log(varient);
  }, [varient]);
  return (
    <Dialog className="text-right space-t-4">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right font-semibold  mt-4">
            {editMode ? "اصلاح متغیر" : "ساختن متغیر"}
          </DialogTitle>
          <DialogDescription className="text-right">
            تغییرات مورد نظر خود را اعمال کنید
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع محصول</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رنگ</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    {/* <InputTags {...field} onChange={(e) => field.onChange(e)} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button type="submit">
                {editMode ? "ذخیره تغییرات" : "ایجاد تغییر"}
              </Button>
              {editMode && varient?.id && (
                <Button type="button" className="bg-red-500 hover:bg-red-400">
                  حذف متغیر
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductVarient;
