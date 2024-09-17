import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import {
  products,
  productVariants,
  variantImages,
  variantTags,
} from "../db/schema";
import ProductSection from "../components/main/product/ProductSection";
export default async function Home() {
  const allProducts = await db
    .select()
    .from(products)
    .fullJoin(productVariants, eq(products.id, productVariants.productID))
    .fullJoin(variantImages, eq(productVariants.id, variantImages.variantID))
    .fullJoin(variantTags, eq(productVariants.id, variantTags.variantID));
  // const productss = await db
  //   .select()
  //   .from(productVariants)
  //   .fullJoin(products, eq(productVariants.productID, products.id))
  //   .fullJoin(variantImages, eq(productVariants.id, variantImages.variantID))
  //   .fullJoin(variantTags, eq(productVariants.id, variantTags.variantID));
  // console.log(productss);

  const organizedVariants = [];

  allProducts.forEach((item) => {
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

  return (
    <main className="my-2">
      <ProductSection data={organizedVariants} />
    </main>
  );
}
