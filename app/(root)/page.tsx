import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slider from "@/components/shared/Slider";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 dark:bg-inherit mx-4 md:mx-20">
        {/* <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Empower Your Gatherings, Forge Connections, and Revel in the
              Moment!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              We are a platform for event organizers to host, connect and
              celebrate their events.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit z-30">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/imgg.jpg"
            alt="hero"
            width={1400}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] rounded-[50px]"
          />
        </div> */}
        <Slider />
      </section>

      <section
        id="events"
        className="wrapper my-5 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          <span className="pb-6">Skip the Lines, Score the Tickets: </span>
          <br />
          <span>Your Event Ticket Concierge</span>
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        {/* <div className="gradient-card z-0" /> */}
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
