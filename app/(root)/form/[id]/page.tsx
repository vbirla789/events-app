"use client";
import TicketStatus from "@/components/shared/TicketStatus";
import SignupForm from "@/components/shared/signup-form";
import { useParams } from "next/navigation";

export default function IndexPage() {
  const params = useParams();

  return (
    <section className="container grid h-full items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col h-full items-center justify-center mx-auto">
        <h1 className="mt-5 text-2xl font-extrabold md:text-4xl mb-8">
          Get Ticket to your inbox!
        </h1>
        {/* <TicketStatus /> */}
        <SignupForm id={params.id as string} />
      </div>
    </section>
  );
}
