import { useState } from 'react';

interface Project {
  emoji: string;
  title: string;
  date: string;
  points: string[];
}

const projects: Project[] = [
  {
    emoji: '🔸',
    title: 'Image Upload Consent 系统',
    date: '2026.05',
    points: [
      '为 MSA 用户设计完整图片上传 Notice & Consent 流程，覆盖 Gallery、Camera、Image Edit 三条路径',
      '基于 Jetpack Compose 构建 ImageUploadConsentDialog，支持多语言、横屏适配',
      '设计 rememberImageUploadConsentCheck composable hook，实现声明式 consent 拦截',
    ],
  },
  {
    emoji: '🔸',
    title: 'FluxV4 StreamHub 合规性迁移',
    date: '2026.06',
    points: [
      '为 StreamHub WebSocket 连接传入合规 HttpClient，确保 SSL Pinning、DLP、审计日志等安全拦截器生效',
      '设计 RoutingChatServiceFactory 路由架构：agent 请求走 SydneyChatService，非 agent 走 StreamHubChatService',
      '消除裸 OkHttpClient() 创建的安全合规隐患',
    ],
  },
  {
    emoji: '🔸',
    title: 'Quote Selected Content 结构化注解',
    date: '2026.03 – 04',
    points: [
      '实现 quote 引用内容作为结构化 message annotation 传递给 Sydney 服务端',
      '设计 QuoteEmbedContext 数据类，解耦 quote 逻辑与 SydneyChatService',
      '引入 enableQuoteAsSelectedContext Feature Gate，支持渐进式灰度上线',
    ],
  },
  {
    emoji: '🔸',
    title: 'My Tasks 功能',
    date: '2026.05',
    points: [
      '在 Copilot Menu 中新增 My Tasks 模块，实现任务卡片展示、置顶、删除、长按菜单等交互',
      '对接真实 API schema，实现 ViewModel 状态管理与 scheduled/NeedInput 等任务状态展示',
    ],
  },
  {
    emoji: '🔸',
    title: 'Mini Chat 底部面板优化',
    date: '2026.05',
    points: [
      '实现 dockOnKeyboardOpenInHalf 功能：半屏模式下键盘弹出时自动切换到 shy 状态',
      '修复键盘在特定状态下不显示的 bug，优化 MiniChatNonModalBottomSheet 的重组性能',
    ],
  },
  {
    emoji: '🔸',
    title: 'Temporary Chat Voice Warmup Bug 修复',
    date: '2026.06',
    points: [
      '定位并修复 EarlyConnectUseCase 在 Private Mode 下仍执行 voice warmup 的 bug',
      '重构 reset()/softReset() 方法签名，确保状态在 flow 变化前原子设置',
    ],
  },
  {
    emoji: '🔸',
    title: '安全合规与企业策略',
    date: '2025',
    points: [
      '实现 Intune 策略检查：在图片下载前校验企业管控策略',
      '修复 Free 用户图片上传数量限制绕过问题',
    ],
  },
];

const skills = [
  { label: '语言', value: 'Kotlin, Java, Rust, Python' },
  { label: 'Android', value: 'Jetpack Compose, Coroutines/Flow, Dagger/Hilt, OkHttp, Room, MD3' },
  { label: '架构', value: 'MVVM, Clean Architecture, 响应式编程, 依赖注入, SDK 设计' },
  { label: '网络', value: 'WebSocket, HTTP/2, SSL Pinning, OkHttp Interceptor' },
  { label: '安全合规', value: 'DLP, Intune MDM, 审计日志' },
  { label: '领域', value: 'AI 聊天客户端, 实时音频, 大型 Monorepo, 跨平台对齐' },
];

export default function Resume() {
  const [expanded, setExpanded] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const toggleProject = (idx: number) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="module resume-module">
      <div className="module-title">
        <span>📄 Resume</span>
        <button className="module-action" onClick={() => setExpanded(e => !e)}>
          {expanded ? '收起' : '展开'}
        </button>
      </div>

      {/* Header card — always visible */}
      <div className="resume-header">
        <div className="resume-avatar">邵</div>
        <div className="resume-intro">
          <h2 className="resume-name">邵正悦 <span className="resume-name-en">Zhengyue Shao</span></h2>
          <p className="resume-role">Software Engineer · Microsoft</p>
          <p className="resume-summary">
            资深 Android 工程师，8+ 年微软经验。目前在 M365 Copilot 移动端团队，负责 OCM Android SDK 核心模块。
          </p>
        </div>
      </div>

      {expanded && (
        <div className="resume-body">
          {/* Education */}
          <div className="resume-section">
            <h3 className="resume-section-title">🎓 教育背景</h3>
            <div className="resume-edu-list">
              <div className="resume-edu-item">
                <span className="resume-edu-school">浙江大学</span>
                <span className="resume-edu-detail">计算机科学与技术 硕士 · 2014 – 2017</span>
              </div>
              <div className="resume-edu-item">
                <span className="resume-edu-school">南京航空航天大学</span>
                <span className="resume-edu-detail">计算机科学与技术 学士 · 2010 – 2014</span>
              </div>
            </div>
          </div>

          {/* Work */}
          <div className="resume-section">
            <h3 className="resume-section-title">💼 工作经历</h3>
            <p className="resume-work-header">
              Microsoft — Software Engineer <span className="resume-work-period">2017 – 至今</span>
            </p>
            <p className="resume-work-team">Microsoft 365 Copilot Mobile (OCM Android) 团队</p>

            <div className="resume-projects">
              {projects.map((p, idx) => (
                <div key={idx} className="resume-project">
                  <button className="resume-project-header" onClick={() => toggleProject(idx)}>
                    <span>{p.emoji} {p.title}</span>
                    <span className="resume-project-date">{p.date}</span>
                    <span className="resume-project-toggle">{expandedProjects.has(idx) ? '▾' : '▸'}</span>
                  </button>
                  {expandedProjects.has(idx) && (
                    <ul className="resume-project-points">
                      {p.points.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="resume-section">
            <h3 className="resume-section-title">🛠 技术技能</h3>
            <div className="resume-skills">
              {skills.map((s, i) => (
                <div key={i} className="resume-skill-row">
                  <span className="resume-skill-label">{s.label}</span>
                  <span className="resume-skill-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
