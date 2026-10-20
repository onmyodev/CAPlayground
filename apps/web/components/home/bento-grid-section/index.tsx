"use client"

import { useState, useEffect } from "react"
import { BentoItem, LayerItem } from "./bento-item"
import { BentoBasicLayer } from "./layers/basic"
import { BentoGradientLayer } from "./layers/gradient"
import { BentoImageLayer } from "./layers/image"
import { BentoVideoLayer } from "./layers/video"
import { BentoEmitterLayer } from "./layers/emitter"
import { BentoTransformLayer } from "./layers/transform"
import { BentoReplicatorLayer } from "./layers/replicator"
import { BentoLiquidGlassLayer } from "./layers/liquid-glass"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Download, Edit, Youtube, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

const layers: LayerItem[] = [
    { id: "basic", title: "基础图层", description: "用于背景或简单元素的基础纯色或形状图层（CALayer）。", type: "basic", exampleId: "4983462" },
    { id: "gradient", title: "渐变图层", description: "创建平滑的颜色渐变，可配置颜色、方向与色标位置。", type: "gradient", exampleId: "9612103" },
    { id: "image", title: "图片图层", description: "渲染静态图片或照片，支持缩放、定位与蒙版。", type: "image", exampleId: "9372814" },
    { id: "video", title: "视频图层", description: "以循环动画元素的形式播放嵌入的视频内容。", type: "video", exampleId: "9232798" },
    { id: "emitter", title: "发射器图层", description: "生成粒子效果（CAEmitterLayer），如雪花、火焰或彩纸屑，粒子可自定义。", type: "emitter", exampleId: "1633426" },
    { id: "transform", title: "变换图层", description: "控制 3D 变换、透视与深度，实现沉浸而真实的图层交互。", type: "transform", exampleId: "9531199" },
    { id: "replicator", title: "复制器图层", description: "以图案（例如网格、圆形）复制子图层，高效完成重复性设计。", type: "replicator", exampleId: "5733952" },
    { id: "liquid-glass", title: "液态玻璃图层", description: "模拟折射与流动玻璃扭曲效果的特效图层", type: "liquid-glass", exampleId: "7670567" },
]

function isVideo(src: string) {
    const lower = src.toLowerCase()
    return lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.includes("/video/")
}

export function BentoGridSection() {
    const [selectedWallpaper, setSelectedWallpaper] = useState<any | null>(null)
    const [wallpaperData, setWallpaperData] = useState<any>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/CAPlayground/wallpapers/refs/heads/main/wallpapers.json")
            .then(res => res.json())
            .then(data => setWallpaperData(data))
            .catch(() => { })
    }, [])

    const handleExampleClick = (exampleId?: string) => {
        if (!wallpaperData || !exampleId) return
        const example = wallpaperData.wallpapers.find((w: any) => String(w.id) === exampleId)
        if (example) setSelectedWallpaper(example)
    }

    const handleCopyLink = (wallpaper: any) => {
        const url = `${window.location.origin}/wallpapers?id=${wallpaper.id}`
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const renderLayer = (type: string, isHovered: boolean) => {
        switch (type) {
            case 'basic': return <BentoBasicLayer />
            case 'gradient': return <BentoGradientLayer />
            case 'image': return <BentoImageLayer />
            case 'video': return <BentoVideoLayer isHovered={isHovered} />
            case 'emitter': return <BentoEmitterLayer isHovered={isHovered} />
            case 'transform': return <BentoTransformLayer />
            case 'replicator': return <BentoReplicatorLayer />
            case 'liquid-glass': return <BentoLiquidGlassLayer />
            default: return null
        }
    }

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-24">
            <div className="text-center mb-16 space-y-4">
                <h2 className="font-heading text-4xl md:text-6xl font-bold">
                    无限可能的图层。
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                    组合不同的图层类型来构建复杂的壁纸状态，每种图层都有各自独特的属性与动画。
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-4 gap-4">
                {layers.map((item, index) => (
                    <BentoItem
                        key={item.id}
                        item={item}
                        renderLayer={(isHovered: boolean) => renderLayer(item.type, isHovered)}
                        onExampleClick={item.exampleId ? () => handleExampleClick(item.exampleId) : undefined}
                        className={cn(
                            index >= 6 ? "lg:col-span-3 xl:col-span-1" : "lg:col-span-2 xl:col-span-1"
                        )}
                    />
                ))}
            </div>

            <Dialog open={!!selectedWallpaper} onOpenChange={(open: boolean) => !open && setSelectedWallpaper(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedWallpaper && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">{selectedWallpaper.name}</DialogTitle>
                                <DialogDescription className="text-base">
                                    作者 {selectedWallpaper.creator}（提交于 {selectedWallpaper.from}）
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-6">
                                <div className="rounded-lg border bg-background overflow-hidden relative">
                                    <AspectRatio ratio={1} className="flex items-center justify-center">
                                        {isVideo(`${wallpaperData.base_url}${selectedWallpaper.preview}`) ? (
                                            <video
                                                src={`${wallpaperData.base_url}${selectedWallpaper.preview}`}
                                                autoPlay muted loop playsInline
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <img
                                                src={`${wallpaperData.base_url}${selectedWallpaper.preview}`}
                                                alt={selectedWallpaper.name}
                                                className="w-full h-full object-contain"
                                            />
                                        )}
                                    </AspectRatio>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">描述</h3>
                                    <p className="text-sm text-muted-foreground">{selectedWallpaper.description}</p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button className="w-full" onClick={() => window.open(`${wallpaperData.base_url}${selectedWallpaper.file}`, '_blank')}>
                                        <Download className="h-4 w-4 mr-2" />
                                        下载 .tendies
                                    </Button>

                                    <Button variant="outline" className="w-full" asChild>
                                        <a href={`/wallpapers?id=${selectedWallpaper.id}&action=edit`}>
                                            <Edit className="h-4 w-4 mr-2" /> 在编辑器中打开
                                        </a>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => window.open('https://www.youtube.com/watch?v=nSBQIwAaAEc', '_blank')}
                                    >
                                        <Youtube className="h-4 w-4 mr-2" />
                                        观看教程
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                        onClick={() => handleCopyLink(selectedWallpaper)}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="h-4 w-4 mr-2" />
                                                已复制
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4 mr-2" />
                                                复制链接
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

