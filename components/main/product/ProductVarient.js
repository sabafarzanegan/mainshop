"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import InputTags from "./InputTags";
import VariantImages from "./VarientImage";

import { create_variant, delete_variant } from "../../../db/action";

import { forwardRef, useEffect, useState } from "react";

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
  variantImages: z
    .array(
      z.object({
        url: z.string().refine((url) => url.search("blob:") !== 0, {
          message: "Please wait for the image to upload",
        }),
        size: z.number(),
        key: z.string().optional(),
        id: z.number().optional(),
        name: z.string(),
      })
    )
    .min(1, { message: "You must provide at least one image" }),
});

const ProductVariant = forwardRef(
  ({ children, editMode, productID, variant }, ref) => {
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

    const [open, setOpen] = useState(false);

    function onSubmit(values) {
      create_variant(values);
      form.reset();
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="w-[60%] overflow-y-scroll h-[600px]">
          <DialogHeader>
            <DialogTitle>variants</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان متغیر</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pick a title for your variant"
                        {...field}
                      />
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
                    <FormLabel>برچسب ها</FormLabel>
                    <FormControl>
                      <InputTags
                        {...field}
                        onChange={(e) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <VariantImages />
              <div className="flex gap-4 items-center justify-center">
                {editMode && variant && (
                  <Button
                    variant={"destructive"}
                    type="button"
                    onClick={() =>
                      delete_variant(variant.productVariants[0].id)
                    }>
                    حدف متغیر
                  </Button>
                )}
                {!editMode && (
                  <Button
                    disabled={
                      !form.formState.isValid || !form.formState.isDirty
                    }
                    type="submit">
                    ساختن متتغیر
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);
export default ProductVariant;
ProductVariant.displayName = "ProductVariant";
