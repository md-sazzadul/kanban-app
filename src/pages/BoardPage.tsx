import BoardHeader from "../features/board/BoardHeader";
import BoardView from "../features/board/BoradView";
import { usePageMeta } from "../hooks/usePageMeta";

/**
 * BoardPage
 *
 * SEO / Accessibility improvements:
 * - Sets per-route <title> and <meta description> via usePageMeta.
 * - Wraps content in <main id="main-content"> — the skip-link target.
 * - Uses `aria-label` on <main> for screen-reader context.
 */

const BoardPage = () => {
  usePageMeta({
    title: "Board",
    description:
      "View and manage your tasks in a visual Kanban board with drag-and-drop, filters, and real-time search.",
  });

  return (
    <div className="h-screen overflow-hidden">
      {/* Skip-link target + landmark */}
      <a id="main-content" tabIndex={-1} className="sr-only" aria-hidden>
        Main content
      </a>

      {/* ── Semantic: <header> is inside BoardHeader ── */}
      <BoardHeader />

      {/* ── Semantic: main content landmark ── */}
      <main aria-label="Kanban board workspace" className="focus:outline-none">
        <BoardView />
      </main>
    </div>
  );
};

export default BoardPage;
