import { FC, ReactNode } from "react";
import Headers from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
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
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=optional"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
      </head>
      <body>
        <div className="container mx-auto bg-[#F7F7F7]">
          <ToastContainer position="top-center" />
          <Headers />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
