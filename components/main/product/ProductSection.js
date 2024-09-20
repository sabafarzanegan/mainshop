import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import Image from "next/image";
import { Badge } from "../../ui/badge";
function ProductSection({ data }) {
  //   console.log(data);

  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {data.map((product) => (
        <Link
          key={product?.products?.id}
          href={`/products/${product?.products?.id}?id=${product?.products?.id}&productID=${product?.productVariants[0]?.id}&price=${product?.products?.price}&title=${product?.products?.title}&type=${product?.productVariants[0]?.productType}&image=${product?.variantImages[0]?.url}`}>
          <Card className="">
            <CardHeader>
              <Image
                width={620}
                height={480}
                src={product.variantImages[0]?.url}
                alt={product.variantImages[0]?.name}
                loading="lazy"
                className="rounded-md"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h2 className="font-semibold text-base">
                  {product.products.title}
                </h2>
                <h5 className="text-sm">
                  <span className="">نوع محصول:</span>
                  {product.productVariants[0]?.productType}
                </h5>
              </div>
              <div className="">
                <Badge variant="secondary" className="text-base">
                  {product.products.price.toLocaleString("fa")}تومان
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </main>
  );
}

export default ProductSection;
