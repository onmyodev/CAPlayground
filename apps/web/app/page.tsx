import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from "next/link"
import { Send, Filter as NotificationIcon, Download } from "lucide-react"
import Image from "next/image"
import { BentoGridSection } from "@/components/home/bento-grid-section"



export const runtime = 'nodejs'

interface WallpaperItem {
  id: string | number
  name: string
  creator: string
  description: string
  file: string
  preview: string
  from: string
}

interface WallpapersResponse {
  base_url: string
  wallpapers: WallpaperItem[]
}

function isVideo(src: string) {
  const lower = src.toLowerCase()
  return lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.includes("/video/")
}

export default async function HomePage() {
  let mostDownloaded: { wallpaper: WallpaperItem; baseUrl: string; downloads: number } | null = null
  try {
    try {
      const wallpapersRes = await fetch(
        "https://raw.githubusercontent.com/CAPlayground/wallpapers/refs/heads/main/wallpapers.json",
        {
          next: { revalidate: 1800 },
          headers: { Accept: "application/json" },
        }
      )

      if (wallpapersRes.ok) {
        const data = (await wallpapersRes.json()) as WallpapersResponse

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (supabaseUrl && supabaseAnonKey && Array.isArray(data.wallpapers)) {
          const statsRes = await fetch(
            `${supabaseUrl}/rest/v1/wallpaper_stats?select=id,downloads&order=downloads.desc&limit=1`,
            {
              headers: {
                apikey: supabaseAnonKey,
                Authorization: `Bearer ${supabaseAnonKey}`,
              },
              cache: "no-store",
            }
          )

          if (statsRes.ok) {
            const stats = (await statsRes.json()) as Array<{ id: string; downloads: number }>
            if (Array.isArray(stats) && stats.length > 0) {
              const top = stats[0]
              const wallpaper = data.wallpapers.find((w) => String(w.id) === String(top.id))
              if (wallpaper) {
                mostDownloaded = {
                  wallpaper,
                  baseUrl: data.base_url,
                  downloads: top.downloads || 0,
                }
              }
            }
          }
        }
      }
    } catch (e) {
    }
  } catch (e) {
  }
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{ top: "1rem" }}
      >
        <Navigation />
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Background Images - Centered */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10 pointer-events-none select-none opacity-50 md:opacity-100 -translate-y-48 md:-translate-y-32 lg:-translate-y-16 xl:-translate-y-4">
            <div className="relative w-full max-w-6xl aspect-[16/10]">
              <Image
                src="/app-light.png"
                alt="应用浅色模式"
                fill
                className="object-contain dark:hidden"
                priority
              />
              <Image
                src="/app-dark.png"
                alt="应用深色模式"
                fill
                className="object-contain hidden dark:block"
                priority
              />
            </div>
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end pb-10 md:pb-16 pointer-events-none">
            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 h-full flex flex-col justify-end">
              <div className="flex flex-col md:flex-row items-end justify-between gap-8 pointer-events-auto">
                {/* Bottom Left */}
                <div className="w-full md:max-w-4xl space-y-6 text-left">
                  {/* Notification */}
                  <Link href="/projects" className="inline-block">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 backdrop-blur-md border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition-colors shadow-sm">
                      <NotificationIcon className="h-4 w-4 mr-2" />
                      <span>混合模式与滤镜已上线！</span>
                    </div>
                  </Link>

                  <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight drop-shadow-2xl">
                    开源 <br />
                    <span className="text-accent">CA 壁纸编辑器。</span>
                  </h1>

                  <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-medium drop-shadow-md">
                    使用 CAPlayground 在任何桌面电脑上为 iOS 和 iPadOS 创建精美的动态壁纸。
                  </p>

                  <div className="pt-2">
                    <Link href="/projects" className="block w-full md:w-auto">
                      <Button size="lg" className="w-full md:w-auto h-14 px-8 text-lg min-w-[200px] bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/20">
                        开始使用 <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="bg-background relative">
          <BentoGridSection />
        </section>
        {/* Existing Most Downloaded Section */}
        {mostDownloaded && (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-3 min-[600px]:px-4 lg:px-6">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <Card className="overflow-hidden border-8 border-zinc-200/80 dark:border-white/30 shadow-lg">
                    <CardContent className="p-4">
                      <div className="mb-3 overflow-hidden rounded-md border bg-background">
                        <AspectRatio ratio={1} className="flex items-center justify-center">
                          {(() => {
                            const previewUrl = `${mostDownloaded.baseUrl}${mostDownloaded.wallpaper.preview}`
                            return isVideo(previewUrl) ? (
                              <video
                                src={previewUrl}
                                className="w-full h-full object-contain"
                                autoPlay
                                muted
                                loop
                                playsInline
                                aria-label={`${mostDownloaded.wallpaper.name} 预览`}
                              />
                            ) : (
                              <img
                                src={previewUrl}
                                alt={`${mostDownloaded.wallpaper.name} 预览`}
                                className="w-full h-full object-contain"
                              />
                            )
                          })()}
                        </AspectRatio>
                      </div>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {mostDownloaded.wallpaper.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        作者 {mostDownloaded.wallpaper.creator}（提交于 {mostDownloaded.wallpaper.from}）
                      </p>
                      {mostDownloaded.downloads > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                          <Download className="h-3.5 w-3.5" />
                          <span>{mostDownloaded.downloads}</span>
                          <span>次下载</span>
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {mostDownloaded.wallpaper.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold">
                    探索下载量最高的壁纸
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0">
                    看看社区最喜欢的作品，然后前往完整画廊，发现更多适用于你设备的动态壁纸。
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                    <Link href={`/wallpapers?id=${mostDownloaded.wallpaper.id}`}>
                      <Button size="lg" className="px-6 bg-accent hover:bg-accent/90 text-white font-semibold">
                        查看此壁纸
                      </Button>
                    </Link>
                    <Link href="/wallpapers">
                      <Button size="lg" variant="outline" className="px-6">
                        浏览壁纸画廊
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
