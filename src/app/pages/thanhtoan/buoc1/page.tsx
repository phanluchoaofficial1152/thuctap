"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Breadcrumb,
  Steps,
  Divider,
  message,
} from "antd";
import { NextPage } from "next";
import { useLocation } from "wouter";

const { Title, Text } = Typography;
const { Option } = Select;

const breadcrumbItems = [
  {
    title: <Link href="/">Home</Link>,
  },
  {
    title: <Link href="/pages/thanhtoan/buoc1">Thanh toán</Link>,
  },
];

const CheckOutStep1: NextPage<{}> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>("");

  const [percent, setPercent] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [, navigate] = useLocation();

  const calculatePercent = () => {
    let filledFields = 0;
    const totalFields = 7;

    if (firstName) filledFields += 1;
    if (lastName) filledFields += 1;
    if (area) filledFields += 1;
    if (phone) filledFields += 1;
    if (streetAddress) filledFields += 1;
    if (city) filledFields += 1;
    if (deliveryInstructions) filledFields += 1;

    const completionPercent = (filledFields / totalFields) * 100;
    setPercent(completionPercent);
  };

  useEffect(() => {
    calculatePercent();
  }, [
    firstName,
    lastName,
    area,
    phone,
    streetAddress,
    city,
    deliveryInstructions,
  ]);

  const handleContinue = () => {
    if (percent === 100) {
      setCurrentStep(1);
      navigate("/pages/thanhtoan/buoc2");
    } else {
      message.warning("Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <div className="px-4 md:px-[6rem] py-4">
      <title>Thanh toán | IVY moda | Thực tập NextJS</title>

      <Breadcrumb
        className="text-sm md:text-base p-1"
        separator=">"
        items={breadcrumbItems}
      />

      <Title level={2} className="py-3">
        CHECKOUT
      </Title>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Steps
            current={currentStep}
            percent={percent}
            items={[
              {
                title: "Shipping Details",
                status: currentStep === 1 ? "finish" : "process",
              },
              {
                title: "Billing Details",
              },
            ]}
          />

          <Divider />

          <Form layout="vertical">
            <Form.Item label="Type of Address" className="w-full md:w-1/2">
              <Select defaultValue="Personal">
                <Option value="Personal">Personal</Option>
                <Option value="Business">Business</Option>
              </Select>
            </Form.Item>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <Form.Item label="First Name" className="flex-1">
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Last Name" className="flex-1">
                <Select
                  showSearch
                  value={lastName}
                  placeholder="Select or type last name"
                  onChange={(value) => setLastName(value)}
                  onSearch={(value) => setLastName(value)}
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="Luc Hoa">Luc Hoa</Option>
                  <Option value="Khac Viet">Khac Viet</Option>
                  <Option value="Phuoc An">Phuoc An</Option>
                  <Option value={lastName}>{lastName}</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <Form.Item label="Street Address" className="flex-1">
                <Input
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Area" className="flex-1">
                <Select
                  showSearch
                  value={area}
                  placeholder="Select or type area"
                  onChange={(value) => setArea(value)}
                  onSearch={(value) => setArea(value)}
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="Bình Thạnh">Bình Thạnh</Option>
                  <Option value="Gò Vấp">Gò Vấp</Option>
                  <Option value="Bình Tân">Bình Tân</Option>
                  <Option value={area}>{area}</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <Form.Item label="City" className="flex-1">
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </Form.Item>
              <Form.Item label="Phone Number" className="flex-1">
                <Select
                  showSearch
                  value={phone}
                  placeholder="Select or type phone number"
                  onChange={(value) => setPhone(value)}
                  onSearch={(value) => setPhone(value)}
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="84332436067">+84332436067</Option>
                  <Option value="8435110123">+8435110123</Option>
                  <Option value="84983557744">+84983557744</Option>
                  <Option value={phone}>{phone}</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item label="Delivery Instructions">
              <Input.TextArea
                rows={4}
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
              />
            </Form.Item>

            <Button type="primary" htmlType="button" onClick={handleContinue}>
              CONTINUE
            </Button>
          </Form>
        </div>

        <div className="w-full md:w-1/3 h-[160px] bg-gray-100 p-4 rounded-lg shadow-md">
          <Title level={4}>Summary</Title>
          <div className="mb-4 flex flex-col justify-between">
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
        </div>
      </div>
    </div>
  );
};

export default CheckOutStep1;
