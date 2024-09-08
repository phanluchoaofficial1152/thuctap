import Link from "next/link";
import { Breadcrumb } from "antd";
import ProductList from "../../components/Product/ProductList";
import { NextPage } from "next";

interface Product {
  title: string;
  brand: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  category: string;
  image: string;
  isNew: boolean;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0&limit=16"
    );

    const data = await response.json();

    return data.data.map((item: any) => ({
      title: item.class_name,
      brand: item.campus.campus_name,
      originalPrice: item.course_price,
      discountedPrice: item.course_discount,
      discount: "30% Off",
      category: item.campus.campus_name,
      image:
        "https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/07/31/a83bc666879e970ebfa39facf7e4ef4f.webp",
      isNew: new Date(item.start_date) > new Date(),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const ProductPage: NextPage<{}> = async () => {
  const products = await fetchProducts();

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
      <title>Sản phẩm | IVY moda | Thực tập NextJS</title>

      <Breadcrumb
        className="text-sm md:text-base px-4 md:px-[6rem] py-5"
        separator=">"
        items={breadcrumbItems}
      />

      <div className="px-4 md:px-[6rem]">
        <ProductList products={products} />
      </div>
    </>
  );
};

export default ProductPage;
