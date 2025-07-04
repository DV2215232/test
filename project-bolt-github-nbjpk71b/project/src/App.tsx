import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { EmailPopup } from './components/EmailPopup';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleCtaClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onCtaClick={handleCtaClick} />
      <EmailPopup isOpen={showPopup} onClose={handleClosePopup} />
    </div>
  );
}

export default App;