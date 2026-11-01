import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhitya - 3D Artist & Animation Portfolio",
  description:
    "Portfolio and showcase for Dhitya, an animation student and 3D artist specializing in Blender medium-poly worlds, environments, and game art.",
  openGraph: {
    title: "Dhitya - 3D Artist & Animation Portfolio",
    description:
      "Portfolio and showcase for Dhitya, an animation student and 3D artist specializing in Blender medium-poly worlds, environments, and game art.",
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
