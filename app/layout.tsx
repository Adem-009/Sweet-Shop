import type { Metadata } from "next";
import "./globals.css";

import { Red_Hat_Text } from 'next/font/google';



export const metadata: Metadata = {
  title: "Sweet Shop | E-Commerce Product List",
  description: "A professional e-commerce product list and shopping cart web application built with Next.js, TypeScript, and Tailwind CSS.",
};
  const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-red-hat',
});
export default function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html
      lang="en"
      className={` h-full antialiased ${redHatText.variable}`}
    >
      <body className="min-h-full flex flex-col ">{children}</body>
    </html>
  );
}
