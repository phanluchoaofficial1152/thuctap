"use client";

import { NextPage } from "next";
import { Avatar, Button, Carousel } from "antd";
import {
  UserOutlined,
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import React, { useRef } from "react";
import Link from "next/link";

import "./ambassadorsdetail.css";
import Image from "next/image";

const AmbassadorsDetails: NextPage = () => {
  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="px-4 py-4">
      <title>Ambassadors Details | IVY moda | Thực tập NextJS</title>

      {/* info ambassadorsDetails */}
      <div className="bg-gray-100 w-full">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-full">
          <Avatar size={128} icon={<UserOutlined />} className="mb-4" />
          <h2 className="text-2xl font-semibold">Name Surname</h2>
          <Button type="default" shape="round" className="mt-2 mb-4" disabled>
            @username
          </Button>
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="#" aria-label="Twitter">
              <TwitterOutlined className="text-xl" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <FacebookOutlined className="text-xl" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <YoutubeOutlined className="text-xl" />
            </Link>
          </div>
          <p className="text-gray-600">
            Enim expedita torquent! Animi sunt beatae laoreet nec. Euis­mod
            rutrum pariatur! Nunc dolor­um nisi eum quos quisquam ea. Nobis
            Perspiciatis, quidem! Sint esse neque viverra rerum nullam, ex aut
            exercitationem leo dolores, netus ipsam.
          </p>
        </div>
      </div>
      {/* end info ambassadorsDetails */}

      {/* slider */}
      <div className="relativeslider mt-8 shadow-md">
        <Carousel
          ref={carouselRef}
          dots={{ className: "custom-dots" }}
          effect="fade"
        >
          <div>
            <div className="h-full w-full object-cover bg-gray-200 flex items-center justify-center">
              <Image
                src="https://cotton4u.vn/files/news/2024/08/15/e904217f508c32cf95a9f09730b8a8b7.webp"
                alt="Slide 1"
                width={500000}
                height={500000}
                className="rounded-md"
              />
            </div>
          </div>
          <div>
            <div className="h-full w-full object-cover bg-gray-200 flex items-center justify-center">
              <Image
                src="https://cotton4u.vn/files/news/2024/08/15/6bce174394e82d378bcfeb671e8b05c4.webp"
                alt="Slide 2"
                width={500000}
                height={500000}
                className="rounded-md"
              />
            </div>
          </div>
        </Carousel>

        <button
          className="absoluteslider top-1/2 transform -translate-y-1/2 left-4 bg-white p-2 rounded-full shadow-md"
          onClick={prev}
        >
          <LeftOutlined className="text-lg text-black" />
        </button>

        <button
          className="absoluteslider top-1/2 transform -translate-y-1/2 right-4 bg-white p-2 rounded-full shadow-md"
          onClick={next}
        >
          <RightOutlined className="text-lg text-black" />
        </button>
      </div>
      {/* slider */}

      {/* products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index + 1} className="bg-white rounded-lg shadow-md p-4">
            <div className="relativeproductss w-full">
              <Image
                src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/8ba25b9f2f711e318a7b5db5fbb2add7.webp"
                alt="Product Image"
                width={4000}
                height={4000}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absoluteproductss bottom-0 left-0 bg-red-500 text-white px-2 py-1 rounded-tl-md">
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
      {/* end products */}
    </div>
  );
};

export default AmbassadorsDetails;
