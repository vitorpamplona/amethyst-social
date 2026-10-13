import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// The supporters list is a few hundred KB, so its page loads only when visited.
const Thanks = lazy(() => import("./pages/Thanks"));

/** The browser's path relative to the site's base path, without slashes at either end. */
function route() {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const path = window.location.pathname.replace(/\/?$/, "/");
  return path.startsWith(base) ? path.slice(base.length).replace(/\/$/, "") : null;
}

export function AppRouter() {
  switch (route()) {
    case "":
      return <Index />;
    case "thanks":
      return (
        <Suspense fallback={<div className="min-h-screen bg-hero-gradient" />}>
          <Thanks />
        </Suspense>
      );
    default:
      return <NotFound />;
  }
}

export default AppRouter;
