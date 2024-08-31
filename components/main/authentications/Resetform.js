"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../ui/button";

function Resetform() {
  return (
    <Form>
      <form className="space-y-8">
        <Input placeholder="*****@gmail.com" />
        <Button>ارسال</Button>
      </form>
    </Form>
  );
}

export default Resetform;
