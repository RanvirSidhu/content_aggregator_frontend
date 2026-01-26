import { TrendingUp, RefreshCw, Clock, Filter, ExternalLink } from 'lucide-react';

let sources = ['all']
let categories = ['all']
let loading = false


let articles = [
  { 'id': 'cdc54fa2404c78ffda9831d521592c3f', 'title': 'Accelerating AI Innovation with the AWS Cloud Adoption Framework', 'author': 'olawde', 'url': 'https://dev.to/aws-builders/accelerating-ai-innovation-with-the-aws-cloud-adoption-framework-28hk', 'source_id': '3177658', 'publish_date': '2026-01-16T20:33:16+00:00', 'source': 'DEVTO' },
  { 'id': 'bd8e42b7e37e74ac96b634f426aa1256', 'title': 'I got tired of manual priority weights in proxies so I used a Reverse Radix Tree instead', 'author': 'robbiedobbie', 'url': 'https://getlode.app/blog/2026-01-25-stop-playing-priority-tetris', 'source_id': '1qmhw95', 'publish_date': '2026-01-25T12:30:56+00:00', 'source': 'REDDIT' },
  { 'id': '3ed1413db8bb190933d4e5b99e04f506', 'title': 'Built a small cooking game to practice chaos-driven design', 'author': 'TerryC_IndieGameDev', 'url': 'https://introvertedgames.itch.io/kitchen-havoc', 'source_id': '1qmjsou', 'publish_date': '2026-01-25T13:58:34+00:00', 'source': 'REDDIT' },
  { 'id': '8358c8b1a1740559de5b264763b39d79', 'title': 'Been following the metadata management space for work reasons and came across an interesting design problem that Apache Gravitino tried to solve in their 1.1 release.  \n\nThe problem: we have like 5+ different table formats now (Iceberg, Delta Lake, Hive, Hudi, now Lance for vectors) and each has its', 'author': 'Agitated_Fox2640', 'url': 'https://github.com/apache/gravitino/releases/tag/v1.1.0', 'source_id': '1qmkv8f', 'publish_date': '2026-01-25T14:42:31+00:00', 'source': 'REDDIT' },
  { 'id': '6703a3a3ecbada679867a6ff8c2680b2', 'title': 'Do you have any strategy before applying to a job or internship?', 'author': 'davygamer18', 'url': 'https://github.com/webwithdev', 'source_id': '1qmkg0v', 'publish_date': '2026-01-25T14:25:18+00:00', 'source': 'REDDIT' }
]

export default function Home() {
  let lastUpdate = null
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
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4`} />
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
              <select className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600">
                {sources.map(source => (
                  <option key={source} value={source}>
                    {source === 'all' ? 'All Sources' : source}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Category</label>
              <select className="border border-slate-300 rounded px-3 py-1.5 text-slate-600 text-sm">
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
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
                        {article.publish_date}
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
