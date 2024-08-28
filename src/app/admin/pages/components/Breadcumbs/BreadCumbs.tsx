import { Breadcrumb } from "antd";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";

interface BreadcumbsProps {
  name: string;
}

const BreadCumbs: FC<BreadcumbsProps> = ({ name }) => {
  const [isDashboardPage, setIsDashboardPage] = useState<boolean>(false);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizedName = capitalizeFirstLetter(name);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathArray = window.location.pathname.split("/");
      setIsDashboardPage(pathArray.join("/") === "/admin/pages/dashboard");
    }
  }, []);

  const breadcrumbItems = [
    {
      title: <Link href="/admin/pages/dashboard">Home</Link>,
    },
    {
      title: <Link href="/admin/pages/dashboard">Dashboard</Link>,
    },
    ...(isDashboardPage
      ? []
      : [
          {
            title: (
              <Link href={`/admin/pages/dashboard/${name}`}>
                {capitalizedName}
              </Link>
            ),
          },
        ]),
  ];

  return (
    <div className="px-5 py-4">
      <Breadcrumb
        className="text-sm md:text-base"
        separator={<RightOutlined style={{ fontSize: "10px" }} />}
        items={breadcrumbItems}
      />
    </div>
  );
};

export default BreadCumbs;
