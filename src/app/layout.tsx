import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import Script component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InterpretAI",
  description: "Makes Language Easy For Everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Correctly include external script */}
      <Script src="/node_modules/preline/dist/preline.js" strategy="afterInteractive" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
