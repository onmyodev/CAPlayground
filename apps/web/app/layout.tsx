import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Favicon } from "@/components/favicon"
import { PostHogProvider } from "@/components/posthog-provider"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "CAPlayground - CA 壁纸编辑器",
  description: "在任何桌面电脑上为 iOS 和 iPadOS 创建精美的动态壁纸",
  verification: {
    google: "5CfgPBQMN4wnoC3Va9OnlfALRYaoLEekJkqMkGKLXOc",
  },
  openGraph: {
    title: "CAPlayground - CA 壁纸编辑器",
    description: "在任何桌面电脑上为 iOS 和 iPadOS 创建精美的动态壁纸",
    type: "website",
    images: [
      { url: "/icon-light.png", alt: "CAPlayground 图标（浅色）" },
      { url: "/icon-dark.png", alt: "CAPlayground 图标（深色）" },
    ],
  },
  icons: {
    icon: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${sourceSans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Favicon />
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
