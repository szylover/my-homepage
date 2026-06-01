import { useState, useEffect, useRef } from 'react';

const engines = [
  { name: 'Google', prefix: 'https://www.google.com/search?q=' },
  { name: 'GitHub', prefix: 'https://github.com/search?q=' },
  { name: '百度', prefix: 'https://www.baidu.com/s?wd=' },
  { name: 'Stack Overflow', prefix: 'https://stackoverflow.com/search?q=' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [engineIdx, setEngineIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.open(engines[engineIdx].prefix + encodeURIComponent(query.trim()), '_blank');
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <select
        className="search-engine"
        value={engineIdx}
        onChange={e => setEngineIdx(Number(e.target.value))}
      >
        {engines.map((eng, i) => (
          <option key={eng.name} value={i}>{eng.name}</option>
        ))}
      </select>
      <input
        ref={inputRef}
        className="search-input"
        type="text"
        placeholder='搜索... (按 "/" 聚焦)'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="search-btn" type="submit">🔍</button>
    </form>
  );
}
