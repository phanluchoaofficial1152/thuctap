"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Slider from "react-slick";
import Image from "next/image";
import ArrowLeftOutlined from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlined from "@mui/icons-material/ArrowRightOutlined";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import "./Home.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircularProgress, Box, IconButton } from "@mui/material";
import ClassCard from "../TeacherCard/TeacherCard";

interface Class {
  id: string;
  class_name: string;
  class_code: string;
  course_price: number;
  course_discount: number;
  campus: {
    campus_name: string;
    campus_address: string;
  };
  teachers: [
    {
      id: string;
      name: string;
      email: string;
    }
  ];
}

const HomePage: FC = () => {
  const carouselRef = useRef<any>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [classesSwiper, setClassesSwiper] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0&limit=2"
        );
        setClasses(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchClassesSwiper = async () => {
      try {
        const response = await axios.get(
          "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0&limit=4"
        );
        setClassesSwiper(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      await fetchClasses();
      await fetchClassesSwiper();
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  const handlePrev = () => {
    carouselRef.current.slickPrev();
  };

  const settings = {
    dots: false,
    fade: true,
    autoplay: true,
    arrows: false,
  };

  const handleRedirect = () => {
    router.replace("/pages/sanpham");
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* slider */}
      <Box position="relative" className="carousel-container">
        <Slider ref={carouselRef} {...settings}>
          <Box className="carousel-slide">
            <Image
              src="https://cotton4u.vn/files/news/2024/07/27/079d6932fffc257aafc0eb19e2172061.webp"
              alt="Slide 1"
              width={2000}
              height={500}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box className="carousel-slide">
            <Image
              src="https://cotton4u.vn/files/news/2024/07/25/971943fd5e05439de2c8fed10872c4b4.webp"
              alt="Slide 2"
              width={2000}
              height={500}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box className="carousel-slide">
            <Image
              src="https://cotton4u.vn/files/news/2024/07/01/5d855d0b818e29bdc91c15f6d68eba65.webp"
              alt="Slide 3"
              width={2000}
              height={500}
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Slider>

        {/* Custom Arrows */}
        <Box
          className="custom-arrows"
          position="absolute"
          top="50%"
          width="100%"
          display="flex"
          justifyContent="space-between"
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              position: "absolute",
              zIndex: 1,
            }}
          >
            <ArrowBackIosNew />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              position: "absolute",
              zIndex: 1,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
      {/* end slider */}

      {/* sp mới */}
      <div className="mx-auto px-4 py-8">
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
          <div className="relativee lg:w-2/5 flex-1">
            {" "}
            <Image
              src="https://cotton4u.vn/files/news/2024/07/27/079d6932fffc257aafc0eb19e2172061.webp"
              alt="Large Product Image"
              width={1000}
              height={400}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRedirect}
              className="absolutee bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-black text-black py-2 px-4 rounded"
            >
              Shop Now
            </button>
          </div>

          <div className="lg:w-2/5 w-full flex flex-col lg:flex-row gap-6">
            {classes.map((classItem, items) => (
              <div key={"class item" + items}>
                <div className="border border-gray-200 p-2 relativee">
                  <Link href={`/pages/sanpham/${classItem.id}`}>
                    <Image
                      src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                      alt="Product 1"
                      width={500}
                      height={500}
                      className="w-full h-[400px] object-cover"
                    />
                  </Link>
                  <span className="absolutee top-[65%] left-5 bg-gray-700 text-white text-xs px-2 py-1 rounded">
                    {classItem.campus.campus_name}
                  </span>
                  <Link href={`/pages/sanpham/${classItem.id}`}>
                    <h3 className="mt-2 text-lg font-semibold">
                      {classItem.class_name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {classItem.campus.campus_address}
                  </p>
                  <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-red-500">
                        {classItem.course_price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      {classItem.course_discount > 0 && (
                        <span className="text-sm line-through text-gray-500">
                          {classItem.course_price + classItem.course_discount}
                        </span>
                      )}
                    </div>
                    {classItem.course_discount > 0 && (
                      <div className="absolutee top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                        {classItem.course_discount}% OFF
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="product-content flex flex-col lg:flex-row gap-6 mt-8">
          <div className="lg:w-2/5 flex flex-col lg:flex-row gap-6">
            {classes.map((classItem, value) => (
              <div key={"value items" + value}>
                <div className="border border-gray-200 p-4 relativee flex-1">
                  <Link href={`/pages/sanpham/${classItem.id}`}>
                    <Image
                      src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                      alt="Product 1"
                      width={500}
                      height={500}
                      className="w-full h-[400px] object-cover"
                    />
                  </Link>
                  <span className="absolutee top-[65%] left-5 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {classItem.campus.campus_name}
                  </span>
                  <Link href={`/pages/sanpham/${classItem.id}`}>
                    <h3 className="mt-2 text-lg font-semibold">
                      {classItem.class_name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {classItem.campus.campus_address}
                  </p>
                  <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-red-500">
                        {classItem.course_price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      {classItem.course_discount > 0 && (
                        <span className="text-sm line-through text-gray-500">
                          {classItem.course_price + classItem.course_discount}
                        </span>
                      )}
                    </div>
                    {classItem.course_discount > 0 && (
                      <div className="absolutee top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                        {classItem.course_discount}% OFF
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relativee lg:w-2/5 flex-1">
            {" "}
            <Image
              src="https://cotton4u.vn/files/news/2024/07/27/079d6932fffc257aafc0eb19e2172061.webp"
              alt="Large Product Image"
              width={2000}
              height={400}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRedirect}
              className="absolutee bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-black text-black py-2 px-4 rounded"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
      {/* end sp mới */}

      {/* sp mới slider */}
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
            {classesSwiper.map((classItem, valueswiper) => (
              <SwiperSlide key={"valuee swiper" + valueswiper}>
                <div className="border border-gray-200 p-4 relativee">
                  <Link href={`/pages/sanpham/${classItem.id}`}>
                    <Image
                      src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                      alt={classItem.class_name}
                      width={500}
                      height={500}
                      className="w-full h-[400px] object-cover"
                    />
                  </Link>
                  <span className="absolutee top-[65%] left-5 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {classItem.campus.campus_name}
                  </span>
                  <Link href={`/pages/sanpham/${classItem.id}`}>
                    <h3 className="mt-2 text-lg font-semibold">
                      {classItem.class_name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {classItem.campus.campus_address}
                  </p>
                  <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-red-500">
                        {classItem.course_price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      {classItem.course_discount > 0 && (
                        <span className="text-sm line-through text-gray-500">
                          ${classItem.course_price + classItem.course_discount}
                        </span>
                      )}
                    </div>
                    {classItem.course_discount > 0 && (
                      <div className="absolutee top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                        {classItem.course_discount}% OFF
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
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
      {/* end sp mới slider */}

      {/* banner qcáo sp 50% */}
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
      {/* end banner qcáo sp 50% */}

      {/* sp bán chạy slider */}
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
            {classesSwiper.map((classItem, itemswiperclass) => (
              <SwiperSlide key={"item swiper class" + itemswiperclass}>
                <div className="border border-gray-200 p-4 relativee">
                  <Link href={`/pages/sanpham/${classItem.id}`}>
                    <Image
                      src="https://cotton4u.vn/files/product/thumab/400/2024/07/26/0997f49136c4a49b79d56f36c7ce8126.webp"
                      alt={classItem.class_name}
                      width={500}
                      height={500}
                      className="w-full h-[400px] object-cover"
                    />
                  </Link>
                  <span className="absolutee top-[65%] left-5 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {classItem.campus.campus_name}
                  </span>
                  <Link href={`/pages/sanpham/${classItem.id}`}>
                    <h3 className="mt-2 text-lg font-semibold">
                      {classItem.class_name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {classItem.campus.campus_address}
                  </p>
                  <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-red-500">
                        {classItem.course_price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      {classItem.course_discount > 0 && (
                        <span className="text-sm line-through text-gray-500">
                          ${classItem.course_price + classItem.course_discount}
                        </span>
                      )}
                    </div>
                    {classItem.course_discount > 0 && (
                      <div className="absolutee top-100 right-2 border border-black text-xs px-2 py-1 rounded bg-red-500 text-white">
                        {classItem.course_discount}% OFF
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
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
      {/* end sp bán chạy slider */}

      {/* banner qcáo sp */}
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
      {/* end banner qcáo sp */}

      {/* khách hàng */}
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
          className="mySwiper5"
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
          <div className="flex space-x-5 w-full">
            {classesSwiper.map((classItem23, itemclassescustomer) => (
              <>
                <SwiperSlide key={"item swiper class customer 2" + itemclassescustomer}>
                  <ClassCard classItem2={classItem23} key={itemclassescustomer} />
                </SwiperSlide>
              </>
            ))}
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
      {/* end khách hàng */}
    </>
  );
};

export default HomePage;