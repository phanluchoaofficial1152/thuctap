"use client";

import React, { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Carousel } from "antd";
import Image from "next/image";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import "./Home.css";

const Home: FC = () => {
  const carouselRef = useRef<any>(null);

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <>
      <div className="carousel-container">
        <Carousel ref={carouselRef} dots={false} effect="fade" autoplay>
          <div className="carousel-slide">
            <Image
              src="https://cotton4u.vn/files/news/2024/07/27/079d6932fffc257aafc0eb19e2172061.webp"
              alt="Slide 1"
              width={2000}
              height={500}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="carousel-slide">
            <Image
              src="https://cotton4u.vn/files/news/2024/07/25/971943fd5e05439de2c8fed10872c4b4.webp"
              alt="Slide 2"
              width={2000}
              height={500}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="carousel-slide">
            <Image
              src="https://cotton4u.vn/files/news/2024/07/01/5d855d0b818e29bdc91c15f6d68eba65.webp"
              alt="Slide 3"
              width={2000}
              height={500}
              style={{ objectFit: "contain" }}
            />
          </div>
        </Carousel>

        <div className="custom-arrows">
          <div className="arrow arrow-prev" onClick={handlePrev}>
            <ArrowLeftOutlined />
          </div>
          <div className="arrow arrow-next" onClick={handleNext}>
            <ArrowRightOutlined />
          </div>
        </div>
      </div>

      <div className="product-container px-4 py-8">
        <div className="product-header flex justify-between items-center pb-4">
          <h2
            className="text-2xl font-bold"
            style={{ textTransform: "uppercase" }}
          >
            New Arrivals
          </h2>
          <Link href="/all-products" className="text-blue-500 hover:underline">
            See All
          </Link>
        </div>

        <div className="product-content flex flex-col lg:flex-row gap-6">
          <div className="relative lg:w-2/5 flex-1">
            {" "}
            <Image
              src="https://cotton4u.vn/files/news/2024/07/27/079d6932fffc257aafc0eb19e2172061.webp"
              alt="Large Product Image"
              width={2000}
              height={400}
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-black text-black py-2 px-4 rounded">
              Shop Now
            </button>
          </div>

          <div className="lg:w-3/5 flex flex-col lg:flex-row gap-6">
            <div className="border border-gray-200 p-4 relative flex-1">
              <Image
                src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                alt="Product 1"
                width={500}
                height={500}
                className="w-full h-[400px] object-cover"
              />
              <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Category
              </span>
              <h3 className="mt-2 text-lg font-semibold">Product Name 1</h3>
              <p className="text-sm text-gray-600">Brand Name</p>
              <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-500">$40.00</span>
                  <span className="text-sm line-through text-gray-500">
                    $60.00
                  </span>
                </div>
                <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                  30% OFF
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4 relative flex-1">
              <Image
                src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/fe7124f0ee14c9982411cf6e79d0796f.webp"
                alt="Product 2"
                width={500}
                height={500}
                className="w-full h-[400px] object-cover"
              />
              <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Category
              </span>
              <h3 className="mt-2 text-lg font-semibold">Product Name 2</h3>
              <p className="text-sm text-gray-600">Brand Name</p>
              <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-500">$50.00</span>
                  <span className="text-sm line-through text-gray-500">
                    $70.00
                  </span>
                </div>
                <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                  30% OFF
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-content flex flex-col lg:flex-row gap-6 mt-8">
          <div className="lg:w-3/5 flex flex-col lg:flex-row gap-6">
            <div className="border border-gray-200 p-4 relative flex-1">
              <Image
                src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                alt="Product 1"
                width={500}
                height={500}
                className="w-full h-[400px] object-cover"
              />
              <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Category
              </span>
              <h3 className="mt-2 text-lg font-semibold">Product Name 1</h3>
              <p className="text-sm text-gray-600">Brand Name</p>
              <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-500">$40.00</span>
                  <span className="text-sm line-through text-gray-500">
                    $60.00
                  </span>
                </div>
                <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                  30% OFF
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4 relative flex-1">
              <Image
                src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/fe7124f0ee14c9982411cf6e79d0796f.webp"
                alt="Product 2"
                width={500}
                height={500}
                className="w-full h-[400px] object-cover"
              />
              <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Category
              </span>
              <h3 className="mt-2 text-lg font-semibold">Product Name 2</h3>
              <p className="text-sm text-gray-600">Brand Name</p>
              <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-500">$50.00</span>
                  <span className="text-sm line-through text-gray-500">
                    $70.00
                  </span>
                </div>
                <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                  30% OFF
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:w-2/5 flex-1">
            {" "}
            <Image
              src="https://cotton4u.vn/files/news/2024/07/27/079d6932fffc257aafc0eb19e2172061.webp"
              alt="Large Product Image"
              width={2000}
              height={400}
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-black text-black py-2 px-4 rounded">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="product-container px-4 pb-12">
        <div className="product-header flex justify-between items-center pb-4">
          <h2
            className="text-2xl font-bold"
            style={{ textTransform: "uppercase" }}
          >
            New Arrivals
          </h2>
          <Link href="/all-products" className="text-blue-500 hover:underline">
            See All
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={15}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },

            768: {
              slidesPerView: 3,
            },

            1024: {
              slidesPerView: 4,
            },
          }}
          navigation={{
            nextEl: ".custom-arrow-next",
            prevEl: ".custom-arrow-prev",
          }}
        >
          <div className="product-slider grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                  alt="Product 1"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 1</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $40.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $60.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/fe7124f0ee14c9982411cf6e79d0796f.webp"
                  alt="Product 2"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 2</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $50.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $70.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                  alt="Product 3"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 3</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $40.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $60.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/fe7124f0ee14c9982411cf6e79d0796f.webp"
                  alt="Product 4"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 4</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $50.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $70.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/fe7124f0ee14c9982411cf6e79d0796f.webp"
                  alt="Product 4"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 4</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $50.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $70.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </Swiper>

        <div className="custom-arrows-swiper">
          <div className="arrows-swiper custom-arrow-prev">
            <ArrowLeftOutlined />
          </div>
          <div className="arrows-swiper custom-arrow-next">
            <ArrowRightOutlined />
          </div>
        </div>
      </div>

      <div className="banner-sale-off-50 py-8">
        <div className="sale-banner-image">
          <Image
            src="https://pubcdn.ivymoda.com/files/news/2023/06/23/web-50.jpg"
            alt="Sale Banner"
            fill
          />
        </div>
        <div className="sale-banner-content">
          <h2 className="sale-title">SALE OFF 50%</h2>
          <p className="sale-subtitle">On All Items</p>
          <button className="sale-button">Shop Now</button>
        </div>
      </div>

      <div className="product-container px-4 pb-12">
        <div className="product-header flex justify-between items-center pb-4">
          <h2
            className="text-2xl font-bold"
            style={{ textTransform: "uppercase" }}
          >
            Top Sellers
          </h2>
          <Link href="/all-products" className="text-blue-500 hover:underline">
            See All
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          className="mySwiper2"
          slidesPerView={1}
          spaceBetween={15}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },

            768: {
              slidesPerView: 3,
            },

            1024: {
              slidesPerView: 4,
            },
          }}
          navigation={{
            nextEl: ".custom-arrow-next-top-seller",
            prevEl: ".custom-arrow-prev-top-seller",
          }}
        >
          <div className="product-slider grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                  alt="Product 1"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 1</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $40.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $60.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/fe7124f0ee14c9982411cf6e79d0796f.webp"
                  alt="Product 2"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 2</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $50.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $70.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                  alt="Product 3"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 3</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $40.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $60.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/fe7124f0ee14c9982411cf6e79d0796f.webp"
                  alt="Product 4"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 4</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $50.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $70.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 relative">
                <Image
                  src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/fe7124f0ee14c9982411cf6e79d0796f.webp"
                  alt="Product 4"
                  width={500}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <span className="absolute top-96 left-7 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  Category
                </span>
                <h3 className="mt-2 text-lg font-semibold">Product Name 4</h3>
                <p className="text-sm text-gray-600">Brand Name</p>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      $50.00
                    </span>
                    <span className="text-sm line-through text-gray-500">
                      $70.00
                    </span>
                  </div>
                  <div className="absolute top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                    30% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </Swiper>

        <div className="custom-arrows-swiper-top-seller">
          <div className="arrows-swiper-top-seller custom-arrow-prev-top-seller">
            <ArrowLeftOutlined />
          </div>
          <div className="arrows-swiper-top-seller custom-arrow-next-top-seller">
            <ArrowRightOutlined />
          </div>
        </div>
      </div>

      <div className="banner-sale-off-50 py-2">
        <div className="sale-banner-image">
          <Image
            src="https://mint07.com/wp-content/uploads/2020/12/banner-web-paula-choice.png"
            alt="Sale Banner"
            fill
          />
        </div>
        <div className="sale-banner-content">
          <h2 className="sale-title">35% OFF</h2>
          <p className="sale-subtitle">
            All <b>SKINCARE Items</b>
          </p>
          <button className="sale-button">Shop Now</button>
        </div>
      </div>

      <div className="product-container px-4 pb-12 mt-0">
        <div className="product-header flex justify-between items-center pb-4">
          <h2
            className="text-2xl font-bold"
            style={{ textTransform: "uppercase" }}
          >
            Ambassadors
          </h2>
          <Link href="/all-products" className="text-blue-500 hover:underline">
            See All
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          className="mySwiper2"
          slidesPerView={1}
          spaceBetween={15}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          navigation={{
            nextEl: ".custom-arrow-next-ambassadors",
            prevEl: ".custom-arrow-prev-ambassadors",
          }}
        >
          <div className="flex space-x-6 overflow-x-auto">
            <SwiperSlide>
              <div className="border border-gray-200 p-4 flex flex-col items-center text-center bg-white shadow-md rounded-lg">
                <div className="w-32 h-32 mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
                    alt="User"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="text-xl font-semibold mb-2">Tên User</div>
                <div className="border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600 mb-2">
                  @username
                </div>

                <div className="flex space-x-3 mb-4">
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <FacebookOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <TwitterOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <YoutubeOutlined />
                  </Link>
                </div>

                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Shop with me
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 flex flex-col items-center text-center bg-white shadow-md rounded-lg">
                <div className="w-32 h-32 mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
                    alt="User"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="text-xl font-semibold mb-2">Tên User</div>
                <div className="border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600 mb-2">
                  @username
                </div>

                <div className="flex space-x-3 mb-4">
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <FacebookOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <TwitterOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <YoutubeOutlined />
                  </Link>
                </div>

                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Shop with me
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 flex flex-col items-center text-center bg-white shadow-md rounded-lg">
                <div className="w-32 h-32 mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
                    alt="User"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="text-xl font-semibold mb-2">Tên User</div>
                <div className="border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600 mb-2">
                  @username
                </div>

                <div className="flex space-x-3 mb-4">
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <FacebookOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <TwitterOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <YoutubeOutlined />
                  </Link>
                </div>

                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Shop with me
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 flex flex-col items-center text-center bg-white shadow-md rounded-lg">
                <div className="w-32 h-32 mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
                    alt="User"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="text-xl font-semibold mb-2">Tên User</div>
                <div className="border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600 mb-2">
                  @username
                </div>

                <div className="flex space-x-3 mb-4">
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <FacebookOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <TwitterOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <YoutubeOutlined />
                  </Link>
                </div>

                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Shop with me
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="border border-gray-200 p-4 flex flex-col items-center text-center bg-white shadow-md rounded-lg">
                <div className="w-32 h-32 mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
                    alt="User"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="text-xl font-semibold mb-2">Tên User</div>
                <div className="border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600 mb-2">
                  @username
                </div>

                <div className="flex space-x-3 mb-4">
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <FacebookOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <TwitterOutlined />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-500">
                    <YoutubeOutlined />
                  </Link>
                </div>

                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Shop with me
                </button>
              </div>
            </SwiperSlide>
          </div>
        </Swiper>

        <div className="custom-arrows-swiper-ambassadors">
          <div className="arrows-swiper-ambassadors custom-arrow-prev-ambassadors">
            <ArrowLeftOutlined />
          </div>
          <div className="arrows-swiper-ambassadors custom-arrow-next-ambassadors">
            <ArrowRightOutlined />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
