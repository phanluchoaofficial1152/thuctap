"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategorySlugLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

      <div className="px-5 py-5">{children}</div>
    </>
  );
}
