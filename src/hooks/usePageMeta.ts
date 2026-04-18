import { useEffect } from "react";

interface PageMetaOptions {
  /** Browser tab / <title> text */
  title: string;
  /** <meta name="description"> content */
  description?: string;
  /** Overrides the default og:title (falls back to title) */
  ogTitle?: string;
}

const SITE_NAME = "Kanban App";

/**
 * usePageMeta
 *
 * Lightweight alternative to react-helmet for setting per-route
 * <title> and <meta name="description"> without a heavy dependency.
 *
 * Usage:
 *   usePageMeta({ title: "Board", description: "Your task board." });
 */
export function usePageMeta({ title, description, ogTitle }: PageMetaOptions) {
  useEffect(() => {
    // ── Document title ──────────────────────────────────────────────
    const fullTitle = `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    // ── Meta description ────────────────────────────────────────────
    if (description) {
      let descEl = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );
      if (!descEl) {
        descEl = document.createElement("meta");
        descEl.name = "description";
        document.head.appendChild(descEl);
      }
      descEl.content = description;
    }

    // ── Open Graph title ────────────────────────────────────────────
    const resolvedOgTitle = ogTitle ?? title;
    let ogTitleEl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]',
    );
    if (!ogTitleEl) {
      ogTitleEl = document.createElement("meta");
      ogTitleEl.setAttribute("property", "og:title");
      document.head.appendChild(ogTitleEl);
    }
    ogTitleEl.content = resolvedOgTitle;
  }, [title, description, ogTitle]);
}
