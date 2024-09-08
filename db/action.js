"use server";

import { eq } from "drizzle-orm";
import { signIn } from "../db/auth";
import { db } from "./drizzle";
import { products, users } from "./schema";
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
