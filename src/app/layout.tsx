import type { Metadata } from "next";
import { Providers } from "./providers";
import "../index.css";

export const metadata: Metadata = {
  title: "Equalizer RV - Australian Caravans",
  description: "Premium Australian caravans built for adventure",
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

