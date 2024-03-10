import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capy Log",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-screen h-screen">{children}</div>;
}
