"use client";

import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BreadCumbs from "../components/Breadcumbs/BreadCumbs";
import { Typography, Button, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

import "./dashboard.css";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const DashBoardPage: NextPage<{}> = () => {
  const [dashboardName, setDashboardName] = useState<string>("");
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    setDashboardName(pathArray[pathArray.length - 1]);
  }, []);

  const visitorData = {
    labels: [
      "2024-08-01",
      "2024-08-02",
      "2024-08-03",
      "2024-08-04",
      "2024-08-05",
    ],
    datasets: [
      {
        label: "Visitors",
        data: [50, 100, 200, 150, 300],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const purchaseData = {
    labels: [
      "2024-08-01",
      "2024-08-02",
      "2024-08-03",
      "2024-08-04",
      "2024-08-05",
    ],
    datasets: [
      {
        label: "Total Purchases",
        data: [20, 50, 30, 75, 150],
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
      },
    },
  };

  const purchaseColumns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const purchaseDataSource = Array.from({ length: 10 }, (_, index) => ({
    key: index,
    product: `Product Name ${index + 1}`,
    quantity: 3,
    amount: "AED 159",
  }));

  const handleRedirect = () => {
    router.replace("/admin/pages/dashboard/add-reviews");
  };

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
            <Button
              className="w-full md:w-auto border border-gray-300 px-8 py-4"
              onClick={() => setShowAnalytics(false)}
            >
              REVIEWED PRODUCTS
            </Button>
            <Button
              className="w-full md:w-auto border border-gray-300 px-8 py-4"
              onClick={() => setShowAnalytics(true)}
            >
              ANALYTICS
            </Button>
          </div>

          {showAnalytics ? (
            <>
              {/* chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <div>
                  <h3 className="text-center font-semibold">4565 Visitors</h3>
                  <Line data={visitorData} options={options} />
                </div>
                <div>
                  <h3 className="text-center font-semibold">
                    AED1430 Total Purchases
                  </h3>
                  <Line data={purchaseData} options={options} />
                </div>
              </div>
              {/* end chart */}

              {/* purchase by product */}
              <div className="mt-8">
                <Title level={4}>Purchase by Product</Title>
                <Table
                  columns={purchaseColumns}
                  dataSource={purchaseDataSource}
                  pagination={false}
                  className="mt-4"
                />
              </div>
              {/* end purchase by product */}
            </>
          ) : (
            <div className="text-center mt-8">
              <p className="text-lg font-semibold">Reviewed 16 Products</p>
              <Button
                className="bg-black text-white px-8 py-4 mt-4"
                onClick={handleRedirect}
              >
                ADD NEW REVIEW
              </Button>
            </div>
          )}
        </div>

        {!showAnalytics && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index + 1}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="relative w-full">
                  <Image
                    src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/8ba25b9f2f711e318a7b5db5fbb2add7.webp"
                    alt="Product Image"
                    width={4000}
                    height={4000}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute bottom-0 left-0 bg-red-500 text-white px-2 py-1 rounded-tl-md">
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
        )}
      </div>
      {/* end dashboard */}
    </>
  );
};

export default DashBoardPage;
