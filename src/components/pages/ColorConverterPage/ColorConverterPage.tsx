'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/atoms/Button';
import { ColorWheel } from '@/components/molecules/ColorPicker';
import { CopyButton } from '@/components/molecules/CopyButton';

import {
  HSL,
  OKLCH,
  RGBA,
  formatHSL,
  formatOKLCH,
  formatRGB,
  formatRGBA,
  hexToRgba,
  hslToRgba,
  oklchClipped,
  oklchToRgba,
  rgbaToHex,
  rgbaToHsl,
  rgbaToOklch,
} from '@/lib/color';
import { copyToClipboard } from '@/lib/copy';

type PickerModel = 'hsl' | 'oklch' | 'rgb';

export const ColorConverterPage: React.FC = () => {
  const t = useTranslations();
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const tx = (k: string) => (t as unknown as (k: string) => string)(k);

  const [model, setModel] = useState<PickerModel>('hsl');
  const [hue, setHue] = useState<number>(200);
  const [alpha, setAlpha] = useState<number>(1);

  const [hsl, setHsl] = useState<HSL>({ h: 200, s: 60, l: 50, a: 1 });
  const [oklch, setOklch] = useState<OKLCH>({ l: 0.75, c: 0.1, h: 200, a: 1 });
  const [rgb, setRgb] = useState<RGBA>({ r: 60, g: 140, b: 220, a: 1 });

  const currentRgba: RGBA = useMemo(() => {
    const a = alpha;

    if (model === 'hsl') return { ...hslToRgba({ ...hsl, a }), a };
    if (model === 'oklch') return { ...oklchToRgba({ ...oklch, a }), a };

    return { ...rgb, a };
  }, [alpha, hsl, model, oklch, rgb]);

  const currentHex = rgbaToHex(currentRgba, false);
  const asRGB = formatRGB(currentRgba);
  const asRGBA = formatRGBA(currentRgba);
  const asHSL = formatHSL(rgbaToHsl(currentRgba));
  const asOKLCH = formatOKLCH(rgbaToOklch(currentRgba));
  const showOklchWarning = model === 'oklch' && oklchClipped(oklch);

  const textContrastClass = useMemo(() => {
    const yiq = (currentRgba.r * 299 + currentRgba.g * 587 + currentRgba.b * 114) / 1000;

    return yiq >= 128 ? 'text-black' : 'text-white';
  }, [currentRgba]);

  useEffect(() => {
    if (model === 'hsl') setHue(hsl.h);
    if (model === 'oklch') setHue(oklch.h);
    if (model === 'rgb') setHue(rgbaToHsl(rgb).h);
  }, [model, hsl, oklch, rgb]);

  const handleHexInput = (value: string) => {
    try {
      const rgba = hexToRgba(value);

      setRgb({ ...rgba, a: alpha });
      const hslNew = rgbaToHsl(rgba);

      setHsl({ ...hslNew, a: alpha });
      const ok = rgbaToOklch(rgba);

      setOklch({ ...ok, a: alpha });
      setHue(hslNew.h);
    } catch (_e) {
      // ignore
    }
  };

  const wheelLabel = tx('tools.color.channels.hue');

  const [copied, setCopied] = useState<{ [k: string]: boolean }>({});
  const onCopy = (key: string, text: string) => copyToClipboard(text, (v) => setCopied((s) => ({ ...s, [key]: v })));
  const hexInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='container mx-auto p-6 max-w-6xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{tx('tools.color.title')}</h1>
        <p className='text-muted-foreground'>{tx('tools.color.description')}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='p-4 space-y-4'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <Badge variant='secondary'>{tx('tools.color.model.label')}</Badge>
              <Select value={model} onValueChange={(v: PickerModel) => setModel(v)}>
                <SelectTrigger className='w-40'>
                  <SelectValue placeholder={tx('tools.color.model.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='hsl'>{tx('tools.color.model.options.hsl')}</SelectItem>
                  <SelectItem value='oklch'>{tx('tools.color.model.options.oklch')}</SelectItem>
                  <SelectItem value='rgb'>{tx('tools.color.model.options.rgb')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center gap-2'>
              <div
                className='h-8 w-8 rounded border'
                style={{ backgroundColor: asRGBA }}
                aria-label={tx('tools.color.preview')}
              ></div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-4'>
            <ColorWheel
              hue={hue}
              onChange={(h) => {
                setHue(h);
                if (model === 'hsl') setHsl((s) => ({ ...s, h }));
                if (model === 'oklch') setOklch((s) => ({ ...s, h }));
                if (model === 'rgb') setRgb((prev) => ({ ...hslToRgba({ ...rgbaToHsl(prev), h }), a: alpha }));
              }}
              thickness={20}
              ariaLabel={wheelLabel}
            />

            {model === 'hsl' && (
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <ChannelControl
                  label={tx('tools.color.channels.saturation')}
                  value={hsl.s}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(v) => setHsl((s) => ({ ...s, s: v }))}
                />
                <ChannelControl
                  label={tx('tools.color.channels.lightness')}
                  value={hsl.l}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(v) => setHsl((s) => ({ ...s, l: v }))}
                />
              </div>
            )}
            {model === 'oklch' && (
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <ChannelControl
                  label={tx('tools.color.channels.luminance')}
                  value={oklch.l * 100}
                  min={0}
                  max={100}
                  step={0.5}
                  onChange={(v) => setOklch((s) => ({ ...s, l: v / 100 }))}
                />
                <ChannelControl
                  label={tx('tools.color.channels.chroma')}
                  value={oklch.c}
                  min={0}
                  max={0.4}
                  step={0.005}
                  onChange={(v) => setOklch((s) => ({ ...s, c: v }))}
                />
              </div>
            )}
            {model === 'rgb' && (
              <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <ChannelControl
                  label={tx('tools.color.channels.red')}
                  value={rgb.r}
                  min={0}
                  max={255}
                  step={1}
                  onChange={(v) => setRgb((s) => ({ ...s, r: Math.round(v) }))}
                />
                <ChannelControl
                  label={tx('tools.color.channels.green')}
                  value={rgb.g}
                  min={0}
                  max={255}
                  step={1}
                  onChange={(v) => setRgb((s) => ({ ...s, g: Math.round(v) }))}
                />
                <ChannelControl
                  label={tx('tools.color.channels.blue')}
                  value={rgb.b}
                  min={0}
                  max={255}
                  step={1}
                  onChange={(v) => setRgb((s) => ({ ...s, b: Math.round(v) }))}
                />
              </div>
            )}
            <div className='w-full'>
              <ChannelControl
                label={tx('tools.color.channels.alpha')}
                value={alpha}
                min={0}
                max={1}
                step={0.01}
                onChange={setAlpha}
              />
            </div>

            <div className='w-full space-y-2'>
              <label htmlFor='hex' className='text-sm text-muted-foreground'>
                {tx('tools.color.inputs.hex')}
              </label>
              <div className='flex gap-2'>
                <Input
                  id='hex'
                  ref={hexInputRef}
                  defaultValue={currentHex}
                  onBlur={(e) => handleHexInput(e.target.value)}
                />
                <Button onClick={() => handleHexInput(currentHex)}>{tx('tools.color.inputs.apply')}</Button>
                <Button
                  variant='outline'
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();

                      if (text) {
                        if (hexInputRef.current) hexInputRef.current.value = text;
                        handleHexInput(text);
                      }
                    } catch (_e) {
                      // ignore
                    }
                  }}
                >
                  {tx('tools.color.inputs.paste')}
                </Button>
              </div>
            </div>

            <div className='w-full space-y-3'>
              <div className='text-sm font-medium'>{tx('tools.color.direct.title')}</div>
              {model === 'hsl' && (
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                  <NumberField
                    label={tx('tools.color.channels.hue')}
                    value={hsl.h}
                    min={0}
                    max={360}
                    step={1}
                    onChange={(v) => setHsl((s) => ({ ...s, h: v }))}
                  />
                  <NumberField
                    label={tx('tools.color.channels.saturation')}
                    value={hsl.s}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(v) => setHsl((s) => ({ ...s, s: v }))}
                  />
                  <NumberField
                    label={tx('tools.color.channels.lightness')}
                    value={hsl.l}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(v) => setHsl((s) => ({ ...s, l: v }))}
                  />
                </div>
              )}
              {model === 'oklch' && (
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                  <NumberField
                    label={tx('tools.color.channels.luminance')}
                    value={oklch.l}
                    min={0}
                    max={1}
                    step={0.005}
                    onChange={(v) => setOklch((s) => ({ ...s, l: v }))}
                  />
                  <NumberField
                    label={tx('tools.color.channels.chroma')}
                    value={oklch.c}
                    min={0}
                    max={0.4}
                    step={0.005}
                    onChange={(v) => setOklch((s) => ({ ...s, c: v }))}
                  />
                  <NumberField
                    label={tx('tools.color.channels.hue')}
                    value={oklch.h}
                    min={0}
                    max={360}
                    step={1}
                    onChange={(v) => setOklch((s) => ({ ...s, h: v }))}
                  />
                </div>
              )}
              {model === 'rgb' && (
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                  <NumberField
                    label={tx('tools.color.channels.red')}
                    value={rgb.r}
                    min={0}
                    max={255}
                    step={1}
                    onChange={(v) => setRgb((s) => ({ ...s, r: Math.round(v) }))}
                  />
                  <NumberField
                    label={tx('tools.color.channels.green')}
                    value={rgb.g}
                    min={0}
                    max={255}
                    step={1}
                    onChange={(v) => setRgb((s) => ({ ...s, g: Math.round(v) }))}
                  />
                  <NumberField
                    label={tx('tools.color.channels.blue')}
                    value={rgb.b}
                    min={0}
                    max={255}
                    step={1}
                    onChange={(v) => setRgb((s) => ({ ...s, b: Math.round(v) }))}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className={`p-4 space-y-4 transition-colors ${textContrastClass}`} style={{ backgroundColor: asRGBA }}>
          {showOklchWarning && (
            <div className='p-3 rounded-md border border-amber-300 bg-amber-50 text-amber-900 text-sm'>
              {tx('tools.color.warnings.oklchClipped')}
            </div>
          )}
          <div className='space-y-3'>
            <FormatRow
              label={tx('tools.color.outputs.hex')}
              value={currentHex}
              onCopy={() => onCopy('hex', currentHex)}
              copied={!!copied.hex}
            />
            <FormatRow
              label={tx('tools.color.outputs.rgb')}
              value={asRGB}
              onCopy={() => onCopy('rgb', asRGB)}
              copied={!!copied.rgb}
            />
            <FormatRow
              label={tx('tools.color.outputs.rgba')}
              value={asRGBA}
              onCopy={() => onCopy('rgba', asRGBA)}
              copied={!!copied.rgba}
            />
            <FormatRow
              label={tx('tools.color.outputs.hsl')}
              value={asHSL}
              onCopy={() => onCopy('hsl', asHSL)}
              copied={!!copied.hsl}
            />
            <FormatRow
              label={tx('tools.color.outputs.oklch')}
              value={asOKLCH}
              onCopy={() => onCopy('oklch', asOKLCH)}
              copied={!!copied.oklch}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

const ChannelControl: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, onChange }) => {
  return (
    <div className='space-y-1'>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-muted-foreground'>{label}</span>
        <span className='text-xs tabular-nums'>{value.toFixed(step < 1 ? 2 : 0)}</span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className='w-full accent-primary'
      />
    </div>
  );
};

const FormatRow: React.FC<{ label: string; value: string; onCopy: () => void; copied: boolean }> = ({
  label,
  value,
  onCopy,
  copied,
}) => (
  <div className='flex items-center gap-3 p-3 rounded-lg border backdrop-blur bg-white/70 dark:bg-black/30 border-white/40 dark:border-white/20'>
    <Badge variant='secondary' className='text-xs'>
      {label}
    </Badge>
    <code className='font-mono text-sm flex-1 break-all'>{value}</code>
    <CopyButton value={value} onCopy={onCopy} copied={copied} />
  </div>
);

const NumberField: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, onChange }) => {
  return (
    <div className='space-y-1'>
      <label className='text-sm text-muted-foreground'>{label}</label>
      <Input
        type='number'
        value={Number.isFinite(value) ? value : 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const v = parseFloat(e.target.value);

          if (!Number.isNaN(v)) onChange(Math.min(Math.max(v, min), max));
        }}
      />
    </div>
  );
};
