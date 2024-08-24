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
  Checkbox,
  InputNumber,
} from "antd";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Option } = Select;

const breadcrumbItems = [
  {
    title: <Link href="/">Home</Link>,
  },
  {
    title: <Link href="/pages/thanhtoan/buoc2">Thanh toán</Link>,
  },
];

const CheckOutStep2: NextPage<{}> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [emirate, setEmirate] = useState<string>("");

  const [percent, setPercent] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<number>(0);
  const [cardName, setCardName] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<number>(0);
  const [expiryYear, setExpiryYear] = useState<number>(0);
  const [cvv, setCvv] = useState<number>(0);

  const router = useRouter();

  const calculatePercent = () => {
    let filledFields = 0;
    const totalFields = 11;

    if (firstName) filledFields += 1;
    if (lastName) filledFields += 1;
    if (area) filledFields += 1;
    if (streetAddress) filledFields += 1;
    if (emirate) filledFields += 1;

    if (cardNumber) filledFields += 1;
    if (cardName) filledFields += 1;
    if (expiryMonth) filledFields += 1;
    if (expiryYear) filledFields += 1;
    if (cvv) filledFields += 1;
    if (sameAsShipping) filledFields += 1;

    const completionPercent = (filledFields / totalFields) * 100;
    setPercent(completionPercent);
  };

  useEffect(() => {
    calculatePercent();
  }, [
    firstName,
    lastName,
    area,
    streetAddress,
    sameAsShipping,
    emirate,
    cardNumber,
    cardName,
    expiryMonth,
    expiryYear,
    cvv,
  ]);

  const handleContinue = () => {
    if (percent === 100) {
      router.push("/pages/camon");
    } else {
      message.warning("Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <div className="px-4 py-4">
      <title>Thanh toán | IVY moda | Thực tập NextJS</title>

      <Breadcrumb
        className="text-sm md:text-base p-1"
        separator=">"
        items={breadcrumbItems}
      />

      <Title level={2} className="py-3">
        CHECKOUT
      </Title>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 space-y-2">
          <Steps
            current={1}
            percent={percent}
            items={[
              {
                title: "Shipping Details",
                status: "finish",
              },
              {
                title: "Billing Details",
                status: currentStep === 1 ? "finish" : "process",
              },
            ]}
          />

          <Divider />

          <Form layout="vertical">
            <Form.Item className="w-full md:w-1/2 mb-2 mt-2">
              <Checkbox
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
              >
                Same as Shipping Address
              </Checkbox>
            </Form.Item>

            <Form.Item label="Type of Address" className="w-full md:w-1/2 mb-3">
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
              <div className="flex-1 mb-0">
                <Form.Item label="Emirate">
                  <Input
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="flex-1"></div>
            </div>

            <Title level={4} className="py-1">
              Enter Card Details
            </Title>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-0">
                <Form.Item label="Card Number">
                  <InputNumber<number>
                    style={{ width: "100%" }}
                    value={Number(cardNumber)}
                    onChange={(value) => setCardNumber(Number(value) || 0)}
                  />
                </Form.Item>
              </div>
              <div className="flex-1"></div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-0">
                <Form.Item label="Card Number Name">
                  <Input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="flex-1"></div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex flex-col md:flex-row space-x-4">
                <Form.Item label="Expiry Date" className="mb-0">
                  <Input.Group compact>
                    <Form.Item name="month" noStyle>
                      <InputNumber<number>
                        style={{ width: "100px", textAlign: "center" }}
                        value={Number(expiryMonth)}
                        onChange={(value) => setExpiryMonth(Number(value) || 0)}
                        placeholder="MM"
                      />
                    </Form.Item>
                    <Form.Item name="year" noStyle>
                      <InputNumber<number>
                        style={{ width: "100px", textAlign: "center" }}
                        value={Number(expiryYear)}
                        onChange={(value) => setExpiryYear(Number(value) || 0)}
                        placeholder="YYYY"
                      />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                <Form.Item label="CVV" className="mb-0">
                  <InputNumber<number>
                    style={{ width: "100px", textAlign: "center" }}
                    value={cvv}
                    onChange={(value) => setCvv(value || 0)}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-2 mt-4">
              <Checkbox>
                I agree to{" "}
                <Link href={""} className="underline font-semibold">
                  Terms & Conditions
                </Link>
              </Checkbox>
            </div>

            <Button
              type="primary"
              htmlType="button"
              onClick={handleContinue}
              className="mt-2"
            >
              PAY
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

export default CheckOutStep2;
