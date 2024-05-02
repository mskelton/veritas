import "./globals.css"
import { clsx } from "clsx"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  description: "Assert facts against your data sources",
  title: "Veritas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark h-full" lang="en">
      <body className={clsx(inter.className, "h-full bg-background")}>
        {children}
      </body>
    </html>
  )
}
