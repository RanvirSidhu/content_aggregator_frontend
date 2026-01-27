# 📰 Tech News Aggregator - Frontend

A modern, responsive Next.js application for browsing aggregated tech news from multiple sources with real-time updates and filtering capabilities.
Deployed using vercel: https://content-aggregator-frontend.vercel.app/

## Features

- **Real-time Updates** - Display articles from FastAPI backend
- **Source Filtering** - Filter articles by source (Dev.to, Reddit, Lobsters)
- **Manual Refresh** - Trigger on-demand article updates
- **Auto-refresh Toggle** - Enable/disable automatic background refresh

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** or **Bun 1.0+**
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository** (or navigate to frontend directory)

```bash
cd content_aggregator_frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configure API URL**

Update the API base URL in `lib/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8000/api';
// For production: 'https://api.yourdomain.com/api'
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔌 API Layer

### `lib/api.ts`
**API Client Functions**
**Functions:**

```typescript
articlesApi.fetchArticles(source?: string)
// GET /api/articles?source={source}
// Returns: ArticlesResponse

articlesApi.triggerRefresh()
// POST /api/refresh/trigger
// Returns: void

articlesApi.enableAutoRefresh()
// POST /api/refresh/enable
// Returns: void

articlesApi.disableAutoRefresh()
// POST /api/refresh/disable
// Returns: void
```

---

## 🎨 Styling

### Tailwind CSS

This project uses **Tailwind CSS** for styling with a utility-first approach.
---

## 🔧 Configuration

### Environment Variables

Create `.env.local` for environment-specific configuration:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```










