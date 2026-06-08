const RESUME_URL = 'https://github.com/szylover/resume/raw/master/resume.pdf';

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
          <p className="resume-role">Senior Android Platform Engineer · Microsoft</p>
          <p className="resume-summary">
            8+ 年微软移动端平台工程经验，技术主线从 Mobile Client Infra 到 AI-enabled Mobile Platform 到 Copilot Runtime。现任 M365 Copilot Mobile Runtime 核心基础设施工程师。
          </p>
          <a className="resume-download" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            ⬇ 下载完整简历 (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
