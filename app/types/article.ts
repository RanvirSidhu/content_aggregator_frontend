export interface Article {
    id: string;
    title: string;
    author: string | null;
    url: string;
    source_id: string;
    publish_date: string;
    source: string;
}

export interface ArticlesResponse {
    articles: Article[];
    unique_sources: string[];
    last_update: string;
}