"use client";

import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import QRCode from "qrcode.react";

interface SignupFormProps {
  id: string;
}

function isInputNamedElement(
  e: Element
): e is HTMLInputElement & { name: string } {
  return "value" in e && "name" in e;
}

const SignupForm: React.FC<SignupFormProps> = ({ id }) => {
  const [state, setState] = useState<string>();
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      // const qrCodeUrl = `http://localhost:3000/buyer/${id}`;
      const qrCodeUrl = "www.google.com"; // Replace with your URL
      setQrUrl(qrCodeUrl);
    }
  }, [id]);

  async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData: Record<string, string> = {};

    Array.from(e.currentTarget.elements)
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (!field.name) return;
        formData[field.name] = field.value;
      });

    setState("loading");

    await fetch("http://localhost:3000/api/email", {
      method: "POST",
      body: JSON.stringify({
        firstName: formData.firstName,
        email: formData.email,
        qrUrl: qrUrl, // Include qrUrl in the POST request
      }),
    });

    setState("ready");
  }

  return (
    <div className="dark:bg-slate-900 border-2 border-slate-600 shadow-2xl rounded-2xl p-12">
      <form className="flex flex-col gap-5" onSubmit={handleOnSubmit}>
        <div className="">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            className="min-w-[250px] sm:min-w-[370px]"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            className="min-w-[250px] sm:min-w-[370px]"
          />
        </div>
        <button className={buttonVariants()} disabled={state === "loading"}>
          Get Ticket
        </button>
        {/* <div>
        {qrUrl && (
          <QRCode
            value={qrUrl}
            size={128} // Adjust size as needed
            renderAs={"svg"} // Render as SVG for better quality
          />
        )}
      </div> */}
      </form>
    </div>
  );
};

export default SignupForm;
