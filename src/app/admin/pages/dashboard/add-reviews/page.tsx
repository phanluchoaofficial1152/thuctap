"use client";

import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BreadCumbs from "../../components/Breadcumbs/BreadCumbs";
import {
  Typography,
  Select,
  Upload,
  Input,
  Checkbox,
  Row,
  Col,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "./addreviews.css";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AddReviews: NextPage<{}> = () => {
  const [dashboardName, setDashboardName] = useState<string>("");

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");

    setDashboardName(pathArray[pathArray.length - 1]);
  }, []);

  return (
    <div className="px-4 py-4">
      <BreadCumbs name={dashboardName} />

      <Title level={2} className="px-4 uppercase">
        Add Review
      </Title>

      {/* add reviews form */}
      <div className="bg-white p-6 rounded shadow-md">
        <Row gutter={16}>
          <Col span={12}>
            <label className="block mb-2">Select Brand</label>
            <Select className="w-full" defaultValue="Personal">
              <Option value="personal">Personal</Option>
              <Option value="brand2">Brand 2</Option>
            </Select>
          </Col>
          
          <Col span={12}>
            <label className="block mb-2">Select Product</label>
            <Select className="w-full" defaultValue="Personal">
              <Option value="personal">Personal</Option>
              <Option value="product2">Product 2</Option>
            </Select>
          </Col>
        </Row>

        <div className="my-4 text-lg">
          You have selected <strong>Product Name</strong>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Upload Image</label>
          <Upload>
            <Button icon={<UploadOutlined />}>Choose an image</Button>
          </Upload>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Video URL</label>
          <Input placeholder="Enter video URL" />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Summary</label>
          <TextArea rows={4} placeholder="Write your summary here" />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Select Options</label>
          <div className="checkbox-container">
            {Array.from({ length: 15 }).map((_, index) => (
              <div className="checkbox-item" key={index}>
                <Checkbox>Lorem Ipsum</Checkbox>
              </div>
            ))}
          </div>
        </div>

        <Button type="primary" className="w-full mt-4">
          Submit Review
        </Button>
      </div>
      {/* end add reviews form */}
    </div>
  );
};

export default AddReviews;
