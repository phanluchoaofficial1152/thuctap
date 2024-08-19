import React, { FC } from "react";
import { Input, Button } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

import "./Footer.css";
import Link from "next/link";
import { FaCcMastercard } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";

const Footer: FC = () => {
  return (
    <>
      <div
        className="footer-container w-100 py-12 px-6"
        style={{ backgroundColor: "#E8E8E8" }}
      >
        <div className="container mx-auto flex flex-wrap justify-between pt-10 pb-10">
          <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
            <img
              src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
              alt="Logo"
              className="mb-4 w-40"
            />

            <div className="flex space-x-4">
              <Link href="#">
                <FacebookOutlined style={{ fontSize: "25px" }} />
              </Link>

              <Link href="#">
                <TwitterOutlined style={{ fontSize: "25px" }} />
              </Link>

              <Link href="#">
                <InstagramOutlined style={{ fontSize: "25px" }} />
              </Link>
            </div>
          </div>

          <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
            <h4 className="font-semibold mb-4">MAIN PAGES</h4>
            <ul>
              <li>
                <Link href="#">Sell with Us</Link>
              </li>

              <li className="mt-2">
                <Link href="#">About Us</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Contact Us</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Promos</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Become an Ambassador</Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
            <h4 className="font-semibold mb-4">POLICY</h4>
            <ul>
              <li>
                <Link href="#">Terms of Usage</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Privacy Policy</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Return Policy</Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
            <h4 className="font-semibold mb-4">CATEGORIES</h4>
            <ul>
              <li>
                <Link href="#">Skincare</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Makeup</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Hair Care</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Bath & Body</Link>
              </li>

              <li className="mt-2">
                <Link href="#">Beauty Supplements</Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/5">
            <h4 className="font-semibold mb-4">SUBSCRIBE</h4>

            <p className="mb-4">
              Subscribe to our newsletter so that you can be the first to know
              about new offers and promotions.
            </p>

            <div className="flex flex-col sm:flex-row items-center">
              <Input
                placeholder="Enter your email"
                className="mb-2 sm:mb-0 sm:mr-2"
              />

              <Button
                type="primary"
                className="bg-black border-black hover:bg-gray-800"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright bg-gray-800 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>&copy; 2024. All Rights Reserved.</div>
          <div className="flex space-x-4">
            <Link href="#" className="text-white">
              <FaCcMastercard style={{ fontSize: "50px" }} />
            </Link>
            <Link href="#" className="text-white">
              <RiVisaLine style={{ fontSize: "50px" }} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
