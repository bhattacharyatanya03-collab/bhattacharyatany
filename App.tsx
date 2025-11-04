import React, { useState, useEffect } from 'react';
import SmartphoneMockup from './components/SmartphoneMockup';
import SplashScreen from './components/SplashScreen';

// Define the event type, as it's not standard in all TS lib versions
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds for the splash screen

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);
  
  const handleInstallClick = () => {
    if (!installPromptEvent) {
      return;
    }
    // Show the install prompt
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // We can only use the prompt once, so clear it.
      setInstallPromptEvent(null);
    });
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 flex flex-col items-center justify-center p-4 antialiased animate-fadeIn">
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
      <div className="relative w-full max-w-sm mx-auto">
         <SmartphoneMockup 
          showInstallButton={!!installPromptEvent}
          onInstallClick={handleInstallClick}
         />
      </div>
      <footer className="text-center mt-8 text-blue-300/50 text-sm">
        <p>Photo Calener App Concept</p>
      </footer>
    </main>
  );
};

export default App;