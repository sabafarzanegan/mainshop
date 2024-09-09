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
import { products, productVariants, variantImages } from "../../../db/schema";
import { useEffect, useState } from "react";
import ProductVarient from "./ProductVarient";
import { eq } from "drizzle-orm";

function Datatable({ header }) {
  const [data, setData] = useState([]);
  const [Images, setImages] = useState([]);

  const getImageVarient = async () => {
    const Image = await db
      .select()
      .from(productVariants)
      .fullJoin(variantImages, eq(productVariants.id, variantImages.variantID));
    setImages(Image);
  };

  const specificProduct = async () => {
    const varients = await db
      .select()
      .from(products)
      .fullJoin(productVariants, eq(products.id, productVariants.productID))
      .fullJoin(variantImages, eq(productVariants.id, variantImages.variantID));

    setData(varients);
  };

  // const getData = async () => {
  //   const allData = await db.select().from(products);

  //   const datatable = allData.map((product) => {
  //     return {
  //       id: product.id,
  //       title: product.title,
  //       price: product.price,
  //       image: "",
  //       varients: [],
  //     };
  //   });
  // };
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
                    item.variantImages
                      ? item.variantImages.url
                      : "https://placehold.co/600x400"
                  }
                  className="e-8 h-8"
                />
              </TableCell>
              <TableCell className="flex items-center justify-center gap-x-4">
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ProductVarient
                          editMode={true}
                          productID={item?.productVariants?.productID}
                          varient={item?.productVariants}
                          variantImages={item?.variantImages}>
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ background: item?.productVariants?.color }}
                          />
                        </ProductVarient>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <ProductVarient productID={item.id} editMode={false}>
                          <PlusCircle className="h-4 w-4 cursor-pointer" />
                        </ProductVarient>
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
                        <form action={() => delete_product(item.id)}>
                          <Button
                            variant="destructive"
                            className="text-xs px-4">
                            حذف
                          </Button>
                        </form>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center justify-between">
                        <Pen className="w-4 h-4" />
                        <Link href={`/dashboard/create-product?id=${item.id}`}>
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
