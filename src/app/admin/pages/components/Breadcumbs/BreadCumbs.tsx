import { Breadcrumb } from "antd";
import Link from "next/link";
import React, { FC } from "react";

interface BreadcumbsProps {
  name: string;
}

const BreadCumbs: FC<BreadcumbsProps> = ({ name }) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizedName = capitalizeFirstLetter(name);

  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
    },
    {
      title: <Link href={`/${name}`}>{capitalizedName}</Link>,
    },
  ];

  return (
    <div className="px-5 py-4">
      <Breadcrumb
        className="text-sm md:text-base"
        separator=">"
        items={breadcrumbItems}
      />
    </div>
  );
};

export default BreadCumbs;
