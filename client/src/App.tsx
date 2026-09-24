import { useEffect, useLayoutEffect, useRef } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Download from "@/pages/Download";
import Changelog from "@/pages/Changelog";
import Security from "@/pages/Security";
import Press from "@/pages/Press";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

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
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/download" component={Download} />
      <Route path="/waitlist" component={Download} />
      <Route path="/changelog" component={Changelog} />
      <Route path="/security" component={Security} />
      <Route path="/press" component={Press} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
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
