import type { Metadata } from "next";
import "./globals.css";
import Headers from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=optional"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
      </head>
      <body className="container mx-auto bg-[#F7F7F7]">
        <Headers />
        <main>
          <ToastContainer position="top-center" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
