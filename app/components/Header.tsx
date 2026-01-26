import { TrendingUp, RefreshCw, Clock } from 'lucide-react';

interface HeaderProps {
    loading: boolean;
    lastUpdate: Date | null;
    articlesCount: number;
    autoRefresh: boolean;
    onRefresh: () => void;
    onAutoRefreshChange: (checked: boolean) => void;
}

export function Header({
    loading,
    lastUpdate,
    articlesCount,
    autoRefresh,
    onRefresh,
    onAutoRefreshChange,
}: HeaderProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                        Tech News Aggregator
                    </h1>
                </div>
                <button
                    onClick={onRefresh}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600 border-t pt-4">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last update: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
                    </span>
                    <span className="font-semibold">{articlesCount} articles</span>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={autoRefresh}
                        onChange={(e) => onAutoRefreshChange(e.target.checked)}
                        className="w-4 h-4"
                    />
                    Auto-refresh (15m)
                </label>
            </div>
        </div>
    );
}