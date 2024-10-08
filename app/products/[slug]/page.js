import { db } from "../../../db/drizzle";
import { eq } from "drizzle-orm";
import {
  products,
  productVariants,
  variantImages,
  variantTags,
} from "../../../db/schema";
import ProductPick from "../../../components/main/product/ProductPick";
import ProductShow from "../../../components/main/product/ProductShow";
import ReviewForm from "../../../components/main/review/ReviewForm";
import { auth } from "../../../db/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import AllReview from "../../../components/main/review/AllReview";
import Addcart from "../../../components/main/cart/Addcart";
async function page({ params }) {
  console.log(params);

  const session = await auth();

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, params.slug))
    .fullJoin(productVariants, eq(productVariants.productID, params.slug))
    .fullJoin(variantImages, eq(variantImages.variantID, productVariants.id))
    .fullJoin(variantTags, eq(variantTags.variantID, productVariants.id));

  const organizedVariants = [];

  product.forEach((item) => {
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
    <main className="w-full space-y-6 py-10">
      <section className=" mx-auto flex flex-wrap-reverse md:flex-nowrap gap-y-6 justify-center md:justify-between gap-x-10 items-center md:items-start">
        {/* information div */}
        <div className="flex gap-2 flex-col flex-1 space-y-6 ">
          {/* title div */}
          <div className="py-3 space-y-4 px-1 border-b border-b-gray-300">
            <h1 className="font-bold text-base">
              {organizedVariants[0]?.products?.title}
            </h1>
            <span className="text-xs font-semibold">
              {organizedVariants[0]?.productVariants[0].productType}
            </span>
          </div>
          <div>
            <h4 className="text-lg font-semibold">
              {organizedVariants[0]?.products.price.toLocaleString("fa")}تومان
            </h4>
          </div>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: organizedVariants[0]?.products.description,
            }}></div>
          <div className="space-y-4">
            <div className="flex items-center  gap-x-2">
              {organizedVariants[0]?.productVariants.map((color) => (
                <ProductPick
                  variant={color}
                  productID={organizedVariants[0].products.id}
                  title={organizedVariants[0]?.products.title}
                  price={organizedVariants[0]?.products.price}
                  image={organizedVariants[0]?.variantImages}
                />
              ))}
            </div>
          </div>
          <Addcart />
        </div>

        <div className="">
          <ProductShow variants={organizedVariants} />
        </div>
      </section>
      {session?.user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-x-4">
              <p className="text-lg font-semibold text-primary">
                {session?.user?.email}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewForm />
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>نظرات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <AllReview productID={params.slug} />
        </CardContent>
      </Card>
    </main>
  );
}

export default page;
