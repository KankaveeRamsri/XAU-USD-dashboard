import type {
  MarketData,
  AIInsight,
  TradeSetup,
  RiskCalculation,
  NewsEvent,
  MarketSession,
  SupportResistanceLevel,
  SentimentData,
  TradeJournalSummary,
} from "./types";

export const mockMarketData: MarketData = {
  symbol: "XAUUSD",
  displayName: "Gold / US Dollar",
  price: 2365.42,
  previousClose: 2346.18,
  dailyChange: 19.24,
  dailyChangePercent: 0.82,
  dailyHigh: 2372.8,
  dailyLow: 2348.1,
  spread: 28,
  volatility: "High",
  currentSession: "London / New York Overlap",
  session: "Overlap",
  trend: "Bullish",
  open: 2346.18,
  updatedAt: new Date().toISOString(),
};

export function getMockXauusdMarketData(): MarketData {
  return {
    ...mockMarketData,
    updatedAt: new Date().toISOString(),
  };
}

export const mockAIInsight: AIInsight = {
  bias: "Bullish",
  confidence: 74,
  riskLevel: "Medium",
  reasons: [
    "DXY weakening below key 104.20 support level",
    "US 10Y yields declining, supporting gold appeal",
    "Price holding above 2360 support with strong volume",
    "Geopolitical tensions driving safe-haven demand",
  ],
  suggestedAction:
    "Wait for confirmation above 2370 before entering long. Avoid overtrading ahead of FOMC minutes release.",
  lastUpdated: "2 minutes ago",
};

export const mockTradeSetup: TradeSetup = {
  direction: "Long",
  entryZone: [2362, 2366],
  stopLoss: 2352,
  takeProfit1: 2380,
  takeProfit2: 2395,
  riskReward: "1:2.8",
  status: "Waiting for confirmation",
};

export const mockRiskCalculation: RiskCalculation = {
  accountBalance: 10000,
  riskPercent: 1,
  entryPrice: 2365,
  stopLoss: 2355,
  takeProfit: 2390,
  recommendedLotSize: "0.35",
  estimatedLoss: "$100.00",
  riskRewardRatio: "1:2.5",
};

export const mockNewsEvents: NewsEvent[] = [
  {
    id: "1",
    event: "CPI (YoY)",
    time: "14:30 UTC",
    impact: "High",
    currency: "USD",
    forecast: "3.4%",
    previous: "3.5%",
  },
  {
    id: "2",
    event: "FOMC Speech",
    time: "17:00 UTC",
    impact: "High",
    currency: "USD",
  },
  {
    id: "3",
    event: "Non-Farm Payrolls",
    time: "12:30 UTC",
    impact: "High",
    currency: "USD",
    forecast: "180K",
    previous: "175K",
  },
  {
    id: "4",
    event: "Unemployment Claims",
    time: "13:30 UTC",
    impact: "Medium",
    currency: "USD",
    forecast: "220K",
    previous: "215K",
  },
  {
    id: "5",
    event: "ISM Manufacturing PMI",
    time: "15:00 UTC",
    impact: "Medium",
    currency: "USD",
    forecast: "49.8",
    previous: "49.2",
  },
];

export const mockMarketSessions: MarketSession[] = [
  {
    name: "Sydney",
    city: "Sydney",
    open: "22:00 UTC",
    close: "07:00 UTC",
    isActive: false,
    timezone: "AEST",
  },
  {
    name: "Tokyo",
    city: "Tokyo",
    open: "00:00 UTC",
    close: "09:00 UTC",
    isActive: false,
    timezone: "JST",
  },
  {
    name: "London",
    city: "London",
    open: "08:00 UTC",
    close: "17:00 UTC",
    isActive: true,
    timezone: "GMT",
  },
  {
    name: "New York",
    city: "New York",
    open: "13:00 UTC",
    close: "22:00 UTC",
    isActive: true,
    timezone: "EST",
  },
];

export const mockSupportResistance: SupportResistanceLevel = {
  resistance: [2370, 2385, 2400],
  support: [2355, 2342, 2328],
  currentPrice: 2365.42,
};

export const mockSentiment: SentimentData = {
  dxy: { value: "104.12", direction: "Weakening" },
  us10Y: { value: "4.28%", direction: "Falling" },
  goldBias: "Bullish",
  riskSentiment: "Defensive",
};

export const mockTradeJournal: TradeJournalSummary = {
  totalTrades: 8,
  winRate: 62.5,
  netPnL: 342.5,
  recentTrades: [
    {
      id: "1",
      date: "Today",
      direction: "Long",
      entry: 2358.2,
      exit: 2372.5,
      pnl: 142.5,
      result: "Win",
    },
    {
      id: "2",
      date: "Today",
      direction: "Short",
      entry: 2370.0,
      exit: 2365.8,
      pnl: 42.0,
      result: "Win",
    },
    {
      id: "3",
      date: "Today",
      direction: "Long",
      entry: 2368.5,
      exit: 2362.0,
      pnl: -65.0,
      result: "Loss",
    },
    {
      id: "4",
      date: "Yesterday",
      direction: "Long",
      entry: 2345.0,
      exit: 2360.0,
      pnl: 150.0,
      result: "Win",
    },
  ],
};
