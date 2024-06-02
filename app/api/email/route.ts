import { Resend } from "resend";
import { NextResponse } from "next/server";
import WelcomeEmail from "../../../components/shared/Welcome";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { firstName, email, qrUrl } = await request.json();
  // try {
  //   await resend.emails.send({
  //     from: "onboarding@resend.dev",
  //     to: email,
  //     subject: "Welcome to Resend!",
  //     react: WelcomeEmail({
  //       userFirstName: firstName,
  //       loginDate: new Date(2023, 0, 15, 14, 30),
  //       loginDevice: "Mobile",
  //       loginLocation: "San Francisco",
  //       loginIp: "203.0.113.1",
  //       qrUrl: qrUrl,
  //     }),
  //   });

  //   // Await the NextResponse.json() call to ensure proper response handling
  //   return await NextResponse.json({ status: "ok" }, { status: 200 });
  // } catch (error) {
  //   if (error instanceof Error) {
  //     console.error(`Failed to send email: ${error.message}`);
  //     return await NextResponse.json(
  //       { error: "Failed to send email. Please try again later." },
  //       { status: 500 }
  //     );
  //   }
  //   // Handle unknown error types here
  //   console.error("Unknown error occurred:", error);
  //   return await NextResponse.json(
  //     { error: "Internal server error." },
  //     { status: 500 }
  //   );
  // }
}
