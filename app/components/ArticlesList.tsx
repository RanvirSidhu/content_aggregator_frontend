import { Article } from '../types/article';
import { ArticleCard } from './ArticleCard';
import { RefreshCw } from 'lucide-react';

interface ArticlesListProps {
    articles: Article[];
    loading: boolean;
}

export function ArticlesList({ articles, loading }: ArticlesListProps) {
    if (loading && articles.length === 0) {
        return (<div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading articles from backend...</p>
        </div>);
    }

    if (articles.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-slate-600">No articles found.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}