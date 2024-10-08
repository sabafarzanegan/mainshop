import "./globals.css";
import Navbar from "./../components/main/navbar/Navbar";
import { ThemeProvider } from "../components/main/provider/Theme-Provider";

import localFont from "next/font/local";

const vazirFont = localFont({
  src: "../public/font/Vazirmatn-VariableFont_wght.ttf",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={vazirFont.className}>
        <ThemeProvider
          className="transition-all duration-150"
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <main className="container">
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
