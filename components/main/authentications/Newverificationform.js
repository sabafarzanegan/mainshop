"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newverification } from "../../../db/tokens";
import Formsuccess from "../../main/authentications/Formerror";
import Formerror from "../../main/authentications/Formerror";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

function Newverificationform() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = useSearchParams().get("token");
  const router = useRouter();
  const handleverification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("token not found");
      return;
    }
    newverification(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, []);

  useEffect(() => {
    handleverification();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>تایید ایمیل شما</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{!error && !success ? "verifing email..." : null}</p>
        <Formsuccess message={success} />
        <Formerror message={error} />
      </CardContent>
    </Card>
  );
}

export default Newverificationform;
