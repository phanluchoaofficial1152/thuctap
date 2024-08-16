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

const { Search } = Input;

const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

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

  return (
    <div className="w-full bg-gray-100">
      <div className="flex items-center justify-between py-4 px-4 md:px-6">
        <div className="flex-shrink-0">
          <Image
            src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
            alt="Logo"
            width={130}
            height={80}
          />
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

        <div className="block md:hidden">
          <button onClick={handleMenuClick}>
            <MenuOutlined className="text-xl" />
          </button>
        </div>
      </div>

      {menuVisible && (
        <div className="bg-white shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block px-4 py-2 border-b hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <div className="hidden lg:flex justify-center border-t mt-4 py-2">
        {/* <div className="relative overflow-hidden">
          <span className="cursor-pointer">All Brands</span>
        </div> */}

        <div className="flex justify-center space-x-8">
          {menuItems.slice(0, -1).map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="px-4 py-2 cursor-pointer hover:text-gray-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/sell-with-us"
          className="px-4 py-2 bg-black text-white cursor-pointer hover:bg-gray-700 ml-6"
        >
          Sell With Us
        </Link>
      </div>
    </div>
  );
};

export default Header;
