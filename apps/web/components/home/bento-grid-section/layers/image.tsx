"use client"

export function BentoImageLayer() {
    return (
        <div className="w-full h-full relative">
            <img
                src="/app-dark.png"
                alt="图片图层示例"
                className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
    )
}
