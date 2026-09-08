import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Achievements from "./components/Achievements.jsx";
import ClinicalSessions from "./components/ClinicalSessions.jsx";
import PerformanceArchive from "./components/PerformanceArchive.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Achievements />
        <ClinicalSessions />
        <PerformanceArchive />
        <Testimonials />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
