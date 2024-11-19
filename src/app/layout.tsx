import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ask AI",
  description:
    "Ask AI helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and Ask AI can help with writing, learning, brainstorming and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
