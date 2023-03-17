import Head from "next/head";
import { ReactNode } from "react";
import { Raleway } from "@next/font/google";
import Menu from "./Menu";
import Toast from "@/components/Toast";

const raleway = Raleway({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>linkr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`flex overflow-hidden h-screen flex-row items-center bg-slate-900 ${raleway.className}`}
      >
        <div className="h-full basis-1/4">
          <Menu />
          <Toast />
        </div>
        <div className="h-full basis-3/4 pt-4 pr-4 pb-4">{children}</div>
        <div id="modal"></div>
      </main>
    </>
  );
}
