import Resetform from "../../../components/main/authentications/Resetform";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

function page() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {" "}
            رمز عبور خود را فراموش کرده اید؟
          </CardTitle>
          <CardDescription>ایمیل کاربری خود را وارد کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <Resetform />
        </CardContent>
      </Card>
    </>
  );
}

export default page;
