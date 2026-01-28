import { ExternalLink } from 'lucide-react';
import { Article } from '../types/article';

interface ArticleCardProps {
    article: Article;
}

function formatTimeAgo(date: string): string {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

function truncateTitle(title: string, maxLength: number = 100): string {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="bg-gradient-to-br from-slate-100 to-slate-100 rounded-lg border-4 shadow-md hover:shadow-xl transition-shadow p-5">
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
                            {truncateTitle(article.title)}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </h2>

                    <div className="text-xs text-slate-500">
                        By {article.author || 'Unknown'}
                    </div>
                </div>
            </div>
        </article>
    );
}