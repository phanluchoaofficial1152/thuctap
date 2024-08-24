"use client";

import "./ambassadors.css";
import { NextPage } from "next";
import { Form, Input, Radio, Checkbox, Button, Upload } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { useState } from "react";

const Ambassadors: NextPage = () => {
  const uploadProps = {
    beforeUpload: () => false,
  };

  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9+]*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="px-4 py-4 max-w">
      <title>Ambassadors | IVY moda | Thực tập NextJS</title>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome NAME SURNAME
        </h2>

        <p className="text-center mb-4">
          Please fill in the complete details in the form below
        </p>

        <div className="flex flex-col items-center mb-4 cursor-pointer">
          <Upload {...uploadProps}>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-48">
              <p className="text-gray-500">Profile Picture</p>
              <p className="text-gray-400">Upload Image</p>
            </div>
          </Upload>
        </div>

        <Title level={4} className="py-2">
          Personal Details
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Họ"
              name="lastName"
              rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
            >
              <Input placeholder="Nhập họ" />
            </Form.Item>

            <Form.Item
              label="Tên"
              name="firstName"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>

            <Form.Item
              label="Tên hiển thị"
              name="displayName"
              rules={[
                { required: true, message: "Vui lòng nhập tên hiển thị!" },
              ]}
            >
              <Input placeholder="Nhập tên hiển thị" />
            </Form.Item>

            <Form.Item label="Giới tính" name="gender">
              <Radio.Group>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Địa chỉ email"
              name="email"
              rules={[
                { type: "email", message: "Địa chỉ email không hợp lệ!" },
                { required: true, message: "Vui lòng nhập địa chỉ email!" },
              ]}
            >
              <Input type="email" placeholder="Nhập địa chỉ email" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>

            <Form.Item label="Instagram" name="instagram">
              <Input />
            </Form.Item>

            <Form.Item label="Youtube" name="youtube">
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                iconRender={(visible) =>
                  visible ? <LockOutlined /> : <UserOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                iconRender={(visible) =>
                  visible ? <LockOutlined /> : <UserOutlined />
                }
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Checkbox>
              Tôi đồng ý với{" "}
              <Link href="" className="underline font-semibold">
                các điều khoản và điều kiện
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Ambassadors;
