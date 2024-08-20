import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Headers from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

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
        className={`${montserrat.className} container-fluid mx-auto w-full h-screen`}
      >
        {" "}
        <Headers />
        <main
          className="container mx-auto"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
