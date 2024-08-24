"use client";

import { NextPage } from "next";
import React, { useState } from "react";
import { Breadcrumb, Button, Input, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const products = [
  {
    title: "Product Title Goes Here",
    originalPrice: 32.0,
    discountedPrice: 25.6,
  },
  {
    title: "Product Title Goes Here",
    originalPrice: 32.0,
    discountedPrice: 25.6,
  },
  {
    title: "Product Title Goes Here",
    originalPrice: 32.0,
    discountedPrice: 25.6,
  },
  {
    title: "Product Title Goes Here",
    originalPrice: 32.0,
    discountedPrice: 25.6,
  },
];

const breadcrumbItems = [
  {
    title: <Link href="/">Home</Link>,
  },
  {
    title: <Link href="/pages/giohang">Giỏ hàng</Link>,
  },
];

const CartPage: NextPage<{}> = () => {
  const [quantities, setQuantities] = useState<number[]>(
    Array(products.length).fill(1)
  );

  const router = useRouter();

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleInputChange = (index: number, value: string) => {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      handleQuantityChange(index, parsedValue);
    }
  };

  const handlePayment = () => {
    router.replace("/pages/thanhtoan/buoc1");
  };

  return (
    <div className="px-4 py-4">
      <title>Giỏ hàng | IVY moda | Thực tập NextJS</title>

      <Breadcrumb
        className="text-sm md:text-base p-1"
        separator=">"
        items={breadcrumbItems}
      />

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 space-y-4">
          <Title level={2}>CART</Title>
          {products.map((product, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 flex justify-between items-center rounded-lg"
            >
              <div className="flex items-center">
                <Image
                  src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/04/12/c1089c5aee19b45f4c320f05842589e0.webp"
                  alt="Product"
                  width={100}
                  height={100}
                  className="object-cover mr-4"
                />
                <div>
                  <Text className="font-bold text-black text-lg">
                    {product.title}
                  </Text>
                  <div className="flex gap-4">
                    <Text delete className="text-gray-500 text-md">
                      AED {product.originalPrice.toFixed(2)}
                    </Text>
                    <Text className="font-bold text-black text-md">
                      AED {product.discountedPrice.toFixed(2)}
                    </Text>
                  </div>
                  <div className="flex items-center mt-2">
                    <Button
                      onClick={() =>
                        handleQuantityChange(
                          index,
                          Math.max(1, quantities[index] - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      min={1}
                      max={99}
                      value={quantities[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onBlur={(e) => handleInputChange(index, e.target.value)}
                      className="mx-2 w-20 text-center"
                    />
                    <Button
                      onClick={() =>
                        handleQuantityChange(index, quantities[index] + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <Button type="link" className="text-red-500">
                REMOVE
              </Button>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md ml-6 mt-12">
          <Title level={4}>Add Promo Code</Title>
          <Input placeholder="Enter promo code" className="mb-4" />
          <Button type="primary" className="w-full">
            ADD
          </Button>

          <Title level={4} className="mt-6">
            Summary
          </Title>
          <div className="border-b border-gray-300 pb-4 mb-4 flex flex-col justify-between">
            <div className="flex justify-between mb-2">
              <Text>Price (4 items):</Text>
              <Text>AED 102.40</Text>
            </div>
            <div className="flex justify-between mb-2">
              <Text>Delivery Charge:</Text>
              <Text>AED 15.00</Text>
            </div>
            <div className="flex justify-between font-bold">
              <Text>Total Price:</Text>
              <Text>AED 117.40</Text>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button>CONTINUE SHOPPING</Button>
            <Button
              onClick={handlePayment}
              type="primary"
              className="bg-black border-black"
            >
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
