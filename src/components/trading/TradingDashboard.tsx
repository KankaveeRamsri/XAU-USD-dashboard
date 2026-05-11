import { MarketOverview } from "./MarketOverview";
import { MainChartPanel } from "./MainChartPanel";
import { AIInsightPanel } from "./AIInsightPanel";
import { TradeSetupCard } from "./TradeSetupCard";
import { RiskCalculator } from "./RiskCalculator";
import { NewsPanel } from "./NewsPanel";
import { SessionPanel } from "./SessionPanel";
import { SupportResistancePanel } from "./SupportResistancePanel";
import { SentimentPanel } from "./SentimentPanel";
import { TradeJournalPanel } from "./TradeJournalPanel";
import {
  mockMarketData,
  mockAIInsight,
  mockTradeSetup,
  mockNewsEvents,
  mockMarketSessions,
  mockSupportResistance,
  mockSentiment,
  mockTradeJournal,
} from "@/lib/trading/mock-data";

export function TradingDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-card-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
              <span className="text-sm font-bold text-gold">Au</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">
                XAUUSD Dashboard
              </h1>
              <p className="text-[10px] text-muted">
                Gold Trading Intelligence
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 rounded-full bg-bullish-bg px-2.5 py-1 sm:flex">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-bullish" />
              <span className="text-[10px] font-medium text-bullish">
                Market Open
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-muted/10 px-2.5 py-1">
              <span className="text-[10px] text-muted">Phase 0</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-4 p-4 lg:p-6">
        {/* Top: Market Overview */}
        <MarketOverview data={mockMarketData} />

        {/* Main Grid: Chart + Sidebar */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
          {/* Chart */}
          <MainChartPanel />

          {/* Right Sidebar */}
          <div className="space-y-4">
            <AIInsightPanel data={mockAIInsight} />
            <TradeSetupCard data={mockTradeSetup} />
            <RiskCalculator />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <SupportResistancePanel data={mockSupportResistance} />
          <NewsPanel events={mockNewsEvents} />
          <SessionPanel sessions={mockMarketSessions} />
          <SentimentPanel data={mockSentiment} />
          <TradeJournalPanel data={mockTradeJournal} />
        </div>

        {/* Risk Disclaimer */}
        <footer className="pb-6 pt-2 text-center">
          <p className="text-[11px] leading-relaxed text-muted/60">
            Trading involves risk. This dashboard is for analysis and planning
            only, not financial advice.
          </p>
        </footer>
      </main>
    </div>
  );
}
