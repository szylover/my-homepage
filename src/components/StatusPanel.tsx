import { useFetch } from '../hooks';
import type { StatusResponse } from '../types';

export default function StatusPanel() {
  const { data, loading, error } = useFetch<StatusResponse>(
    'https://monitor.lovebxy.net/api/status',
    60000
  );

  return (
    <div className="module">
      <h3 className="module-title">📡 V2Ray 状态</h3>
      {loading && !data && <div className="module-loading">检测中...</div>}
      {error && !data && <div className="module-error">⚠️ {error}</div>}
      {data && (
        <div className="status-grid">
          {data.vms.map(vm => (
            <div key={vm.name} className={`status-card ${vm.v2rayStatus === 'ok' ? 'ok' : 'down'}`}>
              <div className="status-header">
                <span>{vm.name === 'vm-hk' ? '🇭🇰' : '🇺🇸'} {vm.name}</span>
                <span className={`status-dot ${vm.v2rayStatus === 'ok' ? 'ok' : 'down'}`} />
              </div>
              <div className="status-metrics">
                <span>{vm.v2rayStatus === 'ok' ? '正常' : '离线'}</span>
                <span>{vm.responseTime >= 0 ? `${vm.responseTime}ms` : '—'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
