import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import DepressionTest from "./pages/DepressionTest";
import AnxietyTest from "./pages/AnxietyTest";
import PanicAttack from "./pages/PanicAttack";
import Faq from "./pages/Faq";
import SelfCheck from "./pages/SelfCheck";
import Glossary from "./pages/Glossary";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

function Router() {
  return (
    <Switch>
      {/* Public pages with Layout */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogArticle} />
            <Route path="/test/depression" component={DepressionTest} />
            <Route path="/test/anxiety" component={AnxietyTest} />
            <Route path="/panicheskaya-ataka" component={PanicAttack} />
            <Route path="/faq" component={Faq} />
            <Route path="/proverit-sebya" component={SelfCheck} />
            <Route path="/slovar" component={Glossary} />
            <Route path="/contact" component={Contact} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
