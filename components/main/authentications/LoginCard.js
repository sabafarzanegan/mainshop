import { Card, CardTitle, CardContent, CardFooter } from "../../ui/card";
import Socials from "./Socials";
function LoginCard({ title, children }) {
  return (
    <Card className="px-4 py-2">
      <CardTitle className="text-base font-semibold mb-4">{title}</CardTitle>
      <CardContent>{children}</CardContent>
      <CardFooter className="block space-y-4">
        <Socials />
      </CardFooter>
    </Card>
  );
}

export default LoginCard;
