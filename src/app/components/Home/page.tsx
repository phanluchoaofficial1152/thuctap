"use client";

import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import Slider from "react-slick";
import Image from "next/image";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import "./Home.css";
import axios from "axios";
import { CircularProgress, Box, IconButton } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useLocation } from "wouter";

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
  course_level: {
    course_level_title: string;
  };
  teachers: [
    {
      id: string;
      name: string;
      email: string;
    }
  ];
}

const HomePage = () => {
  const carouselRef = useRef<any>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [classesSwiper, setClassesSwiper] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [, navigate] = useLocation();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0&limit=4"
        );
        setClasses(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchClassesSwiper = async () => {
      try {
        const response = await axios.get(
          "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0"
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

  const handRedirect = (url: string) => {
    navigate(url);
  };

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
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold">NEW ARRIVALS</h2>
          <Link href="#" className="mt-4 md:mt-0 text-gray-500">
            SEE ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="relative bg-gray-200 flex flex-col items-center justify-center overflow-hidden">
            <img
              src="https://pubcdn.ivymoda.com/files/news/2024/08/26/web-50%20copy.jpg"
              alt="Featured Product"
              className="product-image rounded-lg"
            />
            <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded">
              SHOP NOW
            </Button>
          </div>

          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            classes.map((classItem) => (
              <div
                key={classItem.id}
                className="border p-4 bg-white flex flex-col rounded-lg"
              >
                <div className="relative">
                  <Link
                    href="#"
                    onClick={() =>
                      handRedirect(`/pages/sanpham/${classItem.id}`)
                    }
                  >
                    <img
                      src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/06/19/9c2dc8cb739c45c9389309359d569ffe.webp"
                      alt={classItem.class_name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                  <div className="absolute bottom-2 left-2 bg-black text-white text-sm px-2 py-1 rounded">
                    {classItem.class_code}
                  </div>
                </div>
                <h3 className="font-semibold mt-2 text-lg">
                  {classItem.class_name}
                </h3>
                <div className="text-gray-500">
                  {classItem.teachers.length > 0
                    ? classItem.teachers[0].name
                    : "No Brand"}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="line-through text-gray-400">
                    VND {classItem.course_price.toLocaleString()}
                  </span>
                  <span className="font-bold text-black">
                    VND{" "}
                    {(
                      classItem.course_price - classItem.course_discount
                    ).toLocaleString()}
                  </span>
                  <span className="text-green-500">
                    {(
                      (classItem.course_discount / classItem.course_price) *
                      100
                    ).toFixed(0)}
                    % Off
                  </span>
                </div>
              </div>
            ))
          )}

          <div className="relative bg-gray-200 flex flex-col items-center justify-center overflow-hidden rounded-lg">
            <img
              src="https://pubcdn.ivymoda.com/files/news/2024/08/26/web-50%20copy.jpg"
              alt="Featured Product"
              className="product-image"
            />
            <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded">
              SHOP NOW
            </Button>
          </div>
        </div>
      </div>
      {/* end sp mới */}

      {/* sp mới slider */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">NEW ARRIVALS</h2>
          <Link href="#" className="text-blue-500 hover:underline">
            SEE ALL
          </Link>
        </div>

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
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
            navigation={true}
            modules={[Navigation]}
          >
            {classesSwiper.map((classItem) => (
              <SwiperSlide key={classItem.id}>
                <div
                  key={classItem.id}
                  className="border p-4 bg-white flex flex-col rounded-lg"
                >
                  <div className="relative">
                    <Link
                      href="#"
                      onClick={() =>
                        handRedirect(`/pages/sanpham/${classItem.id}`)
                      }
                    >
                      <img
                        src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/08/23/7a640db034408beed84684f0cac6e6d8.webp"
                        alt={classItem.class_name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </Link>
                    <div className="absolute bottom-2 left-2 bg-black text-white text-sm px-2 py-1 rounded">
                      {classItem.class_code}
                    </div>
                  </div>
                  <h3 className="font-semibold mt-2 text-lg">
                    {classItem.class_name}
                  </h3>
                  <div className="text-gray-500">
                    {classItem.teachers.length > 0
                      ? classItem.teachers[0].name
                      : "No Brand"}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="line-through text-gray-400">
                      VND {classItem.course_price.toLocaleString()}
                    </span>
                    <span className="font-bold text-black">
                      VND{" "}
                      {(
                        classItem.course_price - classItem.course_discount
                      ).toLocaleString()}
                    </span>
                    <span className="text-green-500">
                      {(
                        (classItem.course_discount / classItem.course_price) *
                        100
                      ).toFixed(0)}
                      % Off
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {/* end sp mới slider */}

      {/* banner */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 bg-[#E3E3E3]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4">
          <div className="flex justify-center items-center">
            <img
              src="https://cotton4u.vn/files/news/2024/09/04/001ef89e97dc2d1922d95995d5f9ef9b.webp"
              alt="Banner"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="text-center">
            <p className="font-bold text-red-600 mb-4 text-3xl sm:text-4xl lg:text-5xl">
              50% OFF
            </p>
            <p className="uppercase text-xl sm:text-2xl lg:text-3xl">
              On all items
            </p>
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-transparent border-2 border-black text-black py-2 px-4 rounded-lg hover:bg-black hover:text-white transition duration-300 text-base sm:text-lg lg:text-xl">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      {/* end banner */}

      {/* sp mới hot slider */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">TOP SELLERS</h2>
          <Link href="#" className="text-blue-500 hover:underline">
            SEE ALL
          </Link>
        </div>

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
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
            navigation={true}
            modules={[Navigation]}
          >
            {classesSwiper.map((classItem) => (
              <SwiperSlide key={classItem.id}>
                <div
                  key={classItem.id}
                  className="border p-4 bg-white flex flex-col rounded-lg"
                >
                  <div className="relative">
                    <Link
                      href="#"
                      onClick={() =>
                        handRedirect(`/pages/sanpham/${classItem.id}`)
                      }
                    >
                      <img
                        src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/08/23/7a640db034408beed84684f0cac6e6d8.webp"
                        alt={classItem.class_name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </Link>
                    <div className="absolute bottom-2 left-2 bg-black text-white text-sm px-2 py-1 rounded">
                      {classItem.class_code}
                    </div>
                  </div>
                  <h3 className="font-semibold mt-2 text-lg">
                    {classItem.class_name}
                  </h3>
                  <div className="text-gray-500">
                    {classItem.teachers.length > 0
                      ? classItem.teachers[0].name
                      : "No Brand"}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="line-through text-gray-400">
                      VND {classItem.course_price.toLocaleString()}
                    </span>
                    <span className="font-bold text-black">
                      VND{" "}
                      {(
                        classItem.course_price - classItem.course_discount
                      ).toLocaleString()}
                    </span>
                    <span className="text-green-500">
                      {(
                        (classItem.course_discount / classItem.course_price) *
                        100
                      ).toFixed(0)}
                      % Off
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {/* end sp mới hot slider */}

      {/* banner */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 bg-[#E3E3E3]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4">
          <div className="flex justify-center items-center">
            <img
              src="https://t4.ftcdn.net/jpg/04/96/39/19/360_F_496391960_SzLnSBgWxfN4OnJbH5Om3I3y5aFyLV0F.jpg"
              alt="Banner"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="text-center">
            <p className="font-bold text-red-600 mb-4 text-3xl sm:text-4xl lg:text-5xl">
              35% OFF
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl">
              All <b>SKINCARE Items</b>
            </p>
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-transparent border-2 border-black text-black py-2 px-4 rounded-lg hover:bg-black hover:text-white transition duration-300 text-base sm:text-lg lg:text-xl">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      {/* end banner */}

      {/* sp mới hot slider */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">AMBASSADORS</h2>
          <Link href="#" className="text-blue-500 hover:underline">
            SEE ALL
          </Link>
        </div>

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
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
            navigation={true}
            modules={[Navigation]}
          >
            {classesSwiper.map((classItem) => (
              <SwiperSlide key={classItem.id}>
                <div className="border p-6 bg-white flex flex-col items-center rounded-lg shadow-lg">
                  <div className="mb-4">
                    <Link
                      href="#"
                      onClick={() =>
                        handRedirect(`/pages/sanpham/${classItem.id}`)
                      }
                    >
                      <img
                        src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/08/23/7a640db034408beed84684f0cac6e6d8.webp"
                        alt={classItem.class_name}
                        className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                      />
                    </Link>
                  </div>
                  <h3 className="font-semibold text-lg text-center">
                    {classItem.campus.campus_name}
                  </h3>
                  <div className="flex justify-center mt-2 mb-1">
                    <span className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-full text-gray-500 text-sm">
                      {classItem.teachers.length > 0
                        ? `@${classItem.course_level.course_level_title}`
                        : "@NoBrand"}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <FaFacebookF />
                    <FaInstagram />
                    <FaYoutube />
                  </div>
                  <div className="w-full"></div>
                  <button className="mt-4 px-4 py-2 bg-black text-white rounded-full">
                    SHOP WITH ME
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {/* end sp mới hot slider */}
    </>
  );
};

export default HomePage;
