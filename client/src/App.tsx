import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Waitlist from "@/pages/Waitlist";
import Changelog from "@/pages/Changelog";
import Security from "@/pages/Security";
import Press from "@/pages/Press";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/waitlist" component={Waitlist} />
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
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
