"use client";

import { FC, useState } from "react";
import { Modal, Input, Button, message } from "antd";
import {
  UserOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/auth/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/firebase/firebaseConfig";
import axios from "axios";

const LoginModal: FC = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const url: string = "https://api-pro.teklearner.com";

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    await login(values.username, values.password);
    if (isAuthenticated) {
      handleCancel();
      router.push("/");
    }
  };

  const checkEmailGoogle = async (email: string) => {
    try {
      const response = await axios.post(`${url}/auth/v1/check-email`, {
        email,
      });
      if (response.data.data === true) {
        return true;
      } else {
        message.error("Email không tồn tại trong hệ thống.");
        return false;
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi trong quá trình kiểm tra.");
      console.log("Lỗi: ", error);
      return false;
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email: any = user.email;

      if (email.length > 0) {
        const valid = await checkEmailGoogle(email);

        if (valid) {
          const fullAccessToken = await user.getIdToken();
          const accessToken = fullAccessToken.slice(0, 20);
          const password = accessToken;

          await login(email, password);
          handleCancel();
        } else {
          message.error("Email không tồn tại trong hệ thống.");
        }
      } else {
        message.error(
          "Không tìm thấy email, vui lòng thực hiện đăng nhập lại."
        );
      }
    } catch (error: any) {
      message.error(`${error.message}`);
      console.log("Đã xảy ra lỗi khi đăng nhập với Google: ", error.message);
    }
  };

  const handleRedirect = (url: string) => {
    handleCancel();
    router.push(url);
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Email không hợp lệ.")
      .required("Trường này là bắt buộc."),
    password: Yup.string().required("Trường này là bắt buộc."),
  });

  return (
    <>
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={showModal}
      >
        <UserOutlined className="text-xl" />
        <span className="ml-2">User</span>
      </div>
      <Modal
        title="Sign In"
        open={visible}
        onCancel={handleCancel}
        footer={null}
        width={400}
        className="rounded-lg"
      >
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  as={Input}
                  name="username"
                  size="large"
                  placeholder="Enter Email"
                  type="email"
                  prefix={<UserOutlined />}
                  className="rounded-md"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  as={Input.Password}
                  name="password"
                  size="large"
                  placeholder="Enter Password"
                  className="rounded-md"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <Button
                type="primary"
                block
                className="rounded-md"
                htmlType="submit"
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <div className="flex justify-between items-center">
                <Button
                  type="link"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleRedirect("/pages/taikhoan/quenmatkhau")}
                >
                  Forgot Password?
                </Button>
                <Button
                  type="link"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleRedirect("/pages/taikhoan/dangky")}
                >
                  Register Now
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Button
                  type="default"
                  icon={<GoogleOutlined />}
                  className="rounded-md mt-3"
                  onClick={handleLoginGoogle}
                >
                  Login with Google+
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default LoginModal;
