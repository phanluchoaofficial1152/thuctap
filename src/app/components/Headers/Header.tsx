"use client";

import { FC, useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { Input } from "antd";
import "./Headers.css";
import LoginModal from "../Login/LoginModal";

const { Search } = Input;

const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { key: "all-brands", label: "All Brands", href: "/pages/sanpham" },
    { key: "skincare", label: "Skincare", href: "/pages/danhmuc/skincare" },
    { key: "makeup", label: "Makeup", href: "/pages/danhmuc/makeup" },
    { key: "hair-care", label: "Hair Care", href: "/pages/danhmuc/hair-care" },
    { key: "bath-body", label: "Bath & Body", href: "/pages/danhmuc/bath-body" },
    {
      key: "beauty-supplements",
      label: "Beauty Supplements",
      href: "/pages/danhmuc/beauty-supplements",
    },
    { key: "promos", label: "Promos", href: "/pages/danhmuc/promos" },
    {
      key: "sell-with-us",
      label: "Sell With Us",
      href: "/pages/danhmuc/sell-with-us",
    },
  ]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch(
          "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0&limit=16"
        );
        const data = await response.json();

        const updatedMenuItems = menuItems.map((item, index) => {
          if (item.key === "all-brands") {
            return item;
          }

          const classData = data.data[index];

          return classData
            ? { ...item, href: `/pages/danhmuc/${classData.class_slug}` }
            : item;
        });

        setMenuItems(updatedMenuItems);
      } catch (error) {
        console.error("Failed to fetch class data", error);
      }
    };

    fetchClassData();
  }, [menuItems]);

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  };

  const submenuItems = [
    { key: "brand1", label: "Brand 1", href: "/brand1" },
    { key: "brand2", label: "Brand 2", href: "/brand2" },
    { key: "brand3", label: "Brand 3", href: "/brand3" },
  ];

  return (
    <div className="w-full py-4 px-4">
      <div className="flex items-center justify-between md:px-6">
        {/* logo */}
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
        {/* end logo */}

        {/* search */}
        <div className="flex-grow hidden md:flex md:mb-2 md:w-full justify-center">
          <Search
            placeholder="Search..."
            enterButton
            className="w-1/2 md:w-1/3 lg:w-1/4"
          />
        </div>
        {/* end search */}

        {/* hành động */}
        <div className="hidden lg:flex sm:hidden md:flex items-center space-x-3 cursor-pointer">
          <ShoppingCartOutlined className="text-xl" />
          <Link href={"/pages/giohang"}>
            <span className="ml-2">Cart</span>
          </Link>
          <span>|</span>
          <LoginModal />
          <span>|</span>
          <span>VN</span>
        </div>
        {/* end hành động */}

        {/* toggle menu mobile */}
        <div className="flex sm:flex-col md:flex-row items-center justify-center md:ml-4 sm:ml-4 md:items-center lg:hidden">
          <button onClick={handleMenuClick} className="sm:mb-0 sm:ml-0">
            <MenuOutlined className="text-xl" />
          </button>
        </div>
        {/* end toggle menu mobile */}
      </div>

      {/* menu hiện ra khi toggle */}
      {menuVisible && (
        <>
          <div className="bg-white shadow-lg lg:hidden">
            <div className="flex items-center justify-center space-x-2 md:hidden lg:hidden">
              <div className="mt-4 flex space-x-2 mb-3">
                <ShoppingCartOutlined className="text-xl" />
                <span className="ml-2">Cart</span>
                <span>|</span>
                <LoginModal />
                <span>|</span>
                <span>VN</span>
              </div>
            </div>

            {menuItems.map((item, index) => (
              <div
                key={"item" + index}
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
        </>
      )}
      {/* end menu hiện ra khi toggle */}

      {/* menu cho desktop */}
      <div className="hidden lg:flex items-center border-t mt-4 py-2 relative justify-between">
        <div className="flex justify-center space-x-9">
          {menuItems.slice(0, -1).map((item, value) => (
            <div
              key={"value 1" + value}
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
      {/* end menu cho desktop */}
    </div>
  );
};

export default Header;
