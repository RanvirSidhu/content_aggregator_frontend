import { ArticlesResponse } from "../types/article";

const API_BASE_URL = 'http://localhost:8000/api';

export const articlesApi = {
    async fetchArticles(source?: string): Promise<ArticlesResponse> {
        const params = new URLSearchParams();
        if (source && source !== 'all') {
            params.append('source', source);
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