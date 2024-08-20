import { Breadcrumb } from "antd";
import Link from "next/link";
import { FC } from "react";

const RegisterPage: FC = () => {
  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
    },
    {
      title: <Link href="/taikhoan/dangky">Đăng ký</Link>,
    },
  ];

  return (
    <div className="px-4 py-4">
      {" "}
      <Breadcrumb
        className="text-sm md:text-base"
        separator=">"
        items={breadcrumbItems}
      />
    </div>
  );
};

export default RegisterPage;
