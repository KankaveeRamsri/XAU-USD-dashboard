export type MarketTrend = "Bullish" | "Bearish" | "Neutral";
export type VolatilityLevel = "Low" | "Medium" | "High" | "Extreme";
export type MarketSessionName =
  | "Sydney"
  | "Tokyo"
  | "London"
  | "New York"
  | "Overlap"
  | "Closed";

export interface MarketData {
  symbol: string;
  displayName: string;
  price: number;
  previousClose: number;
  dailyChange: number;
  dailyChangePercent: number;
  dailyHigh: number;
  dailyLow: number;
  spread: number;
  volatility: VolatilityLevel;
  currentSession: string;
  session: MarketSessionName;
  trend: MarketTrend;
  open: number;
  updatedAt: string;
}

export interface AIInsight {
  bias: "Bullish" | "Bearish" | "Neutral";
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  reasons: string[];
  suggestedAction: string;
  lastUpdated: string;
}

export interface TradeSetup {
  direction: "Long" | "Short";
  entryZone: [number, number];
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  riskReward: string;
  status: "Waiting for confirmation" | "Active" | "Completed" | "Cancelled";
}

export interface RiskCalculation {
  accountBalance: number;
  riskPercent: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  recommendedLotSize: string;
  estimatedLoss: string;
  riskRewardRatio: string;
}

export interface NewsEvent {
  id: string;
  event: string;
  time: string;
  impact: "High" | "Medium" | "Low";
  currency: string;
  forecast?: string;
  previous?: string;
}

export interface MarketSession {
  name: string;
  city: string;
  open: string;
  close: string;
  isActive: boolean;
  timezone: string;
}

export interface SupportResistanceLevel {
  resistance: number[];
  support: number[];
  currentPrice: number;
}

export interface SentimentData {
  dxy: { value: string; direction: "Strengthening" | "Weakening" | "Neutral" };
  us10Y: { value: string; direction: "Rising" | "Falling" | "Neutral" };
  goldBias: "Bullish" | "Bearish" | "Neutral";
  riskSentiment: "Risk-On" | "Risk-Off" | "Defensive";
}

export interface TradeJournalEntry {
  id: string;
  date: string;
  direction: "Long" | "Short";
  entry: number;
  exit: number;
  pnl: number;
  result: "Win" | "Loss" | "BE";
}

export interface TradeJournalSummary {
  totalTrades: number;
  winRate: number;
  netPnL: number;
  recentTrades: TradeJournalEntry[];
}
