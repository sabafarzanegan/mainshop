"use client";
import { Ellipsis, Pen, PlusCircle, Trash } from "lucide-react";
import { Button } from "../../ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { delete_product } from "../../../db/action";
import Link from "next/link";
import { db } from "../../../db/drizzle";
import {
  products,
  productVariants,
  variantImages,
  variantTags,
} from "../../../db/schema";
import { useState, useEffect } from "react";
import ProductVariant from "./ProductVarient";
import { eq } from "drizzle-orm";

function Datatable({ header }) {
  const [data, setData] = useState([]);

  const specificProduct = async () => {
    const varients = await db
      .select()
      .from(products)
      .fullJoin(productVariants, eq(products.id, productVariants.productID))
      .fullJoin(variantImages, eq(productVariants.id, variantImages.variantID))
      .fullJoin(variantTags, eq(productVariants.id, variantTags.variantID));
    const organizedVariants = [];

    varients.forEach((item) => {
      let existingProduct = organizedVariants.find(
        (variant) => variant.products.id === item.products.id
      );

      if (existingProduct) {
        if (item.productVariants) {
          const existingVariant = existingProduct.productVariants.find(
            (variant) => variant.id === item.productVariants.id
          );
          if (!existingVariant) {
            existingProduct.productVariants.push(item.productVariants);
          }
        }

        if (item.variantImages) {
          const existingImage = existingProduct.variantImages.find(
            (image) => image.id === item.variantImages.id
          );
          if (!existingImage) {
            existingProduct.variantImages.push(item.variantImages);
          }
        }

        if (item.variantTags) {
          const existingTag = existingProduct.variantTags.find(
            (tag) => tag.id === item.variantTags.id
          );
          if (!existingTag) {
            existingProduct.variantTags.push(item.variantTags);
          }
        }
      } else {
        organizedVariants.push({
          products: item.products,
          productVariants: item.productVariants ? [item.productVariants] : [],
          variantImages: item.variantImages ? [item.variantImages] : [],
          variantTags: item.variantTags ? [item.variantTags] : [],
        });
      }
    });
    setData(organizedVariants);
  };

  useEffect(() => {
    specificProduct();
  }, [data]);

  return (
    <>
      <Table className="overflow-x-hidden">
        <TableHeader className="">
          <TableRow className="">
            {header.map((cell) => (
              <TableHead className="align-middle text-right">
                {cell.field}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.map((item) => (
            <TableRow key={item.products.id} className="n">
              <TableCell>{item.products.id}</TableCell>
              <TableCell className="text-sm">{item.products.title}</TableCell>
              <TableCell className="flex items-center justify-center gap-x-1">
                {item.products.price.toLocaleString("fa")}
                <span>تومان</span>
              </TableCell>
              <TableCell>
                <img
                  src={
                    item.variantImages[0]
                      ? item.variantImages[0].url
                      : "https://placehold.co/600x400"
                  }
                  className="e-8 h-8"
                />
              </TableCell>
              <TableCell className="flex items-center justify-center gap-x-4">
                <div className="flex items-center justify-center gap-x-2">
                  {item.productVariants.map((varient) => (
                    <div className="">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ProductVariant
                              editMode={true}
                              productID={varient.productID}
                              variant={item}>
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                  background: varient.color,
                                }}
                              />
                            </ProductVariant>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <ProductVariant
                          productID={item.products.id}
                          editMode={false}>
                          <PlusCircle className="h-4 w-4 cursor-pointer" />
                        </ProductVariant>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ساختن متغیر جدید</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="flex items-center justify-between">
                        <Trash className="w-4 h-4" />
                        <form
                          onClick={() => {
                            delete_product(item.products.id);
                          }}>
                          <Button
                            variant="destructive"
                            className="text-xs px-4">
                            حذف
                          </Button>
                        </form>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center justify-between">
                        <Pen className="w-4 h-4" />
                        <Link
                          href={`/dashboard/create-product?id=${item.products.id}`}>
                          <Button>ادیت</Button>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Datatable;
