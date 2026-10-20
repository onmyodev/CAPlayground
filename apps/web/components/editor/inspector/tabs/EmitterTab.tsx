"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { type InspectorTabProps } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditor } from "../../editor-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EmitterCellThumbnail from "../../emitter/EmitterCellThumbnail";
import { RotationKnob } from "@/components/ui/rotation-knob";
import { SliderInput } from "@/components/ui/slider-input";

interface EmitterTabProps extends InspectorTabProps {
  activeState?: string;
  addEmitterCellImage: (layerId: string, file: File) => Promise<void>;
}

export function EmitterTab({
  selected,
  updateLayer,
  updateLayerTransient,
  activeState,
  getBuf,
  setBuf,
  fmt0,
  fmt2,
  round2,
  clearBuf,
  addEmitterCellImage,
}: EmitterTabProps) {
  const { removeEmitterCell, replaceEmitterCellImage } = useEditor();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileAction, setFileAction] = useState<{ type: 'add' | 'change'; cellIndex?: number } | null>(null);
  const inState = !!activeState && activeState !== 'Base State';

  const handleChangeImageClick = (cellIndex: number) => {
    setFileAction({ type: 'change', cellIndex });
    fileInputRef.current?.click();
  };

  if (selected.type !== 'emitter') return null;

  return (
    <div className="grid grid-cols-2 gap-x-1.5 gap-y-3">
      <div className="space-y-1">
        <Label htmlFor="emitterPosition-x" className="text-xs">X</Label>
        <Input
          id="emitterPosition-x"
          type="number"
          step="1"
          value={getBuf('emitterPosition.x', fmt0((selected as any).emitterPosition.x || 0))}
          onChange={(e) => {
            setBuf('emitterPosition.x', e.target.value);
            const v = e.target.value.trim();
            if (v === "") return;
            const num = Math.round(Number(v));
            if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterPosition: { ...selected.emitterPosition, x: num } as any } as any);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
          onBlur={(e) => {
            const v = e.target.value.trim();
            const num = v === "" ? 0 : Math.round(Number(v));
            updateLayer(selected.id, { emitterPosition: { ...selected.emitterPosition, x: num } as any } as any);
            clearBuf('emitterPosition.x');
          }}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="emitterPosition-y" className="text-xs">Y</Label>
        <Input
          id="emitterPosition-y"
          type="number"
          step="1"
          value={getBuf('emitterPosition.y', fmt0((selected as any).emitterPosition.y))}
          onChange={(e) => {
            setBuf('emitterPosition.y', e.target.value);
            const v = e.target.value.trim();
            if (v === "") return;
            const num = Math.round(Number(v));
            if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterPosition: { ...selected.emitterPosition, y: num } as any } as any);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
          onBlur={(e) => {
            const v = e.target.value.trim();
            const num = v === "" ? 0 : Math.round(Number(v));
            updateLayer(selected.id, { emitterPosition: { ...selected.emitterPosition, y: num } as any } as any);
            clearBuf('emitterPosition.y');
          }}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="emitterSize-w" className="text-xs">宽度</Label>
        <Input
          id="emitterSize-w"
          type="number"
          step="1"
          value={getBuf('emitterSize.w', fmt0((selected as any).emitterSize.w))}
          onChange={(e) => {
            setBuf('emitterSize.w', e.target.value);
            const v = e.target.value.trim();
            if (v === "") return;
            const num = Math.round(Number(v));
            if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterSize: { ...selected.emitterSize, w: num } as any } as any);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
          onBlur={(e) => {
            const v = e.target.value.trim();
            const num = v === "" ? 0 : Math.round(Number(v));
            updateLayer(selected.id, { emitterSize: { ...selected.emitterSize, w: num } as any } as any);
            clearBuf('emitterSize.w');
          }}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="emitterSize-h" className="text-xs">高度</Label>
        <Input
          id="emitterSize-h"
          type="number"
          step="1"
          value={getBuf('emitterSize.h', fmt0((selected as any).emitterSize.h))}
          onChange={(e) => {
            setBuf('emitterSize.h', e.target.value);
            const v = e.target.value.trim();
            if (v === "") return;
            const num = Math.round(Number(v));
            if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterSize: { ...selected.emitterSize, h: num } as any } as any);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
          onBlur={(e) => {
            const v = e.target.value.trim();
            const num = v === "" ? 0 : Math.round(Number(v));
            updateLayer(selected.id, { emitterSize: { ...selected.emitterSize, h: num } as any } as any);
            clearBuf('emitterSize.h');
          }}
        />
      </div>
      <div className="space-y-1 col-span-2">
        <Label>渲染模式</Label>
        <Select
          value={((selected as any)?.renderMode ?? 'unordered') as any}
          onValueChange={(v) => {
            const renderMode = v;
            const current = (selected as any)?.renderMode;
            if (current === renderMode) return;
            updateLayer(selected.id, { ...selected, renderMode } as any);
          }}
        >
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue placeholder="选择渲染模式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unordered">无序</SelectItem>
            <SelectItem value="additive">叠加</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>形状</Label>
        <Select
          value={((selected as any)?.emitterShape ?? 'point') as any}
          onValueChange={(v) => {
            const emitterShape = v;
            const current = (selected as any)?.emitterShape;
            if (current === emitterShape) return;
            updateLayer(selected.id, { ...selected, emitterShape } as any);
          }}
        >
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue placeholder="选择发射器形状" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="point">点</SelectItem>
            <SelectItem value="line">线</SelectItem>
            <SelectItem value="rectangle">矩形</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>模式</Label>
        <Select
          value={((selected as any)?.emitterMode ?? 'volume') as any}
          onValueChange={(v) => {
            const current = (selected as any)?.emitterMode;
            if (current === v) return;
            updateLayer(selected.id, { ...selected, emitterMode: v } as any);
          }}
        >
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue placeholder="选择发射器模式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volume">体积</SelectItem>
            <SelectItem value="outline">轮廓</SelectItem>
            <SelectItem value="surface">表面</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SliderInput
        className="col-span-2"
        label="速度"
        value={round2(selected.speed ?? 1)}
        bufferKey="speed"
        getBuf={getBuf}
        setBuf={setBuf}
        clearBuf={clearBuf}
        disabled={inState}
        min={-2}
        max={2}
        step={0.01}
        showPercentage={false}
        snapPoints={[-2, -1, 0, 1, 2]}
        showSnapLabels
        onUpdateTransient={(value) => {
          updateLayerTransient(selected.id, { speed: value });
        }}
        onUpdateCommitted={(value) => {
          updateLayer(selected.id, { speed: value });
        }}
      />
      <div className="col-span-2">
        <div className="flex items-center justify-between">
          <Label>单元</Label>
          <Button
            type="button"
            variant="secondary"
            disabled={inState}
            onClick={() => {
              setFileAction({ type: 'add' });
              fileInputRef.current?.click();
            }}
          >
            + 添加单元
          </Button>
        </div>
        <Accordion
          type="multiple"
        >
          {selected.emitterCells?.map((cell, i) => (
            <AccordionItem key={cell.id} value={cell.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <EmitterCellThumbnail
                    cellId={cell.id}
                    cellSrc={cell.src}
                    size={20}
                  />
                  单元 {i + 1}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-6 gap-y-3 gap-x-1.5 items-end" key={i}>
                  <SliderInput
                    className="col-span-3"
                    label="内容缩放"
                    value={cell.contentsScale}
                    bufferKey={'emitterCells[' + i + '].contentsScale'}
                    getBuf={getBuf}
                    setBuf={setBuf}
                    clearBuf={clearBuf}
                    disabled={inState}
                    min={0}
                    max={400}
                    onUpdateTransient={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, contentsScale: value };
                      updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                    }}
                    onUpdateCommitted={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, contentsScale: value };
                      updateLayer(selected.id, { emitterCells: cells as any } as any);
                    }}
                  />
                  <Button
                    variant="secondary"
                    type="button"
                    className="col-span-3"
                    disabled={inState}
                    onClick={() => handleChangeImageClick(i)}
                  >
                    更换图片
                  </Button>
                  <div className="col-span-3 space-y-1">
                    <Label>出生率</Label>
                    <Input
                      type="number"
                      step="1"
                      value={getBuf('emitterCells[' + i + '].birthRate', fmt2(cell.birthRate))}
                      disabled={inState}
                      onChange={(e) => {
                        setBuf('emitterCells[' + i + '].birthRate', e.target.value);
                        const v = e.target.value.trim();
                        if (v === "") return;
                        const num = Number(v);
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, birthRate: num } as any;
                        if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
                      onBlur={(e) => {
                        const v = e.target.value.trim();
                        const num = v === "" ? 0 : Number(v);
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, birthRate: num } as any;
                        updateLayer(
                          selected.id,
                          { emitterCells: cells as any } as any);
                        clearBuf('emitterCells[' + i + '].birthRate');
                      }}
                    />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <Label>生命周期</Label>
                    <Input
                      type="number"
                      step="1"
                      value={getBuf('emitterCells[' + i + '].lifetime', fmt0(cell.lifetime))}
                      disabled={inState}
                      onChange={(e) => {
                        setBuf('emitterCells[' + i + '].lifetime', e.target.value);
                        const v = e.target.value.trim();
                        if (v === "") return;
                        const num = Math.round(Number(v));
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, lifetime: num } as any;
                        if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
                      onBlur={(e) => {
                        const v = e.target.value.trim();
                        const num = v === "" ? 0 : Math.round(Number(v));
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, lifetime: num } as any;
                        updateLayer(
                          selected.id,
                          { emitterCells: cells as any } as any);
                        clearBuf('emitterCells[' + i + '].lifetime');
                      }}
                    />
                  </div>
                  <div className="col-span-6 space-y-1">
                    <Label>速度</Label>
                    <Input
                      type="number"
                      step="1"
                      value={getBuf('emitterCells[' + i + '].velocity', fmt0(cell.velocity))}
                      disabled={inState}
                      onChange={(e) => {
                        setBuf('emitterCells[' + i + '].velocity', e.target.value);
                        const v = e.target.value.trim();
                        if (v === "") return;
                        const num = Math.round(Number(v));
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, velocity: num } as any;
                        if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
                      onBlur={(e) => {
                        const v = e.target.value.trim();
                        const num = v === "" ? 0 : Math.round(Number(v));
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, velocity: num } as any;
                        updateLayer(
                          selected.id,
                          { emitterCells: cells as any } as any);
                        clearBuf('emitterCells[' + i + '].velocity');
                      }}
                    />
                  </div>
                  <div className="col-span-3 space-y-1 grid grid-cols-2">
                    <Label className="col-span-2">发射</Label>
                    <div className="space-y-1">
                      <div className="flex justify-center py-1">
                        <RotationKnob
                          label="范围"
                          value={Number(fmt0(cell.emissionRange)) || 0}
                          disabled={inState}
                          onChange={(v) => {
                            const cells = selected.emitterCells?.slice() || [];
                            cells[i] = { ...cell, emissionRange: v };
                            updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                          }}
                          onChangeEnd={(v) => {
                            const cells = selected.emitterCells?.slice() || [];
                            cells[i] = { ...cell, emissionRange: v };
                            updateLayer(selected.id, { emitterCells: cells as any } as any);
                          }}
                          size={60}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-center py-1">
                        <RotationKnob
                          label="角度"
                          value={Number(fmt0(cell.emissionLongitude)) || 0}
                          disabled={inState}
                          onChange={(v) => {
                            const cells = selected.emitterCells?.slice() || [];
                            cells[i] = { ...cell, emissionLongitude: v };
                            updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                          }}
                          onChangeEnd={(v) => {
                            const cells = selected.emitterCells?.slice() || [];
                            cells[i] = { ...cell, emissionLongitude: v };
                            updateLayer(selected.id, { emitterCells: cells as any } as any);
                          }}
                          size={60}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 space-y-1 grid grid-cols-2">
                    <Label className="col-span-2">自转</Label>
                    <div className="space-y-1">
                      <div className="flex justify-center py-1">
                        <RotationKnob
                          label="自转"
                          value={Number(fmt0(cell.spin)) || 0}
                          disabled={inState}
                          onChange={(v) => {
                            const cells = selected.emitterCells?.slice() || [];
                            cells[i] = { ...cell, spin: v };
                            updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                          }}
                          onChangeEnd={(v) => {
                            const cells = selected.emitterCells?.slice() || [];
                            cells[i] = { ...cell, spin: v };
                            updateLayer(selected.id, { emitterCells: cells as any } as any);
                          }}
                          size={60}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-center py-1">
                        <RotationKnob
                          label="范围"
                          value={Number(fmt2(cell.spinRange)) || 0}
                          disabled={inState}
                          onChange={(v) => {
                            const cells = selected.emitterCells?.slice() || [];
                            cells[i] = { ...cell, spinRange: v };
                            updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                          }}
                          onChangeEnd={(v) => {
                            const cells = selected.emitterCells?.slice() || [];
                            cells[i] = { ...cell, spinRange: v };
                            updateLayer(selected.id, { emitterCells: cells as any } as any);
                          }}
                          size={60}
                        />
                      </div>
                    </div>
                  </div>
                  <SliderInput
                    className="col-span-6"
                    label="缩放"
                    value={cell.scale}
                    bufferKey={'emitterCells[' + i + '].scale'}
                    getBuf={getBuf}
                    setBuf={setBuf}
                    clearBuf={clearBuf}
                    disabled={inState}
                    onUpdateTransient={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, scale: value };
                      updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                    }}
                    onUpdateCommitted={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, scale: value };
                      updateLayer(selected.id, { emitterCells: cells as any } as any);
                    }}
                  />
                  <SliderInput
                    className="col-span-3"
                    label="缩放范围"
                    value={cell.scaleRange}
                    bufferKey={'emitterCells[' + i + '].scaleRange'}
                    getBuf={getBuf}
                    setBuf={setBuf}
                    clearBuf={clearBuf}
                    disabled={inState}
                    onUpdateTransient={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, scaleRange: value };
                      updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                    }}
                    onUpdateCommitted={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, scaleRange: value };
                      updateLayer(selected.id, { emitterCells: cells as any } as any);
                    }}
                  />
                  <SliderInput
                    className="col-span-3"
                    label="缩放速度"
                    value={cell.scaleSpeed}
                    bufferKey={'emitterCells[' + i + '].scaleSpeed'}
                    getBuf={getBuf}
                    setBuf={setBuf}
                    clearBuf={clearBuf}
                    disabled={inState}
                    onUpdateTransient={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, scaleSpeed: value };
                      updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                    }}
                    onUpdateCommitted={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, scaleSpeed: value };
                      updateLayer(selected.id, { emitterCells: cells as any } as any);
                    }}
                  />
                  <SliderInput
                    className="col-span-6"
                    label="不透明度"
                    value={cell.alpha}
                    bufferKey={'emitterCells[' + i + '].alpha'}
                    getBuf={getBuf}
                    setBuf={setBuf}
                    clearBuf={clearBuf}
                    disabled={inState}
                    min={0}
                    max={100}
                    snapPoints={[50]}
                    onUpdateTransient={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, alpha: value };
                      updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                    }}
                    onUpdateCommitted={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, alpha: value };
                      updateLayer(selected.id, { emitterCells: cells as any } as any);
                    }}
                  />
                  <SliderInput
                    className="col-span-3"
                    label="不透明度范围"
                    value={cell.alphaRange}
                    bufferKey={'emitterCells[' + i + '].alphaRange'}
                    getBuf={getBuf}
                    setBuf={setBuf}
                    clearBuf={clearBuf}
                    disabled={inState}
                    min={-100}
                    max={100}
                    snapPoints={[0]}
                    snapThreshold={0.08}
                    onUpdateTransient={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, alphaRange: value };
                      updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                    }}
                    onUpdateCommitted={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, alphaRange: value };
                      updateLayer(selected.id, { emitterCells: cells as any } as any);
                    }}
                  />
                  <SliderInput
                    className="col-span-3"
                    label="不透明度速度"
                    value={cell.alphaSpeed}
                    bufferKey={'emitterCells[' + i + '].alphaSpeed'}
                    getBuf={getBuf}
                    setBuf={setBuf}
                    clearBuf={clearBuf}
                    disabled={inState}
                    min={-100}
                    max={100}
                    snapPoints={[0]}
                    snapThreshold={0.08}
                    onUpdateTransient={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, alphaSpeed: value };
                      updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                    }}
                    onUpdateCommitted={(value) => {
                      const cells = selected.emitterCells?.slice() || [];
                      cells[i] = { ...cell, alphaSpeed: value };
                      updateLayer(selected.id, { emitterCells: cells as any } as any);
                    }}
                  />
                  <div className="col-span-3 space-y-1">
                    <Label>X 加速度</Label>
                    <Input
                      type="number"
                      step="1"
                      value={getBuf('emitterCells[' + i + '].xAcceleration', fmt0(cell.xAcceleration))}
                      disabled={inState}
                      onChange={(e) => {
                        setBuf('emitterCells[' + i + '].xAcceleration', e.target.value);
                        const v = e.target.value.trim();
                        if (v === "") return;
                        const num = Number(v);
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, xAcceleration: num } as any;
                        if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
                      onBlur={(e) => {
                        const v = e.target.value.trim();
                        const num = v === "" ? 0 : Number(v);
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, xAcceleration: num } as any;
                        updateLayer(
                          selected.id,
                          { emitterCells: cells as any } as any);
                        clearBuf('emitterCells[' + i + '].xAcceleration');
                      }}
                    />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <Label>Y 加速度</Label>
                    <Input
                      type="number"
                      step="1"
                      value={getBuf('emitterCells[' + i + '].yAcceleration', fmt0(cell.yAcceleration))}
                      disabled={inState}
                      onChange={(e) => {
                        setBuf('emitterCells[' + i + '].yAcceleration', e.target.value);
                        const v = e.target.value.trim();
                        if (v === "") return;
                        const num = Number(v);
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, yAcceleration: num } as any;
                        if (Number.isFinite(num)) updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); e.preventDefault(); } }}
                      onBlur={(e) => {
                        const v = e.target.value.trim();
                        const num = v === "" ? 0 : Number(v);
                        const cells = selected.emitterCells?.slice() || [];
                        cells[i] = { ...cell, yAcceleration: num } as any;
                        updateLayer(
                          selected.id,
                          { emitterCells: cells as any } as any);
                        clearBuf('emitterCells[' + i + '].yAcceleration');
                      }}
                    />
                  </div>
                  <div className="col-span-6">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="advanced-color">
                        <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground">
                          高级颜色控制
                        </AccordionTrigger>
                        <AccordionContent className="grid grid-cols-6 gap-3">
                          <div className="col-span-6 space-y-1">
                            <Label>颜色</Label>
                            <Input
                              type="color"
                              value={cell.color}
                              disabled={inState}
                              onChange={(e) => {
                                const cells = selected.emitterCells?.slice() || [];
                                cells[i] = { ...cell, color: e.target.value } as any;
                                updateLayer(selected.id, { emitterCells: cells as any } as any);
                              }}
                            />
                          </div>
                          <SliderInput
                            className="col-span-3"
                            label="红色范围"
                            value={cell.redRange}
                            bufferKey={'emitterCells[' + i + '].redRange'}
                            getBuf={getBuf}
                            setBuf={setBuf}
                            clearBuf={clearBuf}
                            disabled={inState}
                            min={-100}
                            max={100}
                            snapPoints={[0]}
                            snapThreshold={0.08}
                            onUpdateTransient={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, redRange: value };
                              updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                            }}
                            onUpdateCommitted={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, redRange: value };
                              updateLayer(selected.id, { emitterCells: cells as any } as any);
                            }}
                          />
                          <SliderInput
                            className="col-span-3"
                            label="速度"
                            value={cell.redSpeed}
                            bufferKey={'emitterCells[' + i + '].redSpeed'}
                            getBuf={getBuf}
                            setBuf={setBuf}
                            clearBuf={clearBuf}
                            disabled={inState}
                            min={-100}
                            max={100}
                            snapPoints={[0]}
                            snapThreshold={0.08}
                            onUpdateTransient={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, redSpeed: value };
                              updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                            }}
                            onUpdateCommitted={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, redSpeed: value };
                              updateLayer(selected.id, { emitterCells: cells as any } as any);
                            }}
                          />
                          <SliderInput
                            className="col-span-3"
                            label="绿色范围"
                            value={cell.greenRange}
                            bufferKey={'emitterCells[' + i + '].greenRange'}
                            getBuf={getBuf}
                            setBuf={setBuf}
                            clearBuf={clearBuf}
                            disabled={inState}
                            min={-100}
                            max={100}
                            snapPoints={[0]}
                            snapThreshold={0.08}
                            onUpdateTransient={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, greenRange: value };
                              updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                            }}
                            onUpdateCommitted={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, greenRange: value };
                              updateLayer(selected.id, { emitterCells: cells as any } as any);
                            }}
                          />
                          <SliderInput
                            className="col-span-3"
                            label="速度"
                            value={cell.greenSpeed}
                            bufferKey={'emitterCells[' + i + '].greenSpeed'}
                            getBuf={getBuf}
                            setBuf={setBuf}
                            clearBuf={clearBuf}
                            disabled={inState}
                            min={-100}
                            max={100}
                            snapPoints={[0]}
                            snapThreshold={0.08}
                            onUpdateTransient={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, greenSpeed: value };
                              updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                            }}
                            onUpdateCommitted={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, greenSpeed: value };
                              updateLayer(selected.id, { emitterCells: cells as any } as any);
                            }}
                          />
                          <SliderInput
                            className="col-span-3"
                            label="蓝色范围"
                            value={cell.blueRange}
                            bufferKey={'emitterCells[' + i + '].blueRange'}
                            getBuf={getBuf}
                            setBuf={setBuf}
                            clearBuf={clearBuf}
                            disabled={inState}
                            min={-100}
                            max={100}
                            snapPoints={[0]}
                            snapThreshold={0.08}
                            onUpdateTransient={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, blueRange: value };
                              updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                            }}
                            onUpdateCommitted={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, blueRange: value };
                              updateLayer(selected.id, { emitterCells: cells as any } as any);
                            }}
                          />
                          <SliderInput
                            className="col-span-3"
                            label="速度"
                            value={cell.blueSpeed}
                            bufferKey={'emitterCells[' + i + '].blueSpeed'}
                            getBuf={getBuf}
                            setBuf={setBuf}
                            clearBuf={clearBuf}
                            disabled={inState}
                            min={-100}
                            max={100}
                            snapPoints={[0]}
                            snapThreshold={0.08}
                            onUpdateTransient={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, blueSpeed: value };
                              updateLayerTransient(selected.id, { emitterCells: cells as any } as any);
                            }}
                            onUpdateCommitted={(value) => {
                              const cells = selected.emitterCells?.slice() || [];
                              cells[i] = { ...cell, blueSpeed: value };
                              updateLayer(selected.id, { emitterCells: cells as any } as any);
                            }}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={inState}
                    onClick={() => removeEmitterCell(selected.id, i)}
                    className="col-span-6 justify-self-center"
                  >
                    移除
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp,image/svg+xml"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file && fileAction) {
              if (fileAction.type === 'add') {
                await addEmitterCellImage(selected.id, file);
              } else if (fileAction.type === 'change' && fileAction.cellIndex !== undefined) {
                await replaceEmitterCellImage(selected.id, fileAction.cellIndex, file);
              }
            }
            if (fileInputRef.current) fileInputRef.current.value = '';
            setFileAction(null);
          }}
        />
      </div>
    </div>
  );
}
