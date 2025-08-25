'use client';

import React, { useEffect, useRef } from 'react';

type Props = {
  hue: number;
  size?: number;
  thickness?: number;
  onChange: (hue: number) => void;
  ariaLabel?: string;
};

export const ColorWheel: React.FC<Props> = ({ hue, size = 200, thickness = 20, onChange, ariaLabel }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const center = size / 2;
  const radius = center - 2;
  const innerRadius = radius - thickness;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    for (let a = 0; a < 360; a += 1) {
      const start = ((a - 1) * Math.PI) / 180;
      const end = (a * Math.PI) / 180;

      ctx.beginPath();
      ctx.strokeStyle = `hsl(${a} 100% 50%)`;
      ctx.lineWidth = thickness;
      ctx.arc(center, center, (innerRadius + radius) / 2, start, end);
      ctx.stroke();
    }

    const angle = (hue * Math.PI) / 180;
    const handleR = radius - thickness / 2;
    const x = center + handleR * Math.cos(angle);
    const y = center + handleR * Math.sin(angle);

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 2;
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }, [hue, innerRadius, radius, size, thickness, center]);

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - center;
    const y = e.clientY - rect.top - center;
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const deg = (angle + 360) % 360;

    onChange(deg);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointer(e);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) handlePointer(e);
  };

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      role='slider'
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={Math.round(hue)}
      className='touch-none select-none'
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      style={{ display: 'block' }}
    />
  );
};
