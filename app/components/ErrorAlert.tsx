import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
    error: string;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
                <div className="font-semibold mb-1">Connection Error</div>
                <div className="text-sm">{error}</div>
                <div className="text-xs mt-2">
                    Run: <code className="bg-red-100 px-1 rounded">python main.py</code>
                </div>
            </div>
        </div>
    );
}

// ============= components/LoadingSpinner.tsx =============
import { RefreshCw } from 'lucide-react';

export function LoadingSpinner() {
    return (
        <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading articles from backend...</p>
        </div>
    );
}