"use client";

import { useState } from "react";
import { Breadcrumb, Button, Input, message, Modal, Upload } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";
import Image from "next/image";
import {
  FacebookOutlined,
  GoogleOutlined,
  InstagramOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { fetchSignInMethodsForEmail, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/firebase/firebaseConfig";

const RegisterPage: NextPage<{}> = () => {
  const [image, setImage] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [registrationData, setRegistrationData] = useState<any>(null);
  const router = useRouter();

  const url: string = "https://api-pro.teklearner.com";

  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
    },
    {
      title: <Link href="/taikhoan/dangky">Đăng ký</Link>,
    },
  ];

  const uploadProps = {
    beforeUpload: (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      return false;
    },
    accept: "image/*",
    showUploadList: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên là bắt buộc."),
    email: Yup.string()
      .email("Email không hợp lệ.")
      .required("Email là bắt buộc."),
    phone: Yup.string().required("Số điện thoại là bắt buộc."),
    password: Yup.string().required("Mật khẩu là bắt buộc."),
    otp: Yup.string().test(
      "otp-required",
      "Mã OTP là bắt buộc.",
      function (value) {
        const { otpSent } = this.parent;
        return otpSent ? !!value : true;
      }
    ),
  });

  const checkEmailFirebase = async (email: string): Promise<boolean> => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        message.error("Email đã tồn tại trong Firebase.");
        return false;
      }
      return true;
    } catch (error) {
      message.error("Lỗi trong quá trình kiểm tra email.");
      console.error(error);
      return false;
    }
  };

  const checkEmailGoogle = async (email: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${url}/auth/v1/check-email`, {
        email,
      });

      if (response.data.data === true) {
        message.error("Email đã tồn tại trong hệ thống.");
        return false;
      }

      const firebaseCheck = await checkEmailFirebase(email);
      return firebaseCheck;
    } catch (error) {
      message.error("Đã xảy ra lỗi trong quá trình kiểm tra.");
      console.log("Lỗi: ", error);
      return false;
    }
  };

  const checkEmailAndPhone = async (
    email: string,
    phone: string
  ): Promise<boolean> => {
    try {
      const emailCheck = await axios.post(`${url}/auth/v1/check-email`, {
        email,
      });
      if (emailCheck.data.data === true) {
        message.error("Email đã tồn tại trong hệ thống.");
        return false;
      }

      const phoneCheck = await axios.post(`${url}/auth/v1/check-phone`, {
        phone,
      });
      if (phoneCheck.data.data === true) {
        message.error("Số điện thoại đã tồn tại trong hệ thống.");
        return false;
      }

      return true;
    } catch (error) {
      message.error("Đã xảy ra lỗi trong quá trình kiểm tra.");
      console.log("Lỗi: ", error);
      return false;
    }
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
    password: string;
    otp: string;
  }) => {
    const { email, phone, otp } = values;

    if (!otpSent) {
      const valid = await checkEmailAndPhone(email, phone);
      if (valid) {
        try {
          await axios.post(`${url}/auth/v1/send-otp-email`, { email });
          setOtpSent(true);
          message.success("Mã OTP đã được gửi đến email.");
        } catch (error) {
          message.error("Không thể gửi OTP.");
          console.log("Lỗi: ", error);
        }
      }
    } else {
      try {
        await axios.post(`${url}/auth/v1/register`, values);
        message.success("Đăng ký thành công!");
        router.replace("/");
      } catch (error) {
        message.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
        console.log("Lỗi: ", error);
      }
    }
  };

  const handleResendOTP = async (email: string) => {
    if (resendTimeout > 0) {
      message.error("Vui lòng chờ trước khi gửi lại OTP.");
      return;
    }
    try {
      await axios.post(`${url}/auth/v1/send-otp-email`, { email });
      message.success("Mã OTP đã được gửi đến email.");
      setResendTimeout(60);

      const interval = setInterval(() => {
        setResendTimeout((prev) => {
          if (prev === 1) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      message.error("Không thể gửi OTP.");
      console.log("Lỗi: ", error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;
      const phone =
        user.phoneNumber ||
        `09${Math.floor(10000000 + Math.random() * 90000000)}`;

      if (email) {
        const valid = await checkEmailGoogle(email);

        if (valid) {
          const fullAccessToken = await user.getIdToken();
          const accessToken = fullAccessToken.slice(0, 20);

          const otpResponse = await axios.post(
            `${url}/auth/v1/send-otp-email`,
            { email }
          );

          if (otpResponse.status === 200) {
            message.success("Mã OTP đã được gửi đến email.");
            setIsModalOpen(true);

            if (otpResponse.status === 200) {
              message.success("Mã OTP đã được gửi đến email.");
              setIsModalOpen(true);

              const registrationData = {
                name: user.displayName || "Phan Lục Hòa",
                email,
                phone,
                password: accessToken,
                otp: "",
              };

              setRegistrationData(registrationData);
            }
          }
        }
      }
    } catch (error) {
      message.error("Đăng nhập bằng Google thất bại.");
      console.log("Lỗi: ", error);
    }
  };

  const submitRegisterGoogle = async (data: any, otp: string) => {
    const dataSubmit: any = {
      ...data,
      otp,
    };

    const handleSubmit = async () => {
      try {
        await axios.post(`${url}/auth/v1/register`, dataSubmit);
        message.success("Đăng ký thành công!");
        setIsModalOpen(false);
        router.replace("/");
      } catch (error) {
        message.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
        console.log("Lỗi: ", error);
      }
    };

    const handleOk = () => {
      handleSubmit();
    };

    return { handleOk };
  };

  return (
    <>
      <title>Đăng ký - IVY moda - Thực tập NextJS</title>

      <div className="px-3 py-4 pb-10">
        <Breadcrumb
          className="text-sm md:text-base p-1"
          separator=">"
          items={breadcrumbItems}
        />

        <Title level={2} className="py-3">
          REGISTRATION
        </Title>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            otp: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="h-full flex flex-col bg-white shadow-md rounded-lg p-6 mt-3">
              <div className="gap-3 flex flex-col sm:flex-row sm:gap-3 justify-center items-center mb-4">
                <Button icon={<FacebookOutlined />}>
                  Register with Facebook
                </Button>
                <Button icon={<GoogleOutlined />} onClick={handleGoogleRegister}>
                  Register with Google
                </Button>
                <Modal
                  title="Nhập mã OTP"
                  open={isModalOpen}
                  onOk={async () => {
                    if (registrationData) {
                      const response = await submitRegisterGoogle(
                        registrationData,
                        otp
                      );
                      response.handleOk();
                    } else {
                      message.error(
                        "Đăng ký không thành công. Vui lòng thử lại."
                      );
                    }
                  }}
                  onCancel={() => setIsModalOpen(false)}
                >
                  <Input
                    placeholder="Nhập mã OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Modal>
                <Button icon={<InstagramOutlined />}>
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
                  {image ? (
                    <div className="relativeregister w-full h-full mt-5">
                      <Image
                        src={image}
                        alt="Profile"
                        width={1000}
                        height={1000}
                        objectFit="cover"
                        className="rounded-md"
                      />
                      <button
                        className="absoluteregister text-[15px] top-0 right-0 p-1 transition-all hover:bg-black rounded-sm bg-slate-200"
                        onClick={() => setImage(null)}
                        aria-label="Delete image"
                      >
                        <DeleteOutlined className="text-red-500 hover:text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="cursor-pointer">
                      <div
                        className="flex justify-center items-center mb-1"
                        style={{ fontSize: "34px" }}
                      >
                        +
                      </div>
                      <div>Upload Image</div>
                    </div>
                  )}
                </Upload>
              </div>

              <Title level={4} className="mb-4 font-semibold">
                Personal Details
              </Title>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="mb-2">
                  <Field name="name">
                    {({ field }: { field: any }) => (
                      <Input {...field} placeholder="Họ và Tên *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <Field name="email">
                    {({ field }: { field: any }) => (
                      <Input {...field} placeholder="Email *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <Field name="phone">
                    {({ field }: { field: any }) => (
                      <Input {...field} placeholder="Số điện thoại *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-2">
                  <Field name="password">
                    {({ field }: { field: any }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Mật khẩu *"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="mb-4">
                  <Field name="otp">
                    {({ field }: { field: any }) => (
                      <Input {...field} placeholder="Nhập mã OTP *" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-red-500"
                  />
                  <p className="text-red-500 font-semibold mt-3">
                    VUI LÒNG CHECK MAIL ĐỂ XÁC THỰC TÀI KHOẢN!!!
                  </p>
                </div>
              )}

              {otpSent && (
                <Button
                  onClick={() => handleResendOTP(values.email)}
                  disabled={resendTimeout > 0}
                >
                  Gửi lại OTP
                  {resendTimeout > 0 && ` (${resendTimeout}s)`}
                </Button>
              )}

              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-3 py-2"
              >
                {otpSent ? "Đăng ký" : "Gửi OTP"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterPage;
