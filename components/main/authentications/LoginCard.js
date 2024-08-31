import { Card, CardTitle, CardContent, CardFooter } from "../../ui/card";
import Socials from "./Socials";
import Link from "next/link";
function LoginCard({ title, children }) {
  return (
    <Card className="px-4 py-6">
      <CardTitle className="text-base font-semibold mb-4">{title}</CardTitle>
      <CardContent>{children}</CardContent>
      <CardFooter className="block space-y-4">
        <Socials />
      </CardFooter>
      <div className="flex flex-col items-center justify-center">
        <Link className="mt-7" href="/auth/reset">
          <span className="text-base text-primary/95 font-semibold transition-all py-1 duration-300 dark:text-white hover:border-b hover:border-primary ">
            رمز عبور خود را فراموش کرده اید؟
          </span>
        </Link>

        <Link className="mt-7" href="/auth/register">
          <span className="text-base text-primary/95 font-semibold transition-all py-1 duration-300 dark:text-white hover:border-b hover:border-primary ">
            حساب کاربری ندارید؟
          </span>
        </Link>
      </div>
    </Card>
  );
}

export default LoginCard;
