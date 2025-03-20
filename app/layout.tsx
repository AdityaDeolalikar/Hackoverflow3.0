import type { Metadata } from "next";
import { Rowdies } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const rowdies = Rowdies({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hackoverflow 3.0",
  description: "Generated AdityaDeo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rowdies.className} antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}
