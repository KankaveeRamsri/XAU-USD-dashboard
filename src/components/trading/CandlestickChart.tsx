"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type DeepPartial,
  type ChartOptions,
  type CandlestickSeriesOptions,
  ColorType,
  CrosshairMode,
} from "lightweight-charts";
import type { OhlcCandle } from "@/lib/trading/types";

interface CandlestickChartProps {
  candles: OhlcCandle[];
  className?: string;
}

const CHART_OPTIONS: DeepPartial<ChartOptions> = {
  layout: {
    background: { type: ColorType.Solid, color: "#18181b" },
    textColor: "#71717a",
    fontFamily: "'Geist Mono', monospace",
    fontSize: 11,
  },
  grid: {
    vertLines: { color: "rgba(255,255,255,0.04)" },
    horzLines: { color: "rgba(255,255,255,0.04)" },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
    vertLine: {
      color: "rgba(212,160,23,0.3)",
      labelBackgroundColor: "#d4a017",
    },
    horzLine: {
      color: "rgba(212,160,23,0.3)",
      labelBackgroundColor: "#d4a017",
    },
  },
  rightPriceScale: {
    borderColor: "rgba(255,255,255,0.06)",
    scaleMargins: { top: 0.1, bottom: 0.2 },
  },
  timeScale: {
    borderColor: "rgba(255,255,255,0.06)",
    timeVisible: true,
    secondsVisible: false,
  },
  handleScroll: { vertTouchDrag: false },
};

const SERIES_OPTIONS: DeepPartial<CandlestickSeriesOptions> = {
  upColor: "#22c55e",
  downColor: "#ef4444",
  borderUpColor: "#22c55e",
  borderDownColor: "#ef4444",
  wickUpColor: "#22c55e",
  wickDownColor: "#ef4444",
};

function toChartData(candles: OhlcCandle[]): CandlestickData[] {
  return candles.map((c) => {
    const time = c.time.includes("-")
      ? c.time
      : (parseInt(c.time, 10) as unknown as string);
    return {
      time: time as unknown as CandlestickData["time"],
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    };
  });
}

export function CandlestickChart({ candles, className }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  // Create chart instance once
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      ...CHART_OPTIONS,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    const series = chart.addSeries(CandlestickSeries, SERIES_OPTIONS);
    chartRef.current = chart;
    seriesRef.current = series;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          chart.applyOptions({ width, height });
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // Update data when candles change
  useEffect(() => {
    if (!seriesRef.current || candles.length === 0) return;

    const data = toChartData(candles);
    seriesRef.current.setData(data);

    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [candles]);

  return (
    <div
      ref={containerRef}
      className={className ?? "h-full w-full"}
    />
  );
}
