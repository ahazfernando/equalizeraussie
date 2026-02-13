"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../index.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const isAuthRoute = pathname === "/signup" || pathname === "/reset";

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Equalizer RV - Australian Caravans</title>
        <meta name="description" content="Premium Australian caravans built for adventure" />
        <link rel="icon" href="/logo/Equalizerblack.png" />
        <link rel="shortcut icon" href="/logo/Equalizerblack.png" />
        <link rel="apple-touch-icon" href="/logo/Equalizerblack.png" />
        <meta property="og:title" content="Equalizer RV - Australian Caravans" />
        <meta property="og:description" content="Premium Australian caravans built for adventure" />
        <meta property="og:image" content="/logo/Equalizerblack.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Equalizer RV - Australian Caravans" />
        <meta name="twitter:description" content="Premium Australian caravans built for adventure" />
        <meta name="twitter:image" content="/logo/Equalizerblack.png" />
      </Head>
      <body>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            {!isAdminRoute && !isAuthRoute && <Navbar />}
            <main className="flex-1">{children}</main>
            {!isAdminRoute && !isAuthRoute && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  );
}
