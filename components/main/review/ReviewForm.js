"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { Star } from "lucide-react";
import { cn } from "../../../lib/utils";
import { addReview } from "../../../db/action";

export const reviewSchema = z.object({
  productID: z.number(),
  rating: z.number().min(1, { message: "لطفا حداقل یک ستاره بدهید" }).max(5),
  comment: z
    .string()
    .min(10, { message: "لطفا نظر خود را در حداقل 10 کلمه بیان کنید" }),
});
function ReviewForm() {
  // const { execute, status, result } = useAction(addReview);
  function onSubmit(values) {
    // execute(values);
    console.log(values);
    addReview(values);
  }
  const param = useSearchParams();
  const productID = Number(param.get("id"));
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productID,
      comment: "",
      rating: 0,
    },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <span className="px-3 py-1 bg-primary text-white rounded-md">
          نظر خود را بذارید.
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* <FormField
              control={form.control}
              name="productID"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="hidden" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نظر خود را بنویسید</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>امتیاز خود را واردکنید</FormLabel>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => {
                      return (
                        <div className="relative cursor-pointer">
                          <Star
                            onClick={() => {
                              form.setValue("rating", value);
                            }}
                            className={cn(
                              "text-primary bg-transparent transition-all duration-300 ease-in-out",
                              form.getValues("rating") >= value
                                ? "text-primary "
                                : "text-gray-400"
                            )}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              افزودن نظر
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export default ReviewForm;
