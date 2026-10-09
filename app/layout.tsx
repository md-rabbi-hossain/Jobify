import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./Component/Home/Nav";
import ClientProvider from "./Component/Hoc/ClientProvider";
import { AppWrapper } from "./Component/Context/Provider";
import Footer from "./Component/Footer/Footer";

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jobify | Find your next job",
    template: "%s | Jobify",
  },
  description:
    "Search open jobs by title, company or city, or browse by the field you work in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        {/* Providers must live INSIDE <body>, never wrapping <html>. */}
        <ClientProvider>
          <AppWrapper>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </AppWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
