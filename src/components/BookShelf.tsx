import { useState } from 'react';

interface Book {
  title: string;
  emoji: string;
  description: string;
  pdfUrl: string;
  rawPdfUrl: string;
  repoUrl: string;
  chapters: number | string;
}

const books: Book[] = [
  {
    title: '自己动手写操作系统：从零构建 x86 微内核',
    emoji: '📘',
    description: 'x86 微内核操作系统完整实现',
    pdfUrl: 'https://github.com/szylover/my_microkernel/blob/main/book/main.pdf',
    rawPdfUrl: 'https://raw.githubusercontent.com/szylover/my_microkernel/main/book/main.pdf',
    repoUrl: 'https://github.com/szylover/my_microkernel/tree/main/book',
    chapters: '30+',
  },
  {
    title: '如何用 AI Agent 编写自己的操作系统',
    emoji: '📙',
    description: 'AI 辅助开发操作系统实录',
    pdfUrl: 'https://github.com/szylover/my_microkernel/blob/main/book2/main.pdf',
    rawPdfUrl: 'https://raw.githubusercontent.com/szylover/my_microkernel/main/book2/main.pdf',
    repoUrl: 'https://github.com/szylover/my_microkernel/tree/main/book2',
    chapters: '10+',
  },
  {
    title: '模形式教材',
    emoji: '📗',
    description: '中文模形式数学教材',
    pdfUrl: 'https://github.com/szylover/chinese-modular-forms/blob/main/textbook/main.pdf',
    rawPdfUrl: 'https://raw.githubusercontent.com/szylover/chinese-modular-forms/main/textbook/main.pdf',
    repoUrl: 'https://github.com/szylover/chinese-modular-forms/tree/main/textbook',
    chapters: '8+',
  },
  {
    title: '模形式习题集',
    emoji: '📒',
    description: '模形式配套练习与解答',
    pdfUrl: 'https://github.com/szylover/chinese-modular-forms/blob/main/exercises-book/main.pdf',
    rawPdfUrl: 'https://raw.githubusercontent.com/szylover/chinese-modular-forms/main/exercises-book/main.pdf',
    repoUrl: 'https://github.com/szylover/chinese-modular-forms/tree/main/exercises-book',
    chapters: '习题集',
  },
];

export default function BookShelf() {
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  return (
    <div className="module">
      <h3 className="module-title">
        📖 我的著作
        {activeBook && (
          <button className="module-action" onClick={() => setActiveBook(null)}>✕ 关闭阅读器</button>
        )}
      </h3>
      <div className="book-grid">
        {books.map(book => (
          <div
            key={book.title}
            className={`book-card ${activeBook?.title === book.title ? 'active' : ''}`}
            onClick={() => setActiveBook(activeBook?.title === book.title ? null : book)}
          >
            <span className="book-emoji">{book.emoji}</span>
            <div className="book-info">
              <span className="book-title">{book.title}</span>
              <span className="book-desc">{book.description} · {book.chapters} 章</span>
            </div>
          </div>
        ))}
      </div>
      {activeBook && (
        <div className="book-reader">
          <div className="book-reader-toolbar">
            <span className="book-reader-title">{activeBook.emoji} {activeBook.title}</span>
            <div className="book-reader-actions">
              <a href={activeBook.rawPdfUrl} target="_blank" rel="noopener noreferrer" className="book-reader-btn">⬇️ 下载</a>
              <a href={activeBook.repoUrl} target="_blank" rel="noopener noreferrer" className="book-reader-btn">📂 源码</a>
            </div>
          </div>
          <iframe
            className="book-reader-frame"
            src={activeBook.rawPdfUrl}
            title={activeBook.title}
          />
        </div>
      )}
    </div>
  );
}
