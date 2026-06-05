import type { AppItem } from '../types';

const apps: AppItem[] = [
  { name: '健身打卡', emoji: '💪', url: 'https://jianshen.lovebxy.net', description: '记录每日健身和健康数据', domain: 'jianshen.lovebxy.net', badge: 'health-checkin' },
  { name: '今天吃什么', emoji: '🍜', url: 'https://eat-what.lovebxy.net', description: '选择困难症救星', domain: 'eat-what.lovebxy.net', badge: 'eat-what' },
  { name: '在线阅读器', emoji: '📚', url: 'https://books.lovebxy.net', description: '网页端电子书阅读器', domain: 'books.lovebxy.net', badge: 'web-reader' },
  { name: 'Love BXY', emoji: '❤️', url: 'https://victorious-glacier-02d938f10.3.azurestaticapps.net', description: '专属小应用', domain: 'love-bxy-app', badge: 'love-bxy-app' },
  { name: '修仙游戏', emoji: '⚔️', url: 'https://xiuxian.lovebxy.net', description: '文字修仙冒险游戏', domain: 'xiuxian.lovebxy.net', badge: 'xiuxian-game' },
  { name: 'VM 监控', emoji: '📡', url: 'https://monitor.lovebxy.net', description: '虚拟机和 V2Ray 状态', domain: 'monitor.lovebxy.net', badge: 'vm-monitor' },
  { name: '麻雀訓練', emoji: '🀄', url: 'https://mahjong.lovebxy.net', description: '何切问题训练器', domain: 'mahjong.lovebxy.net', badge: 'mahjong-trainer' },
  { name: '资源下载', emoji: '📦', url: 'https://szydownloads.z7.web.core.windows.net/', description: '教材PDF与工具下载', domain: 'szydownloads', badge: 'downloads' },
];

export default function AppGrid() {
  return (
    <div className="module">
      <h3 className="module-title">🚀 应用导航</h3>
      <div className="app-grid">
        {apps.map(app => (
          <a key={app.badge} className="app-card" href={app.url} target="_blank" rel="noopener noreferrer">
            <span className="app-emoji">{app.emoji}</span>
            <div className="app-info">
              <span className="app-name">{app.name}</span>
              <span className="app-domain">{app.domain}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
