import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/** True when the browser is at the site root, allowing for a missing trailing slash. */
function isRoot() {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const path = window.location.pathname.replace(/\/?$/, "/");
  return path === base;
}

export function AppRouter() {
  return isRoot() ? <Index /> : <NotFound />;
}

export default AppRouter;
