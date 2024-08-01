"use client";

import { FC, useState } from "react";
import { Input, Menu, Space, Button } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import "./Headers.css";

const { Search } = Input;

const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  };

  const menuItems = [
    { key: "skincare", label: <Link href="/skincare">Skincare</Link> },
    { key: "makeup", label: <Link href="/makeup">Makeup</Link> },
    { key: "hair-care", label: <Link href="/hair-care">Hair Care</Link> },
    { key: "bath-body", label: <Link href="/bath-body">Bath & Body</Link> },
    {
      key: "beauty-supplements",
      label: <Link href="/beauty-supplements">Beauty Supplements</Link>,
    },
    { key: "promos", label: <Link href="/promos">Promos</Link> },
    {
      key: "sell-with-us",
      label: (
        <Link
          href="/sell-with-us"
          style={{
            cursor: "pointer",
            color: "white",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseOver={(e: any) => (e.target.style.color = "black")}
          onMouseOut={(e: any) => (e.target.style.color = "white")}
        >
          Sell With Us
        </Link>
      ),
      className: "sell-with-us bg-black md:bg-black sm:bg-black",
      style: {
        marginRight: "10px",
        cursor: "pointer",
      },
    },
  ];

  const submenuItems = [
    { key: "brand1", label: "Brand 1" },
    { key: "brand2", label: "Brand 2" },
    { key: "brand3", label: "Brand 3" },
  ];

  return (
    <div className="w-full bg-gray-100">
      <div className="header-inner flex items-center justify-between py-4 px-4 md:px-6">
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

        <div className="flex items-center space-x-4 md:mb-2">
          <Space>
            <Link href={"/giohang"}>
              <div className="flex items-center">
                <ShoppingCartOutlined className="text-xl" />
                <span className="ml-2">Cart</span>
              </div>
            </Link>
            <span>|</span>
            <Link href={"/taikhoan"}>
              <div className="flex items-center">
                <UserOutlined className="text-xl" />
                <span className="ml-2">User</span>
              </div>
            </Link>
            <span>|</span>
            <span>VN</span>
          </Space>
        </div>

        <div className="block md:flex lg:hidden md:ml-3">
          <Button icon={<MenuOutlined />} onClick={handleMenuClick} />
        </div>
      </div>

      {menuVisible && (
        <Menu
          mode="vertical"
          className="mobile-menu"
          style={{ width: "100%" }}
          items={menuItems}
        />
      )}

      <Menu
        mode="horizontal"
        className="header-menu hidden md:hidden lg:flex justify-between"
        items={[
          {
            key: "all-brands",
            label: "All Brands",
            children: submenuItems,
          },
          ...menuItems.slice(0, -1),
          {
            key: "sell-with-us",
            label: (
              <Link
                href="/sell-with-us"
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e: any) => (e.target.style.color = "black")}
                onMouseOut={(e: any) => (e.target.style.color = "white")}
              >
                Sell With Us
              </Link>
            ),
            className: "sell-with-us bg-black md:bg-black sm:bg-black",
            style: {
              marginRight: "10px",
              cursor: "pointer",
            },
          },
        ]}
      />
    </div>
  );
};

export default Header;
