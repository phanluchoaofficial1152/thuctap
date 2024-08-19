"use client";

import { useParams } from "next/navigation";
import { FC } from "react";

const ProductDetails: FC = () => {
  const { productId } = useParams();

  return <div className="px-4">ProductDetails</div>;
};

export default ProductDetails;
