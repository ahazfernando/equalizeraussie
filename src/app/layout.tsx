import type { Metadata } from "next";
import { Providers } from "./providers";
import "../index.css";

export const metadata: Metadata = {
  title: "Equalizer RV - Australian Caravans",
  description: "Premium Australian caravans built for adventure",
  icons: {
    icon: "/logo/Equalizerblack.png",
    shortcut: "/logo/Equalizerblack.png",
    apple: "/logo/Equalizerblack.png",
  },
  openGraph: {
    title: "Equalizer RV - Australian Caravans",
    description: "Premium Australian caravans built for adventure",
    images: [
      {
        url: "/logo/Equalizerblack.png",
        width: 1200,
        height: 630,
        alt: "Equalizer RV Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Equalizer RV - Australian Caravans",
    description: "Premium Australian caravans built for adventure",
    images: ["/logo/Equalizerblack.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

