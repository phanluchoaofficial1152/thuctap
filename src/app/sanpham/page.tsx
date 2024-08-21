"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/Product/ProductList";
import { Breadcrumb } from "antd";
import Link from "next/link";

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0&limit=16"
        );
        const data = response.data.data;

        const formattedProducts = data.map((item: any) => ({
          title: item.class_name,
          brand: "Brand Name",
          originalPrice: item.course_price,
          discountedPrice: item.course_discount,
          discount: "30% Off",
          category: item.campus.campus_name,
          image:
            "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
          isNew: new Date(item.start_date) > new Date(),
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
    },
    {
      title: <Link href="/sanpham">Sản phẩm</Link>,
    },
  ];

  return (
    <>
      {/* title */}
      <title>Sản phẩm | IVY moda | Thực tập NextJS</title>
      {/* end title */}

      <Breadcrumb
        className="text-sm md:text-base px-5 py-5"
        separator=">"
        items={breadcrumbItems}
      />

      {/* sản phẩm */}
      <div className="px-4">
        <ProductList products={products} />
      </div>
      {/* End sản phẩm */}
    </>
  );
};

export default ProductPage;
