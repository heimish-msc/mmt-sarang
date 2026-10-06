import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import { useRoute } from "./router.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Program from "./pages/Program.jsx";
import Research from "./pages/Research.jsx";
import Workshops from "./pages/Workshops.jsx";
import Performances from "./pages/Performances.jsx";
import Admin from "./admin/Admin.jsx";

const pages = {
  home: Home,
  program: Program,
  research: Research,
  workshops: Workshops,
  performances: Performances,
};

export default function App() {
  const route = useRoute();
  if (route === "admin") return <Admin />;
  const Page = pages[route];

  return (
    <LanguageProvider>
      <Header route={route} />
      <main>
        <Page />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
