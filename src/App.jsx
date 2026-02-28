import { useState, useEffect } from "react";
import { useLenis } from "./hooks/useLenis";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SpacesShowcase from "./components/SpacesShowcase";
import PhotoGallery from "./components/PhotoGallery";
import ElevationSection from "./components/ElevationSection";
import VideoSection from "./components/VideoSection";
import FeaturesSection from "./components/FeaturesSection";
import SpecialHighlightsSection from "./components/SpecialHighlightsSection";
import PanoramicViewer from "./components/PanoramicViewer";
import Footer from "./components/Footer";

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  useLenis();

  useEffect(() => {
    const timer = setTimeout(() => setPreloaderDone(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} isVisible={!preloaderDone} />
      <div className={preloaderDone ? "" : "overflow-hidden"}>
        <Navbar />
        <main>
          <HeroSection />
          <ElevationSection />
          <AboutSection />
          <SpacesShowcase />
          <PhotoGallery />
          <VideoSection />
          <FeaturesSection />
          <SpecialHighlightsSection />
          <PanoramicViewer />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
