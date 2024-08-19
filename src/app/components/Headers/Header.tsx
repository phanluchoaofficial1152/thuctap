"use client";

import { FC, useState } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { Input } from "antd";

import "./Headers.css";

const { Search } = Input;

const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  };

  const menuItems = [
    { key: "all-brands", label: "All Brands", href: "/all-brands" },
    { key: "skincare", label: "Skincare", href: "/skincare" },
    { key: "makeup", label: "Makeup", href: "/makeup" },
    { key: "hair-care", label: "Hair Care", href: "/hair-care" },
    { key: "bath-body", label: "Bath & Body", href: "/bath-body" },
    {
      key: "beauty-supplements",
      label: "Beauty Supplements",
      href: "/beauty-supplements",
    },
    { key: "promos", label: "Promos", href: "/promos" },
    { key: "sell-with-us", label: "Sell With Us", href: "/sell-with-us" },
  ];

  const submenuItems = [
    { key: "brand1", label: "Brand 1", href: "/brand1" },
    { key: "brand2", label: "Brand 2", href: "/brand2" },
    { key: "brand3", label: "Brand 3", href: "/brand3" },
  ];

  return (
    <div className="w-100 bg-gray-100">
      <div className="flex items-center justify-between py-4 px-4 md:px-6">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
              alt="Logo"
              width={130}
              height={80}
            />
          </Link>
        </div>

        <div className="flex-grow hidden md:flex md:mb-2 md:w-full justify-center">
          <Search
            placeholder="Search..."
            enterButton
            className="w-1/2 md:w-1/3 lg:w-1/4"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/giohang" className="flex items-center cursor-pointer">
            <ShoppingCartOutlined className="text-xl" />
            <span className="ml-2">Cart</span>
          </Link>
          <span>|</span>
          <Link href="/taikhoan" className="flex items-center cursor-pointer">
            <UserOutlined className="text-xl" />
            <span className="ml-2">User</span>
          </Link>
          <span>|</span>
          <span>VN</span>
        </div>

        <div className="block md:block md:ml-5 md:items-center lg:hidden">
          <button onClick={handleMenuClick}>
            <MenuOutlined className="text-xl" />
          </button>
        </div>
      </div>

      {menuVisible && (
        <div className="bg-white shadow-lg lg:hidden">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`relative ${
                item.key === "sell-with-us" ? "bg-black text-white" : ""
              } mb-1`}
            >
              <Link
                href={item.href}
                className={`block py-2 border-b ml-2 p-2 w-full ${
                  item.key === "sell-with-us"
                    ? "bg-black text-white hover:bg-gray-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="hidden lg:flex items-center border-t mt-4 py-2 relative justify-between">
        <div className="flex justify-center space-x-9">
          {menuItems.slice(0, -1).map((item) => (
            <div
              key={item.key}
              className="relative hover:font-semibold hover:text-blue-600 text-gray-600"
              onMouseEnter={() =>
                item.key === "all-brands" && setSubmenuVisible(true)
              }
              onMouseLeave={() => setSubmenuVisible(false)}
            >
              <Link
                href={item.href}
                className="px-4 py-2 cursor-pointer hover:text-gray-700"
              >
                {item.label}
              </Link>

              {item.key === "all-brands" && submenuVisible && (
                <div className="absolute left-0 top-full bg-white shadow-lg mt-2 py-2">
                  {submenuItems.map((submenuItem) => (
                    <Link
                      key={submenuItem.key}
                      href={submenuItem.href}
                      className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
                    >
                      {submenuItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Link
          href="/sell-with-us"
          className="px-4 py-2 bg-black text-white cursor-pointer hover:bg-gray-700 mr-6"
        >
          Sell With Us
        </Link>
      </div>
    </div>
  );
};

export default Header;
