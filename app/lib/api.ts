import { ArticlesResponse } from "../types/article";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const articlesApi = {
    async fetchArticles(source?: string, offset?: number, searchTitle?: string | null): Promise<ArticlesResponse> {
        const params = new URLSearchParams();
        if (source && source !== 'all') {
            params.append('source', source);
        }

        if (offset) {
            params.append('page_number', offset.toString());
        }

        if (searchTitle) {
            params.append('search_title', searchTitle);
        }

        const response = await fetch(`${API_BASE_URL}/articles?${params}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    },

    async triggerRefresh(): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/refresh/trigger`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to trigger refresh');
        }
    },

    async enableAutoRefresh(): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/refresh/enable`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to enable auto-refresh');
        }
    },

    async disableAutoRefresh(): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/refresh/disable`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to disable auto-refresh');
        }
    },
};