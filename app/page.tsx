"use client"

import { TrendingUp, RefreshCw, Clock, Filter, ExternalLink, AlertCircle } from 'lucide-react';
import { useEffect, useState } from "react";

const API_BASE_URL = 'http://localhost:8000/api';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedSource, setSelectedSource] = useState('all');
  const [sources, setSources] = useState(['all']);
  const [error, setError] = useState<string | null>(null)

  const fetchArticles = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (selectedSource != "all") {
        params.append('source', selectedSource);
      }

      const response = await fetch(`${API_BASE_URL}/articles?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setArticles(data.articles);
      setSources(["all", ...data.unique_sources]);
      setLastUpdate(new Date(data.last_update));

    } catch (err) {
      setError('Failed to fetch articles. Make sure the FastAPI server is running on http://localhost:8000');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualRefresh = async () => {
    try {
      // Trigger backend refresh
      await fetch(`${API_BASE_URL}/refresh/trigger`, { method: 'POST' });

      // Wait a bit for backend to process
      setTimeout(() => {
        fetchArticles();
      }, 1000);
    } catch (err) {
      console.error('Error triggering refresh:', err);
      fetchArticles(); // Fallback to regular fetch
    }
  };

  const changeAutoRefresh = async (event) => {
    const checked = event.target.checked;
    console.log("Checked:", checked);
    setAutoRefresh(checked)
    if (checked) {
      try {
        const response = await fetch(`${API_BASE_URL}/refresh/enable`, { method: 'POST' });
        const data = await response.json();

        console.log(data)
      } catch (err) {
        console.error('Error enabling refresh:', err);
      }
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/refresh/disable`, { method: 'POST' });
        const data = await response.json();

        console.log(data)
      } catch (err) {
        console.error('Error enabling refresh:', err);
      }
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);


  useEffect(() => {
    if (!loading) {
      fetchArticles();
    }
  }, [selectedSource]);

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                Tech News Aggregator
              </h1>
            </div>
            <button
              onClick={handleManualRefresh}
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
              <span className="font-semibold">{articles.length} articles</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={changeAutoRefresh}
                className="w-4 h-4"
              />
              Auto-refresh (60s)
            </label>
          </div>
        </div>

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
                onChange={(e) => setSelectedSource(e.target.value)}
                className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600"
              >
                {sources.map(source => (
                  <option key={source} value={source}>
                    {source === 'all' ? 'All Sources' : source}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Connection Error</div>
              <div className="text-sm">{error}</div>
              <div className="text-xs mt-2">Run: <code className="bg-red-100 px-1 rounded">python main.py</code></div>
            </div>
          </div>
        )}

        {loading && articles.length === 0 ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading articles from backend...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map(article => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {article.source}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatTimeAgo(article.publish_date)}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 flex items-center gap-2 group"
                      >
                        {article.title.length < 100 ? article.title : article.title.substring(0, 100) + "..."}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </h2>

                    <div className="text-xs text-slate-500">
                      By {article.author}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}