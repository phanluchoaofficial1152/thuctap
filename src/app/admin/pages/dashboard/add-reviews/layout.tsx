"use client";

import { NextPage } from "next";
import React, { ReactNode } from "react";

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
