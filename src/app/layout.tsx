import type { Metadata } from "next";

import Root from "@/layouts/Root";
import React from "react";

import "@/css/global.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Wolfyxon",
    default: "Wolfyxon"
  },

  description: "My little nerdy space on the internet",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {  
  if(React.isValidElement(children) && children.type == Root) {
    return children;
  }

  return (
    <Root>
      <head></head>
      <body>{children}</body>
    </Root>
  );
}
