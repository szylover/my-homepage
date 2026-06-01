import { useFetch } from '../hooks';
import type { RssItem } from '../types';

export default function RssFeed() {
  const { data, loading, error, refetch } = useFetch<{ items: RssItem[] }>('/api/rss', 300000);

  return (
    <div className="module">
      <h3 className="module-title">
        📰 新闻
        <button className="module-action" onClick={refetch}>🔄</button>
      </h3>
      {loading && !data && <div className="module-loading">加载中...</div>}
      {error && !data && <div className="module-error">⚠️ RSS 加载失败</div>}
      {data?.items && (
        <ul className="rss-list">
          {data.items.slice(0, 15).map((item, i) => (
            <li key={i} className="rss-item">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <span className="rss-source">{item.source}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
