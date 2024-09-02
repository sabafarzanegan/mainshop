import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

function Mainalert({ variant, message, title }) {
  return (
    <Alert variant={variant} className="py-2 px-4">
      <AlertTitle className="font-semibold">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export default Mainalert;
