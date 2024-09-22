import { redirect } from "next/navigation";
import { auth } from "../../../db/auth";
import Cardsettings from "./Cardsettings";

async function page() {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <Cardsettings session={session} />
    </>
  );
}

export default page;
