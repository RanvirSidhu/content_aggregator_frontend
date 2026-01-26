import { useState, useEffect, useCallback, useRef } from 'react';
import { Article } from '../types/article';
import { articlesApi } from '../lib/api';

const AUTO_REFRESH_INTERVAL = 900_000 //15 mins

export function useArticles(selectedSource: string) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [sources, setSources] = useState<string[]>(['all']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await articlesApi.fetchArticles(
                selectedSource !== 'all' ? selectedSource : undefined
            );

            setArticles(data.articles);
            setSources(['all', ...data.unique_sources]);
            setLastUpdate(new Date());
        } catch (err) {
            setError(
                'Failed to fetch articles. Make sure the FastAPI server is running on http://localhost:8000'
            );
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [selectedSource]);

    const refresh = useCallback(async () => {
        try {
            await articlesApi.triggerRefresh();
            // Wait for backend to process
            setTimeout(() => {
                fetchArticles();
            }, 1000);
        } catch (err) {
            console.error('Error triggering refresh:', err);
            fetchArticles(); // Fallback
        }
    }, [fetchArticles]);

    const toggleAutoRefresh = async (checked: boolean) => {
        setAutoRefresh(checked);

        try {
            if (checked) {
                await articlesApi.enableAutoRefresh();
            } else {
                await articlesApi.disableAutoRefresh();
            }
            console.log(`Auto-refresh ${checked ? 'enabled' : 'disabled'}`);
        } catch (err) {
            console.error('Error toggling auto-refresh:', err);
        }
    };

    // Automatically fetch articles from the backend every 15 mins if auto-refresh is enabled.
    useEffect(() => {
        if (!autoRefresh) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            fetchArticles();
        }, AUTO_REFRESH_INTERVAL);

    }, [autoRefresh]);

    useEffect(() => {
        fetchArticles();
    }, []);

    return {
        articles,
        sources,
        loading,
        error,
        lastUpdate,
        autoRefresh,
        toggleAutoRefresh,
        refresh,
    };
}