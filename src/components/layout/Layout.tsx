import { Footer } from "./Footer";
import Newsletter from "./Newsletter";
import ResponsiveNav from "./Navbar/ResponsiveNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveNav />
      <main className="flex-1 pt-24">{children}</main>
      <Newsletter />
      <Footer />
    </div>
  );
}
