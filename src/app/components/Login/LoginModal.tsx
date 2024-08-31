// components/LoginModal.tsx
"use client";

import { FC, useState } from "react";
import { Modal, Input, Button } from "antd";
import {
  UserOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/auth/authSlice";

const LoginModal: FC = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleLogin = async () => {
    await login(username, password);
    if (isAuthenticated) {
      handleCancel();
      router.push("/");
    }
  };

  const handleRedirect = (url: string) => {
    handleCancel();
    router.push(url);
  };

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
        <div className="space-y-4">
          <Input
            size="large"
            placeholder="Enter Email"
            type="email"
            prefix={<UserOutlined />}
            className="rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.Password
            size="large"
            placeholder="Enter Password"
            className="rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            block
            className="rounded-md"
            onClick={handleLogin}
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
              icon={<FacebookOutlined />}
              className="rounded-md"
            >
              Login with Facebook
            </Button>
            <Button
              type="default"
              icon={<GoogleOutlined />}
              className="rounded-md mt-3"
            >
              Login with Google+
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
