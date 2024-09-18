import { Button } from "../../ui/button";
import { useFormStatus } from "react-dom";

function ButtonSubmitted({ children }) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button type="submit" disabled={pending}>
        {pending ? "در حال ارسال" : children}
      </Button>
    </div>
  );
}

export default ButtonSubmitted;
