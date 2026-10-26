import { useEffect, useLayoutEffect, useRef } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import MaliyaOS from "@/os/MaliyaOS";
import { OS_PATH_PATTERN } from "@/os/apps";

function ScrollRestoration() {
  const [location] = useLocation();
  const positions = useRef(new Map<string, number>());
  const activePage = useRef(location);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const savePosition = () => positions.current.set(activePage.current, window.scrollY);
    window.addEventListener("scroll", savePosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", savePosition);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    activePage.current = location;
    window.scrollTo(0, positions.current.get(location) ?? 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      {/* Home and the former Product, Download, Changelog, Security and Press pages open as apps in the OS. */}
      <Route path={OS_PATH_PATTERN} component={MaliyaOS} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollRestoration />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
