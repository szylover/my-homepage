# 邵正悦 Zhengyue Shao

**Software Engineer · Microsoft**

📧 szylover@outlook.com · 🔗 [GitHub @szylover](https://github.com/szylover) · 🌐 [lovebxy.net](https://www.lovebxy.net)

---

## 教育背景

| 学校 | 专业 | 学位 | 时间 |
|------|------|------|------|
| 浙江大学 | 计算机科学与技术 | 硕士 | 2014 – 2017 |
| 南京航空航天大学 | 计算机科学与技术 | 学士 | 2010 – 2014 |

---

## 工作经历

### Microsoft — Software Engineer（2017 – 至今）

**M365 Copilot Mobile · OCM Android SDK 团队**

负责 Microsoft 365 Copilot 移动端 Android 客户端的核心 SDK 模块开发，涵盖 AI 聊天、实时语音、安全合规等方向。

#### AI 聊天与实时通信

- 设计并实现 AI 聊天客户端的消息传输架构，支持 WebSocket 长连接与 HTTP 双通道，确保弱网环境下的消息可靠投递
- 构建可扩展的聊天服务路由框架，支持按业务场景动态切换不同后端服务，实现架构解耦
- 实现结构化消息注解系统，支持富文本引用、上下文传递等高级交互能力
- 参与实时语音功能的客户端集成，优化连接预热策略与状态管理

#### 安全合规与企业管控

- 设计图片上传合规流程，覆盖多入口路径的用户授权拦截，支持多语言与多屏幕适配
- 为网络层集成企业级安全拦截器（SSL Pinning、DLP、审计日志），消除合规盲区
- 实现 Intune 企业策略检查机制，在敏感操作前校验设备管控状态
- 修复资源访问控制漏洞，强化用户权限边界

#### 客户端架构与体验优化

- 开发任务管理模块，实现任务卡片展示、状态流转、交互手势等完整功能
- 优化底部面板交互体验，处理键盘状态与面板状态的复杂联动逻辑
- 在大型 Monorepo 中推进模块化重构，提升构建效率与代码可维护性

---

## 技术技能

| 方向 | 技术栈 |
|------|--------|
| 编程语言 | Kotlin, Java, Rust, Python, TypeScript |
| Android 开发 | Jetpack Compose, Coroutines / Flow, Dagger / Hilt, OkHttp, Room, Material Design 3 |
| 架构设计 | MVVM, Clean Architecture, 响应式编程, 依赖注入, SDK API 设计 |
| 网络与通信 | WebSocket, HTTP/2, SSL Pinning, OkHttp Interceptor 链 |
| 安全合规 | DLP 数据防泄漏, Intune MDM, 审计日志, 权限管控 |
| 工程实践 | 大型 Monorepo, CI/CD, Feature Gate 灰度发布, 跨平台对齐 |

---

## 个人项目

### 🦀 [my_microkernel](https://github.com/szylover/my_microkernel) — Rust 微内核操作系统

从零构建 x86 微内核，使用 Rust / C / ASM 实现完整的引导、内存管理（PMM / VMM / Heap / VMA）、交互式 Shell 等模块。配套撰写 18 章 + 2 附录的操作系统教程书籍（LaTeX 排版）。通过 QEMU + GDB 进行内核级调试。

### 📚 [chinese-math-physics](https://github.com/szylover/chinese-math-physics) — 数学物理自编教材（共 1339 页）

独立编写 6 本中文数学 / 物理教材，涵盖线性代数、抽象代数、模形式、力学与电磁学。全部使用 LaTeX / LuaLaTeX 排版，包含严格证明、习题集、300+ 道模形式练习题及 30+ 张 pgfplots 图表。

### 🀄 [mahjong-heqie-ai](https://github.com/szylover/mahjong-heqie-ai) — 日麻 AI 推荐引擎

Python 实现的立直麻将工具包，包含向听数计算、牌效率分析、役种评估与出牌推荐。架构分层清晰：底层 `mahjong/` 引擎、`inference/` 推理层、FastAPI 服务端。内含 300 题训练数据集与自动化测试。

### ⚔️ [xiuxian-game](https://github.com/szylover/xiuxian-game) — 浏览器修仙 RPG

React + TypeScript 开发的大型浏览器修仙游戏，包含战斗、炼丹、锻造、NPC 对话、任务系统、程序化地图生成、渡劫突破等十余个子系统。模块化架构：纯游戏逻辑与 UI 完全解耦，支持 DLC 注册与存档系统。

### 📖 [legado-web](https://github.com/szylover/legado-web) — 阅读器 Web 版

基于 React 18 + TypeScript + IndexedDB 构建的在线阅读器，支持书源导入/编辑、书架管理、阅读器、RSS 订阅、备份恢复。实现完整的书源规则引擎（CSS / XPath / JSONPath / 正则 / JS），支持离线持久化与移动端适配。
