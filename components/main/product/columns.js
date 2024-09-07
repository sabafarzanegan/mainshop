
export const columns = [
  { field: "شناسه" },
  { field: "عنوان" },
  { field: "قیمت" },
  { field: "تصویر" },
  { field: "متغیرها" },
  { field: "عملیات" },
];

// import { ColumnDef } from "@tanstack/react-table";
// import { Currency, MoreHorizontal } from "lucide-react";

// export const Columns = [
//   {
//     accessorekey: "id",
//     header: "شناسه",
//   },
//   {
//     accessorekey: "title",
//     header: "عنوان",
//   },
//   {
//     accessorekey: "varients",
//     header: "متغیرها",
//   },
//   {
//     accessorekey: "price",
//     header: "قیمت",
//     cell: ({ row }) => {
//       const price = parseFloat(row.getValue("price"));
//       const formmatted = new Intl.NumberFormat("en-US", {
//         currency: "USD",
//         style: "currency",
//       }).format(price);
//       return <div>{formmatted}</div>;
//     },
//   },
//   {
//     accessorekey: "image",
//     header: "عکس",
//   },

//   {
//     accessorekey: "actions",
//     header: "عملیات",
//   },
// ];

// import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }
