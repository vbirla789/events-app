import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      {/* <div className="relative"> */}
      <Header />
      {/* <div className="gradient-03 z-0" /> */}
      <main className="flex-1 mt-20">{children}</main>
      {/* <div className="gradient-04 z-0" /> */}
      <Footer />
      {/* </div> */}
    </div>
  );
}
