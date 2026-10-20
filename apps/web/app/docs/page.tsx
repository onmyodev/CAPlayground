import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CAPlayground - 文档",
}

export default function DocsPage() {
  redirect("https://docs.enkei64.xyz")
}
