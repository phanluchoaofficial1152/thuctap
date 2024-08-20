import Image from "next/image";
import { FC } from "react";

import "../danhmuc/[slug]/slug.css";

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

interface CategoryProductProps {
  products: Product[];
}

const CategoryProduct: FC<CategoryProductProps> = ({ products }) => {
  return (
    <>
      {/* sản phẩm theo danh mục */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-gray-200 p-3 rounded-lg relativeeeee">
            <Image
              src={product.image}
              alt={product.title}
              width={1000}
              height={1000}
              className="object-cover mb-3"
            />
            {product.isNew && (
              <span className="absoluteeeee new-label">NEW</span>
            )}
            {product.category && (
              <span className="absoluteeeee category-label">
                {product.category}
              </span>
            )}
            {/* <div className="text-sm text-gray-600">{product.category}</div> */}
            <h3 className="font-bold">{product.title}</h3>
            <div className="flex justify-between items-center">
              <span className="text-red-500 line-through">
                {product.originalPrice}
              </span>
              <span className="text-lg font-bold">
                {product.discountedPrice}
              </span>
              <span className="bg-black text-white text-xs px-2 py-1">
                {product.discount}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* end sản phẩm theo danh mục */}

      {/* phân trang */}
      <div></div>
      {/* end phân trang */}
    </>
  );
};

export default CategoryProduct;
