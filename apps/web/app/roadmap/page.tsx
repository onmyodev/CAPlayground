"use client";

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function RoadmapPage() {
  const [selectedMonth, setSelectedMonth] = useState<1 | 2 | 3>(3);

  useEffect(() => {
    document.title = "CAPlayground - 路线图";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="container mx-auto px-3 min-[600px]:px-4 lg:px-6 py-16 md:py-24">
        <header className="mb-10 space-y-2">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">项目路线图</h1>
          <p className="text-muted-foreground">CAPlayground 正在酝酿什么？（最后更新：2025 年 11 月 17 日）</p>
          <div className="flex gap-2 pt-4">
            <Button
              variant={selectedMonth === 1 ? "default" : "outline"}
              onClick={() => setSelectedMonth(1)}
            >
              第 1 个月
            </Button>
            <Button
              variant={selectedMonth === 2 ? "default" : "outline"}
              onClick={() => setSelectedMonth(2)}
            >
              第 2 个月
            </Button>
            <Button
              variant={selectedMonth === 3 ? "default" : "outline"}
              onClick={() => setSelectedMonth(3)}
            >
              第 3 个月
            </Button>
          </div>
        </header>

        {/* Status Badges
          <Badge className="align-middle mr-1">Done</Badge>
          <Badge variant="secondary" className="align-middle mx-1">In Progress</Badge>
          <Badge variant="outline" className="align-middle mx-1">Not Started</Badge>
        */}

        {selectedMonth === 1 && (
          <div className="space-y-6">
            <RoadmapItem index={1} title="起点" status={<Badge>完成：2025 年 8 月 24 日</Badge>}>
              2025 年 8 月 24 日启动项目，因为 Lemin 说该举办第二届壁纸比赛了。创建项目。
            </RoadmapItem>
            <RoadmapItem index={2} title="项目与基础编辑器" status={<Badge>完成：2025 年 8 月 24 日</Badge>}>
              项目页面、基础编辑器，以及创建 .ca 文件。
            </RoadmapItem>
            <RoadmapItem index={3} title="查看与编辑图层" status={<Badge>完成：2025 年 9 月 5 日</Badge>}>
              查看与编辑 Core Animation 文件的图层。导出 .ca 文件。
            </RoadmapItem>
            <RoadmapItem index={4} title="Core Animation 图层属性" status={<Badge>完成：2025 年 9 月 5 日</Badge>}>
              调整图层的位置、尺寸、不透明度、旋转等属性。
            </RoadmapItem>
            <RoadmapItem index={5} title="创建动画、查看与编辑状态" status={<Badge>完成：2025 年 9 月 22 日</Badge>}>
              创建状态过渡与关键帧动画。
            </RoadmapItem>
            <RoadmapItem index={6} title="CAPlayground 应用" status={<Badge variant="secondary" className="align-middle mx-1">已跳过</Badge>}>
              让 CAPlayground 能在应用内运行的应用。
            </RoadmapItem>
          </div>
        )}
        {selectedMonth === 2 && (
          <div className="space-y-6">
            <RoadmapItem index={1} title="移动端编辑器" status={<Badge>完成：2025 年 10 月 4 日</Badge>}>
              在 iPhone 或 iPad 等移动设备上编辑壁纸。
            </RoadmapItem>
            <RoadmapItem index={2} title="壁纸画廊" status={<Badge>完成：2025 年 10 月 5 日</Badge>}>
              壁纸画廊，用于展示你的壁纸并浏览 CAPlayground 社区的壁纸。
            </RoadmapItem>
            <RoadmapItem index={3} title="渐变图层" status={<Badge>完成：2025 年 10 月 7 日</Badge>}>
              使用径向、轴向和锥形模式创建渐变。
            </RoadmapItem>
            <RoadmapItem index={4} title="发射器支持" status={<Badge>完成：2025 年 10 月 24 日</Badge>}>
              创建发射器图层与单元以发射粒子。
            </RoadmapItem>
            <RoadmapItem index={5} title="视差效果（Beta）" status={<Badge>完成：2025 年 10 月 28 日</Badge>}>
              为 iOS 26 创建带视差效果（陀螺仪）的壁纸。因此需要支持子图层。
            </RoadmapItem>
          </div>
        )}
        {selectedMonth === 3 && (
          <div className="space-y-6">
            <RoadmapItem index={1} title="复制器图层" status={<Badge>完成：2025 年 11 月 3 日</Badge>}>
              创建复制器图层，以图案方式复制和排列图层。
            </RoadmapItem>
            <RoadmapItem index={2} title="混合模式" status={<Badge>完成：2025 年 11 月 12 日</Badge>}>
              在 2 个以上图层之间创建混合效果，例如变暗、变亮等。
            </RoadmapItem>
            <RoadmapItem index={3} title="滤镜" status={<Badge>完成：2025 年 11 月 12 日</Badge>}>
              为图层添加滤镜以实现效果，例如高斯模糊、对比度等。
            </RoadmapItem>
            <RoadmapItem index={4} title="视频与状态同步" status={<Badge>完成：2025 年 11 月 17 日</Badge>}>
              让视频与状态过渡同步，使视频在一个状态开始、在另一个状态结束。
            </RoadmapItem>
            <RoadmapItem index={5} title="性能优化" status={<Badge variant="secondary" className="align-middle mx-1">进行中</Badge>}>
              修复缺陷、提升性能，并通过优化设置减少设备上的崩溃与卡顿。
            </RoadmapItem>
          </div>
        )}
      </section>
      </main>
      <Footer />
    </div>
  )
}


function RoadmapItem({
  index,
  title,
  status,
  children,
}: {
  index: number
  title: string
  status: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <article className="rounded-xl border border-border bg-card text-card-foreground p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground font-semibold"
          >
            {index}
          </span>
          <h2 className="font-heading text-xl md:text-2xl font-semibold">{title}</h2>
        </div>
        <div aria-label="状态" className="mt-2 md:mt-0 md:shrink-0">
          {status}
        </div>
      </div>
      {children ? <p className="mt-3 text-sm md:text-base text-muted-foreground">{children}</p> : null}
    </article>
  )
}
