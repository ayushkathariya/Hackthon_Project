import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function SigninButton() {
  const { pending } = useFormStatus();

  console.log(pending);

  return (
    <>
      {pending ? (
        <Button type="submit" disabled>
          <ReloadIcon className="mr-1 animate-spin" />
          Login
        </Button>
      ) : (
        <Button type="submit">Login</Button>
      )}
    </>
  );
}
