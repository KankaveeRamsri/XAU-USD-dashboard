"use client";

import { useState, useCallback, useEffect } from "react";
import type { MarketData } from "@/lib/trading/types";
import { getMockXauusdMarketData } from "@/lib/trading/mock-data";

interface UseXauusdMarketDataReturn {
  data: MarketData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refreshMarketData: () => void;
}

const REFRESH_COOLDOWN_MS = 1000;

export function useXauusdMarketData(): UseXauusdMarketDataReturn {
  const [data, setData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    // Simulate async fetch — replace with real API call later
    const timer = setTimeout(() => {
      try {
        const marketData = getMockXauusdMarketData();
        setData(marketData);
        setLastUpdated(marketData.updatedAt);
      } catch {
        setError("Failed to load market data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cleanup = loadData();
    return cleanup;
  }, [loadData]);

  const refreshMarketData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const marketData = getMockXauusdMarketData();
        setData(marketData);
        setLastUpdated(marketData.updatedAt);
      } catch {
        setError("Failed to refresh market data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, REFRESH_COOLDOWN_MS);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error, lastUpdated, refreshMarketData };
}
