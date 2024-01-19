import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NextAuthProvider from "@/components/providers/session-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarLayout from "@/components/navbar-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco Unity",
  description: "Created by MSS Code Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <NavbarLayout />
          <div className="mt-10 lg:ml-[21.5rem]">{children}</div>
        </NextAuthProvider>
        <ToastContainer autoClose={1500} />
      </body>
    </html>
  );
}
