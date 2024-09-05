import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

function Mainalert({ variant, message, title }) {
  return (
    <Alert
      variant={variant}
      className={`${
        variant === "success" ? "bg-green-500 border border-green-400 " : ""
      } py-2 px-4 text-white`}>
      <AlertTitle className="font-semibold">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export default Mainalert;
