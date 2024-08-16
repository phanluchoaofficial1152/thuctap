import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Headers from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";

const quicksand = Quicksand({ subsets: ["latin"] });

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
      </head>

      <body className={`${quicksand.className}`}>
        {" "}
        <Headers />
        <main className="container" style={{ backgroundColor: "#F7F7F7" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
