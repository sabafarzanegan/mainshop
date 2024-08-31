import { Button } from "../../ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { signinwithGithub, signinwithGoogle } from "./../../../db/action";
function Socials() {
  return (
    <>
      <form action={signinwithGoogle}>
        <Button
          type="submit"
          className="bg-transparent text-primary hover:text-primary hover:bg-gray-200 border border-gray-200 w-full flex items-center justify-center gap-x-2 dark:text-white  dark:hover:text-primary ">
          <span>
            <FcGoogle className="text-lg" />
          </span>
          <span>ورود با گوگل</span>
        </Button>
      </form>
      <form action={signinwithGithub}>
        <Button
          type="submit"
          className="bg-transparent text-primary hover:text-primary hover:bg-gray-200 border border-gray-200 w-full flex items-center justify-center gap-x-2 dark:text-white  dark:hover:text-primary">
          <span>
            <SiGithub className="text-lg text-black" />
          </span>
          <span>ورود با گیت هاب</span>
        </Button>
      </form>
    </>
  );
}

export default Socials;
