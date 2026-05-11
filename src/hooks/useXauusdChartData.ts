"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { OhlcCandle, Timeframe } from "@/lib/trading/types";
import { getMockXauusdCandles } from "@/lib/trading/mock-chart-data";

interface UseXauusdChartDataReturn {
  candles: OhlcCandle[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refreshChartData: () => void;
}

const LOAD_DELAY_MS = 400;

export function useXauusdChartData(
  timeframe: Timeframe
): UseXauusdChartDataReturn {
  const [candles, setCandles] = useState<OhlcCandle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleFetch = useCallback(
    (delayMs: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        try {
          const data = getMockXauusdCandles(timeframe);
          setCandles(data);
          setLastUpdated(new Date().toISOString());
          setError(null);
        } catch {
          setError("Failed to load chart data. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }, delayMs);
    },
    [timeframe]
  );

  useEffect(() => {
    scheduleFetch(LOAD_DELAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scheduleFetch]);

  const refreshChartData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    scheduleFetch(LOAD_DELAY_MS);
  }, [scheduleFetch]);

  return { candles, isLoading, error, lastUpdated, refreshChartData };
}
