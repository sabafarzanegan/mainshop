import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Registerform from "../../../components/main/authentications/Registerform";
import Socials from "../../../components/main/authentications/Socials";
import Link from "next/link";

function page() {
  return (
    <Card className="py-4 px-2">
      <CardHeader>
        <CardTitle>ثبت نام</CardTitle>
        <CardContent className="space-y-4">
          <Registerform />
          <Socials />
        </CardContent>
      </CardHeader>
      {/* <CardFooter className="block space-y-4"></CardFooter> */}
      <Link
        href="/auth/login"
        className="font-semibold text-primary dark:text-white mt-4 m-auto px-2 ">
        <span className="hover:border-b hover:border-b-primary transition-all duration-200">
          آیا حساب کاربری دارید؟
        </span>
      </Link>
    </Card>
  );
}

export default page;
