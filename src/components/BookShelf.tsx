interface Book {
  title: string;
  emoji: string;
  description: string;
  pdfUrl: string;
  repoUrl: string;
  chapters: number | string;
}

const books: Book[] = [
  {
    title: '自己动手写操作系统：从零构建 x86 微内核',
    emoji: '📘',
    description: 'x86 微内核操作系统完整实现',
    pdfUrl: 'https://github.com/szylover/my_microkernel/blob/main/book/main.pdf',
    repoUrl: 'https://github.com/szylover/my_microkernel/tree/main/book',
    chapters: '30+',
  },
  {
    title: '如何用 AI Agent 编写自己的操作系统',
    emoji: '📙',
    description: 'AI 辅助开发操作系统实录',
    pdfUrl: 'https://github.com/szylover/my_microkernel/blob/main/book2/main.pdf',
    repoUrl: 'https://github.com/szylover/my_microkernel/tree/main/book2',
    chapters: '10+',
  },
  {
    title: 'AI Agent 工程师转行与面试完全指南',
    emoji: '🤖',
    description: '行业全景·LLM/RAG·Agent架构·MCP/A2A·LangChain·面试题340+',
    pdfUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/ai-agent-book',
    repoUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/ai-agent-book',
    chapters: 20,
  },
  {
    title: 'Android/TypeScript/Node.js 面试完全指南',
    emoji: '📝',
    description: 'Kotlin·Compose·React·Node.js·系统设计14案例·LeetCode50题',
    pdfUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/fullstack-interview-book',
    repoUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/fullstack-interview-book',
    chapters: 18,
  },
  {
    title: '从牛顿到爱因斯坦：用微积分重新理解物理',
    emoji: '🔭',
    description: '力学·电磁学·相对论·Lagrangian·Noether定理 · 270页',
    pdfUrl: 'https://github.com/szylover/chinese-math-physics/blob/main/pdf/physics-textbook.pdf',
    repoUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/physics-textbook',
    chapters: 16,
  },
  {
    title: '微积分物理习题集',
    emoji: '✏️',
    description: '经典题·竞赛·大学物理·微分方程 · 157页',
    pdfUrl: 'https://github.com/szylover/chinese-math-physics/blob/main/pdf/physics-exercises.pdf',
    repoUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/physics-exercises',
    chapters: 14,
  },
  {
    title: '线性代数：从向量空间到算子',
    emoji: '📘',
    description: 'LADR风格 · 行列式最后 · 算子优先 · 241页',
    pdfUrl: 'https://github.com/szylover/chinese-math-physics/blob/main/pdf/linear-algebra-book.pdf',
    repoUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/linear-algebra-book',
    chapters: 12,
  },
  {
    title: '抽象代数导论：面向模形式',
    emoji: '📕',
    description: 'Artin/DF风格 · 群环域Galois · 174页',
    pdfUrl: 'https://github.com/szylover/chinese-math-physics/blob/main/pdf/abstract-algebra-book.pdf',
    repoUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/abstract-algebra-book',
    chapters: 10,
  },
  {
    title: '模形式与费马大定理',
    emoji: '📗',
    description: 'SL₂(ℤ) 到 Wiles 定理 · 315页',
    pdfUrl: 'https://github.com/szylover/chinese-math-physics/blob/main/pdf/modular-forms-textbook.pdf',
    repoUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/modular-forms-textbook',
    chapters: 10,
  },
  {
    title: '模形式习题集',
    emoji: '📒',
    description: '300+ 题 · 三级难度 · 完整解答 · 182页',
    pdfUrl: 'https://github.com/szylover/chinese-math-physics/blob/main/pdf/modular-forms-exercises.pdf',
    repoUrl: 'https://github.com/szylover/chinese-math-physics/tree/main/modular-forms-exercises',
    chapters: '习题集',
  },
];

export default function BookShelf() {
  return (
    <div className="module">
      <h3 className="module-title">📖 我的著作</h3>
      <div className="book-grid">
        {books.map(book => (
          <a
            key={book.title}
            className="book-card"
            href={book.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="book-emoji">{book.emoji}</span>
            <div className="book-info">
              <span className="book-title">{book.title}</span>
              <span className="book-desc">{book.description} · {book.chapters} 章</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
