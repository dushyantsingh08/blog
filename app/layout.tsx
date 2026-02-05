import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="min-h-screen w-full bg-black relative">
          {/* Dark White Dotted Grid Background */}
          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: "#000000",
              backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
      `,
              backgroundSize: "30px 30px",
              backgroundPosition: "0 0",
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
