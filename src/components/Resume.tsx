const RESUME_URL = 'https://szydownloads.z7.web.core.windows.net/resume.pdf';

export default function Resume() {
  return (
    <div className="module resume-module">
      <div className="module-title">
        <span>📄 Resume</span>
      </div>

      <div className="resume-header">
        <div className="resume-avatar">邵</div>
        <div className="resume-intro">
          <h2 className="resume-name">邵正悦 <span className="resume-name-en">Zhengyue Shao</span></h2>
          <p className="resume-role">Software Engineer · Microsoft</p>
          <p className="resume-summary">
            资深 Android 工程师，8+ 年微软经验。目前在 M365 Copilot 移动端团队，负责 OCM Android SDK 核心模块。
          </p>
          <a className="resume-download" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            ⬇ 下载完整简历 (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
