"use client";

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { ErrorAlert } from './components/ErrorAlert';
import { ArticlesList } from './components/ArticlesList';
import { useArticles } from './hooks/useArticles';


export default function Home() {
  const [selectedSource, setSelectedSource] = useState('all');

  const {
    articles,
    sources,
    loading,
    error,
    lastUpdate,
    autoRefresh,
    toggleAutoRefresh,
    refresh,
  } = useArticles(selectedSource);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        <Header
          loading={loading}
          lastUpdate={lastUpdate}
          articlesCount={articles.length}
          autoRefresh={autoRefresh}
          onRefresh={refresh}
          onAutoRefreshChange={toggleAutoRefresh}
        />

        <FilterPanel
          sources={sources}
          selectedSource={selectedSource}
          onSourceChange={setSelectedSource}
        />

        {error && <ErrorAlert error={error} />}

        <ArticlesList articles={articles} loading={loading} />
      </div>
    </div>
  );
}