"use server";

import { and, eq } from "drizzle-orm";
import { auth, signIn } from "../db/auth";
import { db } from "./drizzle";
import {
  products,
  productVariants,
  reviews,
  users,
  variantImages,
  variantTags,
} from "./schema";
import { createSafeActionClient } from "next-safe-action";
import { object, z } from "zod";
import { findUser, getUsers } from "../lib/utils";
import bcrypt from "bcrypt";

import {
  generateemailVarifivationToken,
  sendverificationEmail,
} from "./tokens";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { VariantSchema } from "../components/main/product/ProductVarient";
import { reviewSchema } from "../components/main/review/ReviewForm";
import { formSettings } from "../app/dashboard/settings/Cardsettings";

export const signinwithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const signinwithGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};

const actionClient = createSafeActionClient();

const formSignin = z.object({
  email: z.string().email({
    message: "email is not invalid",
  }),
  password: z.string().min(8, {
    message: "password is required.",
  }),
});

const formSignup = z.object({
  username: z.string().min(4, {
    message: "username is not invalid",
  }),
  email: z.string().email({
    message: "email is not invalid",
  }),
  password: z.string().min(8, {
    message: "password is required.",
  }),
});

const productype = z.object({
  id: z.number().optional(),
  description: z.string().min(8, {
    message: "description must be atleast 8 char1cters",
  }),
  title: z.string(),
  price: z.coerce
    .number({ invalid_type_error: "price must be number" })
    .positive({ message: "price mist be positive number" }),
});

export const emailSignin = actionClient
  .schema(formSignin)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log(email, password);

    const findingUser = await findUser(email);
    console.log(findingUser);
    if (findingUser[0]?.email == email) {
      await signIn("credentials", { email, password, redirectTo: "/" });
      return { message: "success" };
    } else if (findingUser[0]?.email !== email) {
      return { message: "error" };
    }

    // else {
    //   console.log(email, password);
    //   await signIn("credentials", { email, password, redirectTo: "/" });
    //   return { message: "success" };
    // }
  });

export const emailSignup = actionClient.schema(formSignup).action(
  async ({ parsedInput: { username, email, password } }) => {
    const hashpassword = await bcrypt.hash(password, 10);
    // console.log(hashpassword);
    const findingUser = await findUser(email);
    // console.log(findingUser);
    // console.log(findingUser.length);
    if (findingUser.length == 0) {
      await db.insert(users).values({
        name: username,
        password: hashpassword,
        email: email,
      });
      const verificationToken = await generateemailVarifivationToken(email);
      console.log(verificationToken);
      await sendverificationEmail(
        verificationToken[0].email,
        verificationToken[0].token
      );
      return { message: "success" };
    } else {
      return { message: "error" };
    }
  },

  {
    onSuccess: ({ data }) => {
      console.log(data);
    },
  }
);

export const delete_product = async (id) => {
  try {
    const data = await db.delete(products).where(eq(products.id, id));
    revalidatePath("/dashboard/products");
  } catch (error) {
    console.log(error);
  }
};
export const create_product = actionClient.schema(productype).action(
  async ({ parsedInput: { description, title, price, id } }) => {
    console.log(price, id);

    try {
      if (!id) {
        const newProduct = await db
          .insert(products)
          .values({ description, title, price });
        revalidatePath("/dashboard/create-product");
        return { message: "محصول با موفقیت ساخته شد!" };
      }

      if (id) {
        const editProduct = await db
          .update(products)
          .set({ description, title, price })
          .where(eq(products.id, id));
        return { message: "محصول با موفقیت آپدیت شد." };
      }
    } catch (error) {
      console.log(error);
      return { message: error };
    }
  },
  {
    onSuccess: ({ data }) => {
      console.log(data);
    },
  }
);

export const create_variant = async (formData) => {
  const {
    color,
    productType,
    editMode,
    id,
    productID,
    tags,
    variantImages: newImgs,
  } = formData;
  try {
    if (editMode) {
      const editVariant = await db
        .update(productVariants)
        .set({ color, productType, updated: new Date() })
        .where(eq(productVariants.id, id))
        .returning();
      await db
        .delete(variantTags)
        .where(eq(variantTags.variantID, editVariant[0].id));
      await db.insert(variantTags).values(
        tags.map((tag) => ({
          tag,
          variantID: editVariant[0].id,
        }))
      );
      await db
        .delete(variantImages)
        .where(eq(variantImages.variantID, editVariant[0].id));
      await db.insert(variantImages).values(
        newImgs.map((img, idx) => ({
          name: img.name,
          size: img.size,
          url: img.url,
          variantID: editVariant[0].id,
          order: idx,
        }))
      );
      algoliaIndex.partialUpdateObject({
        objectID: editVariant[0].id.toString(),
        id: editVariant[0].productID,
        productType: editVariant[0].productType,
        variantImages: newImgs[0].url,
      });
      revalidatePath("/dashboard/products");
      return { success: `Edited ${productType}` };
    }
    if (!editMode) {
      const newVariant = await db
        .insert(productVariants)
        .values({
          color,
          productType,
          productID,
        })
        .returning();

      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productID));
      await db.insert(variantTags).values(
        tags.map((tag) => ({
          tag,
          variantID: newVariant[0].id,
        }))
      );
      await db.insert(variantImages).values(
        newImgs.map((img, idx) => ({
          name: img.name,
          size: img.size,
          url: img.url,
          variantID: newVariant[0].id,
          order: idx,
        }))
      );
      if (product) {
        algoliaIndex.saveObject({
          objectID: newVariant[0].id.toString(),
          id: newVariant[0].productID,
          title: product.title,
          price: product.price,
          productType: newVariant[0].productType,
          variantImages: newImgs[0].url,
        });
      }
      revalidatePath("/dashboard/products");
      return { success: `Added ${productType}` };
    }
  } catch (error) {
    return { error: "Failed to create variant" };
  }
};

export const delete_variant = async (variantID) => {
  try {
    const delete_variant = await db
      .delete(productVariants)
      .where(eq(productVariants.id, variantID));
  } catch (error) {
    console.log(error);
  }
};

export const addReview = async (formData) => {
  const { productID, rating, comment } = formData;
  console.log(productID);

  const session = await auth();
  console.log(session);

  const reviewExisted = await db
    .select()
    .from(reviews)
    .where(
      and(eq(reviews.productID, productID), eq(reviews.userID, session.user.id))
    );

  // console.log(reviewExisted);

  if (reviewExisted.length === 0) {
    const newReview = await db
      .insert(reviews)
      .values({
        productID,
        rating,
        comment,
        userID: session.user.id,
      })
      .returning();
    console.log(newReview);
  } else {
    console.log("شما قبلا برای این محصول نظر ثبت کردید.");
  }
};

export const updateUser = async (values) => {
  console.log(values);
  const session = await auth();
  console.log(session);

  if (!session) return { error: "کاربر یافت نشد." };
  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));
  console.log(dbUser);

  if (values.password && values.newPassword && dbUser[0].password) {
    const passwordMatch = await bcrypt.compare(
      values?.password,
      dbUser[0].password
    );
    console.log(passwordMatch);

    if (!passwordMatch) {
      return { error: "رمز عبور صحیح نمی باشد." };
    }
    const hashPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashPassword;
    values.newPassword = undefined;
    console.log(hashPassword);
  }

  const UpdateUser = await db
    .update(users)
    .set({
      name: values.name,
      password: values.password,
      image: values.image,
    })
    .where(eq(users.id, dbUser[0].id))
    .returning();
  console.log(UpdateUser);

  revalidatePath("/dashboard/settings");
};
