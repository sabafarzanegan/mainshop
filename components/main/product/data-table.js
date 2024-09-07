"use client";
import { Ellipsis, Pen, Trash } from "lucide-react";
import { Button } from "../../ui/button";
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

function Datatable({ data, header }) {
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
            <TableRow className="n">
              <TableCell>{item.id}</TableCell>
              <TableCell className="text-sm">{item.title}</TableCell>
              <TableCell className="flex items-center justify-center gap-x-1">
                {item.price.toLocaleString("fa")}
                <span>تومان</span>
              </TableCell>
              <TableCell>
                <img className="w-10 h-8" src={item.image} alt="" />
              </TableCell>
              <TableCell>{item.varients}</TableCell>
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
                        <Button>ادیت</Button>
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
