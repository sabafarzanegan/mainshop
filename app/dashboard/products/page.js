import { db } from "../../../db/drizzle";
import { products } from "../../../db/schema";
import Datatable from "../../../components/main/product/data-table";
import { columns } from "../../../components/main/product/columns";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Gridi
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

async function page() {
  const allProducts = await db.select().from(products);
  console.log(allProducts);
  if (!allProducts) return <h2>محصولی وجود ندارد</h2>;
  const datatable = allProducts.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: "https://fakeimg.pl/600x400",
      varients: [],
    };
  });

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>لیست محصولات</CardTitle>
        </CardHeader>
        <CardContent>
          <Datatable data={datatable} header={columns} />
        </CardContent>
      </Card>
    </>
  );
}

export default page;
