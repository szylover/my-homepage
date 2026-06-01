import { useState } from 'react';
import { useLocalStorage } from '../hooks';

export default function NotePad() {
  const [content, setContent] = useLocalStorage('dashboard-notes', '');
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="module">
      <h3 className="module-title">
        📓 记事本
        <button className="module-action" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '展开' : '收起'}
        </button>
      </h3>
      {!collapsed && (
        <textarea
          className="notepad-textarea"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="随手记点什么..."
          rows={8}
        />
      )}
      {collapsed && content && (
        <div className="notepad-preview" onClick={() => setCollapsed(false)}>
          {content.slice(0, 100)}{content.length > 100 ? '...' : ''}
        </div>
      )}
    </div>
  );
}
