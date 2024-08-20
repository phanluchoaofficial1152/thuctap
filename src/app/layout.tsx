import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import Headers from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const chakrapetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Thực Tập NextJS - Phan Lục Hòa",
  description: "Thực Tập NextJS - Phan Lục Hòa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="https://pubcdn.ivymoda.com/ivy2/images/logo-icon.ico"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </head>

      <body
        className={`${chakrapetch.className} container-fluid mx-auto w-full h-screen`}
      >
        {" "}
        <Headers />
        <main
          className="container mx-auto"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          <ToastContainer position="top-center" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
