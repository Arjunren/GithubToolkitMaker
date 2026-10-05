import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { SplashIntro } from "@/components/layout/splash-intro";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github-markdown-toolkit.vercel.app"),
  title: {
    default: "GitHub Markdown Toolkit",
    template: "%s | Markdown Toolkit",
  },
  description:
    "Create, preview, copy, and download GitHub-compatible Markdown and polished README files.",
  applicationName: "GitHub Markdown Toolkit",
  authors: [{ name: "Arjunren Von", url: "https://github.com/Arjunren" }],
  creator: "Arjunren Von",
  keywords: ["GitHub Markdown", "README builder", "Markdown generator"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('gmt-theme')==='dark'||(!localStorage.getItem('gmt-theme')&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        <SplashIntro />
        <Sidebar />
        <main className="app-main">{children}</main>
      </body>
    </html>
  );
}
