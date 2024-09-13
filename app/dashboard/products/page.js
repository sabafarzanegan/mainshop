import Datatable from "../../../components/main/product/data-table";
import { columns } from "../../../components/main/product/columns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { db } from "../../../db/drizzle";
import {
  products,
  productVariants,
  variantImages,
  variantTags,
} from "../../../db/schema";
import { eq } from "drizzle-orm";

async function page() {
  // const varients = await db
  //   .select()
  //   .from(products)
  //   .fullJoin(productVariants, eq(products.id, productVariants.productID))
  //   .fullJoin(variantImages, eq(productVariants.id, variantImages.variantID))
  //   .fullJoin(variantTags, eq(productVariants.id, variantTags.variantID));
  // const organizedVariants = [];

  // varients.forEach((item) => {
  //   let existingProduct = organizedVariants.find(
  //     (variant) => variant.products.id === item.products.id
  //   );

  //   if (existingProduct) {
  //     if (item.productVariants) {
  //       const existingVariant = existingProduct.productVariants.find(
  //         (variant) => variant.id === item.productVariants.id
  //       );
  //       if (!existingVariant) {
  //         existingProduct.productVariants.push(item.productVariants);
  //       }
  //     }

  //     if (item.variantImages) {
  //       const existingImage = existingProduct.variantImages.find(
  //         (image) => image.id === item.variantImages.id
  //       );
  //       if (!existingImage) {
  //         existingProduct.variantImages.push(item.variantImages);
  //       }
  //     }

  //     if (item.variantTags) {
  //       const existingTag = existingProduct.variantTags.find(
  //         (tag) => tag.id === item.variantTags.id
  //       );
  //       if (!existingTag) {
  //         existingProduct.variantTags.push(item.variantTags);
  //       }
  //     }
  //   } else {
  //     organizedVariants.push({
  //       products: item.products,
  //       productVariants: item.productVariants ? [item.productVariants] : [],
  //       variantImages: item.variantImages ? [item.variantImages] : [],
  //       variantTags: item.variantTags ? [item.variantTags] : [],
  //     });
  //   }
  //   JSON.stringify(organizedVariants);
  //   return organizedVariants;
  // });
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>لیست محصولات</CardTitle>
        </CardHeader>
        <CardContent>
          <Datatable header={columns} />
        </CardContent>
      </Card>
    </>
  );
}

export default page;
