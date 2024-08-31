"use client";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

function Registerform() {
  return (
    <section>
      <Form>
        <form className="space-y-6">
          <Label htmlFor="username">نام کاربری</Label>
          <Input type="text" id="username" placeholder="نام" />
          <Label htmlFor="email">ایمیل</Label>
          <Input type="email" id="email" placeholder="****@gmail.com" />
          <Label htmlFor="password">رمز عبور</Label>
          <Input type="password" id="password" placeholder="*******" />
          <Button className="w-full">ثبت نام</Button>
        </form>
      </Form>
    </section>
  );
}

export default Registerform;
