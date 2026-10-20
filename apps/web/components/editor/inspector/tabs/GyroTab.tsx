"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AnyLayer, GyroParallaxDictionary } from "@/lib/ca/types";
import { X } from "lucide-react";

interface GyroTabProps {
  selected: AnyLayer;
  wallpaperParallaxGroups: GyroParallaxDictionary[];
  setDoc: (updater: (prev: any) => any) => void;
}

export function GyroTab({
  selected,
  wallpaperParallaxGroups,
  setDoc,
}: GyroTabProps) {
  const transformLayerName = selected?.name;
  const layerDicts = wallpaperParallaxGroups.filter(d => d.layerName === transformLayerName);
  const addDictionary = () => {
    if (layerDicts.length >= 10) {
      return;
    }
    const newDict = {
      axis: 'x' as 'x' | 'y',
      image: 'null',
      keyPath: 'position.x' as any,
      layerName: transformLayerName || '',
      mapMaxTo: 50,
      mapMinTo: -50,
      title: '新陀螺仪效果',
    };
    setDoc((prev: any) => {
      if (!prev) return prev;
      const key = prev.activeCA;
      const currentDicts = prev.docs[key].wallpaperParallaxGroups || [];
      return {
        ...prev,
        docs: {
          ...prev.docs,
          [key]: {
            ...prev.docs[key],
            wallpaperParallaxGroups: [...currentDicts, newDict],
          },
        },
      };
    });
  };

  const updateDictionary = (index: number, updates: Partial<typeof layerDicts[0]>) => {
    setDoc((prev: any) => {
      if (!prev) return prev;
      const key = prev.activeCA;
      const allDicts = prev.docs[key].wallpaperParallaxGroups || [];
      const globalIndex = allDicts.findIndex((d: any, i: number) => d.layerName === transformLayerName && layerDicts.findIndex(ld => ld === d) === index);
      if (globalIndex === -1) return prev;
      const updated = [...allDicts];
      updated[globalIndex] = { ...updated[globalIndex], ...updates };
      return {
        ...prev,
        docs: {
          ...prev.docs,
          [key]: {
            ...prev.docs[key],
            wallpaperParallaxGroups: updated,
          },
        },
      };
    });
  };

  const removeDictionary = (index: number) => {
    setDoc((prev: any) => {
      if (!prev) return prev;
      const key = prev.activeCA;
      const allDicts = prev.docs[key].wallpaperParallaxGroups || [];
      const globalIndex = allDicts.findIndex((d: any, i: number) => d.layerName === transformLayerName && layerDicts.findIndex(ld => ld === d) === index);
      if (globalIndex === -1) return prev;
      const updated = allDicts.filter((_: any, i: number) => i !== globalIndex);
      return {
        ...prev,
        docs: {
          ...prev.docs,
          [key]: {
            ...prev.docs[key],
            wallpaperParallaxGroups: updated,
          },
        },
      };
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">陀螺仪字典</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={addDictionary}
            disabled={layerDicts.length >= 10}
          >
            + 添加字典
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          配置该图层如何响应设备倾斜。最多可为该图层添加 10 个字典（2 个轴 × 5 个 keyPath）。（{layerDicts.length}/10）
        </p>
      </div>

      {layerDicts.length === 0 ? (
        <div className="border rounded-lg p-4 text-center text-sm text-muted-foreground">
          暂无陀螺仪字典。点击“+ 添加字典”创建一个。
        </div>
      ) : (
        layerDicts.map((dict, index) => (
          <Card key={index} className="p-4 pt-6 relative">
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 text-destructive absolute top-2 right-2"
              onClick={() => removeDictionary(index)}
            >
              <X className="size-4" />
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor={`gyro-title-${index}`}>标题</Label>
                <Input
                  id={`gyro-title-${index}`}
                  type="text"
                  placeholder="例如：倾斜效果"
                  value={dict.title}
                  onChange={(e) => updateDictionary(index, { title: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`gyro-axis-${index}`}>轴</Label>
                <Select
                  value={dict.axis}
                  onValueChange={(v) => updateDictionary(index, { axis: v as 'x' | 'y' })}
                >
                  <SelectTrigger className="w-full" id={`gyro-axis-${index}`}>
                    <SelectValue placeholder="选择轴" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="x">X（左右）</SelectItem>
                    <SelectItem value="y">Y（上下）</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`gyro-keypath-${index}`}>Key Path</Label>
                <Select
                  value={dict.keyPath}
                  onValueChange={(v) => updateDictionary(index, { keyPath: v as any })}
                >
                  <SelectTrigger className="w-full" id={`gyro-keypath-${index}`}>
                    <SelectValue placeholder="选择属性" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="position.x">position.x</SelectItem>
                    <SelectItem value="position.y">position.y</SelectItem>
                    <SelectItem value="transform.translation.x">transform.translation.x</SelectItem>
                    <SelectItem value="transform.translation.y">transform.translation.y</SelectItem>
                    <SelectItem value="transform.rotation.x">transform.rotation.x</SelectItem>
                    <SelectItem value="transform.rotation.y">transform.rotation.y</SelectItem>
                    <SelectItem value="transform.rotation.z">transform.rotation.z</SelectItem>
                    <SelectItem value="anchorPoint.x">anchorPoint.x</SelectItem>
                    <SelectItem value="anchorPoint.y">anchorPoint.y</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`gyro-min-${index}`}>映射最小值到</Label>
                <Input
                  id={`gyro-min-${index}`}
                  type="number"
                  step="0.01"
                  placeholder="例如：-50"
                  value={dict.mapMinTo}
                  onChange={(e) => updateDictionary(index, { mapMinTo: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">
                  最小值（旋转为弧度，位置为 px）
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`gyro-max-${index}`}>映射最大值到</Label>
                <Input
                  id={`gyro-max-${index}`}
                  type="number"
                  step="0.01"
                  placeholder="例如：50"
                  value={dict.mapMaxTo}
                  onChange={(e) => updateDictionary(index, { mapMaxTo: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">
                  最大值（旋转为弧度，位置为 px）
                </p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
