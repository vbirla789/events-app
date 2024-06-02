import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={30}
            height={30}
            className="cursor-pointer dark:bg-slate-900 rounded-md border border-gray-500"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white dark:bg-gray-900 md:hidden">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/assets/images/eventsutra.png"
              alt="logo"
              width={128}
              height={38}
              className="w-[90px] h-[42px] rounded-md"
            />
            <p className="text-white">Eventsutra</p>
          </div>
          <Separator className="border border-gray-50 dark:border-gray-700" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
