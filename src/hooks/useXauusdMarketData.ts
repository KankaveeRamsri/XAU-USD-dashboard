"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { MarketData } from "@/lib/trading/types";
import { getMockXauusdMarketData } from "@/lib/trading/mock-data";

interface UseXauusdMarketDataReturn {
  data: MarketData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refreshMarketData: () => void;
}

const INITIAL_LOAD_MS = 600;
const REFRESH_MS = 1000;

export function useXauusdMarketData(): UseXauusdMarketDataReturn {
  const [data, setData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleFetch = useCallback((delayMs: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        const marketData = getMockXauusdMarketData();
        setData(marketData);
        setLastUpdated(marketData.updatedAt);
        setError(null);
      } catch {
        setError("Failed to load market data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, delayMs);
  }, []);

  useEffect(() => {
    scheduleFetch(INITIAL_LOAD_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scheduleFetch]);

  const refreshMarketData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    scheduleFetch(REFRESH_MS);
  }, [scheduleFetch]);

  return { data, isLoading, error, lastUpdated, refreshMarketData };
}
