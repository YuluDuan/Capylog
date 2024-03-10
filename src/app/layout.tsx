import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Capylog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} w-screen h-screen`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
