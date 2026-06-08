const RESUME_CN_URL = 'https://szydownloads.z7.web.core.windows.net/resume.pdf';
const RESUME_EN_URL = 'https://szydownloads.z7.web.core.windows.net/resume_en.pdf';

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
          <p className="resume-role">Software Engineer 2 · Microsoft</p>
          <p className="resume-summary">
            8+ 年微软移动端平台工程经验，参与 Android 架构、SDK/Runtime、语音助手、会议智能与 AI 产品集成等方向。
          </p>
          <div className="resume-downloads">
            <a className="resume-download" href={RESUME_CN_URL} target="_blank" rel="noopener noreferrer">
              ⬇ 中文简历
            </a>
            <a className="resume-download resume-download-secondary" href={RESUME_EN_URL} target="_blank" rel="noopener noreferrer">
              ⬇ English Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
