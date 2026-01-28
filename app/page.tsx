"use client";

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { ErrorAlert } from './components/ErrorAlert';
import { ArticlesList } from './components/ArticlesList';
import { useArticles } from './hooks/useArticles';
import Pagination from './components/Pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Home() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlPageNo = searchParams.get("page");
  const urlSource = searchParams.get("source");
  const urlSearchTitle = searchParams.get("search_title");

  const [selectedSource, setSelectedSource] = useState(urlSource ? urlSource : "all");
  const [currentPage, setPageChange] = useState(urlPageNo ? +urlPageNo : 1);
  const [searchTitle, setSearchTitle] = useState<string | undefined>(urlSearchTitle ? urlSearchTitle : undefined);

  const {
    articles,
    sources,
    loading,
    error,
    lastUpdate,
    totalEntries,
    autoRefresh,
    toggleAutoRefresh,
    refresh,
  } = useArticles(selectedSource, currentPage, searchTitle);

  const changeSourceFilter = (source: string) => {
    setPageChange(1);
    setSelectedSource(source);
    const params = new URLSearchParams(searchParams);
    if (source && source != "all") {
      params.set('source', source);
    } else {
      params.delete('source');
    }
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  const changePage = (newPage: number) => {
    setPageChange(newPage)
    const params = new URLSearchParams(searchParams);
    if (newPage && newPage != 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const changeSearchTitle = useDebouncedCallback((title: string) => {
    setPageChange(1);
    console.log(title);
    setSearchTitle(title);

    const params = new URLSearchParams(searchParams);
    if (title) {
      params.set('search_title', title);
    } else {
      params.delete('search_title');
    }
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        <Header
          loading={loading}
          lastUpdate={lastUpdate}
          articlesCount={totalEntries}
          autoRefresh={autoRefresh}
          onRefresh={refresh}
          onAutoRefreshChange={toggleAutoRefresh}
        />

        <FilterPanel
          sources={sources}
          selectedSource={selectedSource}
          placeholder={searchTitle}
          onSourceChange={changeSourceFilter}
          onSearchChange={changeSearchTitle}
        />

        {error && <ErrorAlert error={error} />}
        <div className='bg-white rounded-lg shadow-md pt-6 px-6 mb-6'>
          <ArticlesList articles={articles} loading={loading} />
          <Pagination currentPage={currentPage} totalEntries={totalEntries} onPageChange={changePage} />
        </div>
      </div>
    </div>
  );
}