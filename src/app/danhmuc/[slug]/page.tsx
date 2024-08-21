"use client";

import { Breadcrumb } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

import CategoryProduct from "@/app/components/Category/CategoryProduct";
import axios from "axios";

// const products = [
//   {
//     title: "Product Title Goes Here",
//     brand: "Brand",
//     originalPrice: "AED 32.00",
//     discountedPrice: "AED 25.60",
//     discount: "30% Off",
//     category: "Makeup",
//     image:
//       "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
//     isNew: true,
//   },

//   {
//     title: "Product Title Goes Here",
//     brand: "Brand",
//     originalPrice: "AED 32.00",
//     discountedPrice: "AED 25.60",
//     discount: "30% Off",
//     category: "Makeup",
//     image:
//       "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
//     isNew: false,
//   },

//   {
//     title: "Product Title Goes Here",
//     brand: "Brand",
//     originalPrice: "AED 32.00",
//     discountedPrice: "AED 25.60",
//     discount: "30% Off",
//     category: "Makeup",
//     image:
//       "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
//     isNew: false,
//   },

//   {
//     title: "Product Title Goes Here",
//     brand: "Brand",
//     originalPrice: "AED 32.00",
//     discountedPrice: "AED 25.60",
//     discount: "30% Off",
//     category: "Makeup",
//     image:
//       "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
//     isNew: false,
//   },

//   {
//     title: "Product Title Goes Here 222",
//     brand: "Brand",
//     originalPrice: "AED 32.00",
//     discountedPrice: "AED 25.60",
//     discount: "30% Off",
//     category: "Makeup",
//     image:
//       "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
//     isNew: false,
//   },

//   {
//     title: "Product Title Goes Here",
//     brand: "Brand",
//     originalPrice: "AED 32.00",
//     discountedPrice: "AED 25.60",
//     discount: "30% Off",
//     category: "Makeup",
//     image:
//       "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
//     isNew: false,
//   },

//   {
//     title: "Product Title Goes Here",
//     brand: "Brand",
//     originalPrice: "AED 32.00",
//     discountedPrice: "AED 25.60",
//     discount: "30% Off",
//     category: "Makeup",
//     image:
//       "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
//     isNew: true,
//   },

//   {
//     title: "Product Title Goes Here",
//     brand: "Brand",
//     originalPrice: "AED 32.00",
//     discountedPrice: "AED 25.60",
//     discount: "30% Off",
//     category: "Makeup",
//     image:
//       "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
//     isNew: true,
//   },
// ];

const CategorySlugContent: FC = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [classCode, setClassCode] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const formatTitle = Array.isArray(slug)
        ? slug.join(" ").replace("-", " ")
        : slug.replace("-", " ");

      setTitle(formatTitle);
    }
  }, [slug]);

  useEffect(() => {
    const fetchClassCode = async () => {
      try {
        const response = await axios.get(
          "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0&limit=16"
        );
        const data = response.data.data;

        const matchedClass = data.find((item: any) => item.class_slug === slug);

        if (matchedClass) {
          setClassCode(matchedClass.class_code);
        } else {
          console.error("Không tìm thấy class_slug");
        }
      } catch (error) {
        console.error("Error fetching class code:", error);
      }
    };

    if (slug) {
      fetchClassCode();
    }
  }, [slug]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = classCode
          ? `https://api-pro.teklearner.com/class/v1/get-list-class?class_code=${classCode}&skip=0&limit=16`
          : `https://api-pro.teklearner.com/class/v1/get-list-class?skip=0&limit=16`;

        const response = await axios.get(apiUrl);
        const data = response.data.data;

        const formattedProducts = data.map((item: any) => ({
          title: item.class_name,
          brand: "Brand Name",
          originalPrice: "AED 32.00",
          discountedPrice: "AED 25.60",
          discount: "30% Off",
          category: item.campus.campus_name,
          image:
            "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp", // Thay thế bằng link hình ảnh nếu có
          isNew: new Date(item.start_date) > new Date(),
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [classCode]);

  const capitalizeFirstLetter = (string: string | null) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
    },
    {
      title: (
        <Link href={`/danhmuc/${title}`}>
          {title ? capitalizeFirstLetter(title) : ""}
        </Link>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb
        className="text-sm md:text-base"
        separator=">"
        items={breadcrumbItems}
      />

      <Title level={2} className="py-4">
        {title?.toUpperCase()}
      </Title>

      {/* product */}
      <CategoryProduct products={products} />
      {/* end product */}
    </>
  );
};

export default CategorySlugContent;
