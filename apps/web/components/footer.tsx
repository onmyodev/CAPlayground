import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/wordmark"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-8 md:px-16 py-12 space-y-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">准备好开始了吗？</h2>
          <p className="text-muted-foreground mt-3">几分钟内即可制作你的第一张动态壁纸，无需登录。</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/projects">
              <Button className="px-6 bg-accent hover:bg-accent/90 text-white font-semibold">
                <span className="inline-flex items-center gap-2">开始使用</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* light icon */}
              <Image
                src="/icon-light.png"
                alt="CAPlayground 图标"
                width={32}
                height={32}
                className="rounded-lg block dark:hidden"
                priority
              />
              {/* dark icon */}
              <Image
                src="/icon-dark.png"
                alt="CAPlayground 图标"
                width={32}
                height={32}
                className="rounded-lg hidden dark:block"
              />
              <span className="font-helvetica-neue text-xl font-bold">CAPlayground</span>
            </div>
            <p className="text-muted-foreground text-sm">
              在任何桌面电脑上为 iOS 和 iPadOS 创建精美的动态壁纸。
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">资源</h3>
            <div className="space-y-2">
              <Link href="/docs" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                文档
              </Link>
              <Link href="/roadmap" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                路线图
              </Link>
              <Link
                href="/tendies-check"
                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Tendies 检查器
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">© 2025 CAPlayground. 保留所有权利。</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                隐私政策
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <Wordmark />
          </div>
        </div>
      </div>
    </footer>
  )
}
