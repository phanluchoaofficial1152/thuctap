"use client";

import { Breadcrumb, Button, Input, Upload } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterPage: FC = () => {
  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
    },
    {
      title: <Link href="/taikhoan/dangky">Đăng ký</Link>,
    },
  ];

  const uploadProps = {
    beforeUpload: () => false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Họ là bắt buộc."),
    lastName: Yup.string().required("Tên là bắt buộc."),
    email: Yup.string()
      .email("Email không hợp lệ.")
      .required("Email là bắt buộc."),
    mobile: Yup.string().required("Số điện thoại là bắt buộc."),
    street: Yup.string().required("Đường là bắt buộc."),
    area: Yup.string().required("Vùng là bắt buộc."),
    emirate: Yup.string().required("Trường này là bắt buộc."),
  });

  return (
    <>
      <title>Đăng ký - IVY moda - Thực tập NextJS</title>

      <div className="px-3 py-4 pb-10">
        {/* điều hướng */}
        <Breadcrumb
          className="text-sm md:text-base p-1"
          separator=">"
          items={breadcrumbItems}
        />
        {/* end điều hướng */}

        {/* title */}
        <Title level={2} className="py-3">
          REGISTRATION
        </Title>
        {/* end title */}

        {/* Register form */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            street: "",
            area: "",
            emirate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="h-full flex flex-col bg-white shadow-md rounded-lg p-6 mt-3">
              <div className="gap-3 flex flex-col sm:flex-row sm:gap-3 justify-center items-center mb-4">
                <Button icon={<i className="fab fa-facebook-f"></i>}>
                  Register with Facebook
                </Button>
                <Button icon={<i className="fab fa-google"></i>}>
                  Register with Google
                </Button>
                <Button icon={<i className="fab fa-instagram"></i>}>
                  Register with Instagram
                </Button>
              </div>

              <div className="text-center mb-4">OR</div>

              <div className="flex flex-col items-center mb-4">
                <div className="text-center mb-3 font-semibold">
                  Profile Picture
                </div>

                <Upload
                  {...uploadProps}
                  className="border-dashed border-2 border-gray-300 rounded-md w-32 h-32 flex items-center justify-center mb-4"
                >
                  <div className="flex justify-center items-center text-4xl mb-4">
                    +
                  </div>
                  <div>Upload Image</div>
                </Upload>
              </div>

              <Title level={4} className="mb-4 font-semibold">
                Personal Details
              </Title>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="mb-2">
                  <Field name="firstName">
                    {({ field }: any) => (
                      <Input {...field} placeholder="First Name *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <Field name="lastName">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Last Name *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <Field name="email">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Email Address *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <Field name="mobile">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Mobile Number *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <Title level={4} className="mb-4 font-semibold">
                Address
              </Title>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="mb-2">
                  <Field name="street">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Street *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="street"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <Field name="area">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Area *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="area"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <Field name="emirate">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Emirate *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="emirate"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <Button type="primary" className="w-full" htmlType="submit">
                Register
              </Button>
            </Form>
          )}
        </Formik>
        {/* end register form */}
      </div>
    </>
  );
};

export default RegisterPage;
