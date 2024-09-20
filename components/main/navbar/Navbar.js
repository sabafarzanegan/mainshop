import Link from "next/link";
import CartDrawer from "../cart/Cart-Drawer";
import { BiLogIn } from "react-icons/bi";
import { auth } from "../../../db/auth";
import UserButton from "../userButton/UserButton";

// import Image from "next/image";

async function Navbar() {
  const session = await auth();
  // console.log(session.user);

  return (
    <div className="flex items-center justify-between py-4">
      {/* logo */}
      <div>logo</div>
      {/* signin  button and card shop */}
      <div className="flex items-center justify-between gap-x-6">
        {/* cart shop */}
        <div>
          <CartDrawer />
        </div>
        <div>
          {session?.user ? (
            <UserButton expires={session?.expires} user={session.user} />
          ) : (
            <button
              asChild
              className="flex items-center justify-center gap-x-1 px-5 py-2 bg-primary text-white rounded-md">
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
