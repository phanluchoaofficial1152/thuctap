import type { Metadata } from "next";
import "./globals.css";
import Headers from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Thực Tập NextJS - Phan Lục Hòa",
  description: "Thực Tập NextJS - Phan Lục Hòa",
};

const RootLayout: FC<{
  children: ReactNode;
  color?: string;
}> = ({ children, color }) => {
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
        <title>Thực tập NextJS | IVY moda</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=optional"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
      </head>
      <body
        style={{
          background: color ? color : "rgba(247, 247, 247, 1)",
        }}
        className="container w-full mx-auto"
      >
        <Headers />
        <main>
          <ToastContainer position="top-center" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
