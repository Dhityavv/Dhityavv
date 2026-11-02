import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhitya - Animation Student Portfolio",
  description:
    "Portfolio and creative work by Dhitya Nurhadi, an animation student exploring 3D art, web design, and Minecraft modding.",
  openGraph: {
    title: "Dhitya - Animation Student Portfolio",
    description:
      "Portfolio and creative work by Dhitya Nurhadi, an animation student exploring 3D art, web design, and Minecraft modding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0d1117] text-[#c9d1d9] antialiased selection:bg-[#8A6FB5]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
