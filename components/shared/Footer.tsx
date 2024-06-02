import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-500">
      <div className="flex flex-col gap-5 items-center">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-[40px] md:gap-[130px] mt-5">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[22px]">CUSTOMERS</h1>
            <Link href="/profile">Find your tickets</Link>
            <p>Contact Us</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[22px]">ORGANISERS</h1>
            <Link href="/events/create">List Your Event</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[22px]">COMPANY</h1>
            <p>For Business</p>
            <p>Blog</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[22px]">SOCIAL MEDIA</h1>
            <p className="flex items-center gap-2">
              <FaFacebook className="w-[22px] h-[22px]" />

              <span>Facebook</span>
            </p>
            <p className="flex items-center gap-2">
              <FaInstagram className="w-[22px] h-[22px]" />
              <a
                href="https://www.instagram.com/event_sutra_?igsh=MWJwcmx2amMzYmR0eA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </p>
            <p className="flex items-center gap-2">
              <FaWhatsapp className="w-[22px] h-[22px]" />
              <span>Whatsapp</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 mt-4 mb-7">
          <Link
            href="/"
            className="flex flex-row items-center gap-2 rounded-xl"
          >
            <Image
              src="/assets/images/eventsutra.png"
              alt="logo"
              width={80}
              height={25}
              className="md:h-[40px] md:w-[80px] h-[25px] w-[60px] rounded-md md:rounded-xl"
            />
            {/* <h3 className="text-semibold sm:text-[20px] text-[16px]">
              EVENTSUTRA
            </h3> */}
          </Link>

          <p className="text-[14px] sm:text-[16px]">
            2024 Eventsutra. All Rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
