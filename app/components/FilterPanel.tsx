import { Filter } from 'lucide-react';

interface FilterPanelProps {
    sources: string[];
    selectedSource: string;
    placeholder: string | null;
    onSourceChange: (source: string) => void;
    onSearchChange: (e: string) => void;
}

export function FilterPanel({
    sources,
    selectedSource,
    placeholder,
    onSourceChange,
    onSearchChange,
}: FilterPanelProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="font-semibold text-slate-700">Filters</span>
            </div>

            <div className="flex flex-wrap gap-4">
                <div>
                    <label className="block text-sm text-slate-600 mb-1">Source</label>
                    <select
                        value={selectedSource}
                        onChange={(e) => onSourceChange(e.target.value)}
                        className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600"
                    >
                        {sources.map((source) => (
                            <option key={source} value={source}>
                                {source === 'all' ? 'All Sources' : source}
                            </option>
                        ))}
                    </select>
                </div>
                <form>
                    <label className='block text-sm text-slate-600 mb-1'>Search</label>
                    <input type='text' className='border border-slate-300 rounded px-3 py-1 text-sm text-slate-600' placeholder={placeholder} onChange={(e) => { onSearchChange(e.target.value) }} />
                </form>
            </div>
        </div>
    );
}