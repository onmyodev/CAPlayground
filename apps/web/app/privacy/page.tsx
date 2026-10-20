"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { ArrowLeft, Sun, Moon } from "lucide-react"

export default function PrivacyPage() {
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    document.title = "CAPlayground - 隐私政策";
  }, []);

  return (
    <main className="relative min-h-screen px-4 py-10 sm:py-16 bg-gradient-to-b from-muted/40 to-transparent">
      {/* back */}
      <div className="absolute left-4 top-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> 返回
          </Button>
        </Link>
      </div>

      {/* theme */}
      <div className="absolute right-4 top-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="切换主题"
          className="rounded-full h-9 w-9 p-0"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">隐私政策</h1>
          <p className="mt-2 text-sm text-muted-foreground">最后更新：2025 年 10 月 20 日</p>
        </div>

        {/* Paper container */}
        <div className="rounded-2xl bg-card text-card-foreground shadow-lg ring-1 ring-black/5 border border-border p-6 sm:p-10 text-base sm:text-lg">
          <p className="mt-0 leading-7">
            本隐私政策说明 CAPlayground（「我们」）如何收集、使用和保护你的信息。本政策适用于你对 CAPlayground
            网站与应用程序（「服务」）的使用。
          </p>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">1. 我们收集的信息</h2>
          <ul className="mt-6 list-disc pl-6 space-y-3">
            <li>
              <strong>本地项目不会被收集</strong>：默认情况下，你的项目存储在你设备的本地（使用浏览器的 IndexedDB 或 OPFS）。除非你主动上传或分享，否则我们不会收到你的本地项目。
            </li>
            <li>
              <strong>设备与使用情况</strong>：维持服务运行所需的基础技术信息，例如设备/浏览器类型以及交互行为。除本政策所述情况外，我们不会运行第三方分析。
            </li>
            <li>
              <strong>Cookie 与本地存储</strong>：我们使用必要的 localStorage 来保存偏好设置和产品功能。我们不会将 Cookie 用于身份验证或广告。
            </li>
          </ul>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">2. 我们如何使用信息</h2>
          <ul className="mt-6 list-disc pl-6 space-y-3">
            <li>提供并改进服务及其功能。</li>
            <li>防止滥用并确保服务的可靠性。</li>
            <li>传达与服务相关的重要更新。</li>
          </ul>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">3. 分析</h2>
          <p className="mt-6 leading-7">
            我们使用注重隐私的分析工具来了解使用情况并改进 CAPlayground，其中包括：
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-3">
            <li>
              <strong>页面浏览</strong>：页面 URL、标题、来源、时间戳以及会话 ID。
            </li>
            <li>
              <strong>会话</strong>：会话时长、开始/结束时间、访问页面数量，以及基础的跳出检测。
            </li>
            <li>
              <strong>性能</strong>：页面加载时间、DOM 内容加载完成时间、首次绘制/首次内容绘制，以及资源计时指标。
            </li>
            <li>
              <strong>聚合计数器</strong>：我们还会针对某些产品事件（创建的项目数）保留仅聚合的计数。这些计数器在不含用户标识的情况下存储，用于产品规划。你的项目内容不会被收集。
            </li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            我们不会将分析数据用于广告，也不会故意为分析目的收集敏感标识（例如精确位置或设备指纹数据）。
          </p>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">4. 第三方</h2>
          <p className="mt-6 leading-7">
            我们使用 Supabase 作为后端基础设施，用于存储壁纸下载的聚合计数。我们还使用 PostHog 提供上述注重隐私的分析。PostHog 的数据通过我们自己的域名代理以提升可靠性。更多细节请参阅这些服务提供商的文档/政策。
          </p>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">5. 数据保留</h2>
          <ul className="mt-6 list-disc pl-6 space-y-3">
            <li>本地项目会保留在你的设备上，直到你将其删除。</li>
            <li>聚合计数器不包含账户标识，并可能为产品规划而保留。</li>
          </ul>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">6. 你的权利</h2>
          <p className="mt-6 leading-7">
            根据你所在的地区，你可能有权访问、更正或删除你的数据。如需行使这些权利，请联系我们。
          </p>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">7. 儿童隐私</h2>
          <p className="mt-6 leading-7">
            本服务不面向 13 岁以下的儿童，也不面向低于其所在国家数字同意最低年龄的儿童。如果你认为有儿童向我们提供了个人数据，请联系我们，我们将采取适当措施。
          </p>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">8. 跨境传输</h2>
          <p className="mt-6 leading-7">
            数据可能会在我们的服务提供商运营的地区被处理。我们会采取措施，确保符合适用法律的适当保障。
          </p>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">9. 本政策的变更</h2>
          <p className="mt-6 leading-7">
            我们可能会不时更新本隐私政策。我们会更新上方的「最后更新」日期，并在适当情况下提供额外通知。
          </p>

          <h2 className="mt-12 text-3xl md:text-4xl font-semibold">10. 联系我们</h2>
          <p className="mt-6 leading-7">
            有疑问？请通过 <a className="underline" href="mailto:support@enkei64.xyz">support@enkei64.xyz</a> 联系我们。
          </p>
        </div>
      </div>
    </main>
  )
}
