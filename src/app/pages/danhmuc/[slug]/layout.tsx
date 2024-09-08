"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const CategorySlugLayout: NextPage<{ children: ReactNode }> = ({
  children,
}) => {
  const { slug } = useParams();
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const formatTitle = Array.isArray(slug)
        ? slug.join(" ").replace("-", " ")
        : slug.replace("-", " ");

      setTitle(formatTitle);
    }
  }, [slug]);

  return (
    <>
      {title && (
        <title>{`Sản phẩm ${title.toUpperCase()} | IVY moda | Thực tập NextJS`}</title>
      )}

      <div className="px-5 md:px-[6rem] py-5">{children}</div>
    </>
  );
};

export default CategorySlugLayout;
