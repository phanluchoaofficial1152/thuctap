"use client";

import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BreadCumbs from "../components/Breadcumbs/BreadCumbs";
import { Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";

import "./dashboard.css";

const { Title } = Typography;

const DashBoardPage: NextPage<{}> = () => {
  const [dashboardName, setDashboardName] = useState<string>("");

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    setDashboardName(pathArray[pathArray.length - 1]);
  }, []);

  return (
    <>
      <title>Dashboard | IVY moda | Thực tập NextJS</title>

      <BreadCumbs name={dashboardName} />

      <Title level={2} className="px-4 py-4 text-center">
        {dashboardName.toUpperCase()}
      </Title>

      {/* dashboard */}
      <div className="px-4 py-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">Welcome NAME SURNAME</h2>
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mt-4">
              <UserOutlined style={{ fontSize: "48px", color: "#bfbfbf" }} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-full md:w-auto border border-gray-300 px-8 py-4">
              REVIEWED PRODUCTS
            </Button>
            <Button className="w-full md:w-auto border border-gray-300 px-8 py-4">
              ANALYTICS
            </Button>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg font-semibold">Reviewed 16 Products</p>
            <Button className="bg-black text-white px-8 py-4 mt-4">
              ADD NEW REVIEW
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index + 1} className="bg-white rounded-lg shadow-md p-4">
              <div className="relativeproductssdashboard w-full">
                <Image
                  src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/8ba25b9f2f711e318a7b5db5fbb2add7.webp"
                  alt="Product Image"
                  width={4000}
                  height={4000}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absoluteproductssdashboard bottom-0 left-0 bg-red-500 text-white px-2 py-1 rounded-tl-md">
                  Makeup
                </div>
              </div>
              <p className="text-gray-500 uppercase mt-2">Brand</p>
              <h2 className="text-lg font-semibold mt-1">Product Title</h2>
              <p className="text-gray-600">Product Description</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold">$19.99</span>
                <span className="text-red-500 bg-yellow-300 p-1 font-semibold rounded-md uppercase">
                  30% off
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* end dashboard */}
    </>
  );
};

export default DashBoardPage;
