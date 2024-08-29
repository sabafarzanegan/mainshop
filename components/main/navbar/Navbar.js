import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { auth } from "../../../db/auth";
import UserButton from "../userButton/UserButton";

async function Navbar() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between py-4">
      {/* logo */}
      <div>
        <h1>logo</h1>
      </div>
      {/* signin  button and card shop */}
      <div className="flex items-center justify-between gap-x-6">
        {/* cart shop */}
        <div>
          <Link href="/">
            <HiOutlineShoppingCart className="text-xl" />
          </Link>
        </div>
        <div>
          {session?.user ? (
            <UserButton expires={session?.expires} user={session.user} />
          ) : (
            <button
              asChild
              className="flex items-center justify-center gap-x-1 px-5 py-2 bg-purple-600 text-white rounded-md">
              <span>
                <BiLogIn />
              </span>
              <Link href="/auth/login">ورود</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
