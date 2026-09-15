import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Thesis from "./components/Thesis.jsx";
import Recommendation from "./components/Recommendation.jsx";
import AdvisoryBoard from "./components/AdvisoryBoard.jsx";
import CulturalRespect from "./components/CulturalRespect.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Thesis />
        <Recommendation />
        <AdvisoryBoard />
        <CulturalRespect />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
