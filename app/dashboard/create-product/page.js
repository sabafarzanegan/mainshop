import { redirect } from "next/navigation";
import { auth } from "../../../db/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import ProductForm from "../../../components/main/product/ProductForm";

async function page() {
  const session = await auth();
  console.log(session);

  if (session?.user.role !== "admin") return redirect("/");
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ساختن محصول جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </>
  );
}

export default page;
