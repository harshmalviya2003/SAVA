import { Roboto_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Header from "@/components/Home/Nevbar";


const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  variable: '--font-roboto-mono'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoMono.className} bg-white dark:bg-[#000000]`}>
        <Providers>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  );
}