import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface InstallPromptProps {
  language?: string;
}

export function InstallPrompt({ language = 'en' }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone || 
                      document.referrer.includes('android-app://');
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback: show manual instructions
      alert('To install:\n\n1. Tap the menu (⋮) in your browser\n2. Select "Install app" or "Add to Home screen"\n3. Follow the prompts');
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Check if user dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (dismissedTime > weekAgo) {
        setShowPrompt(false);
      }
    }
  }, []);

  // Show prompt if not standalone and not dismissed
  useEffect(() => {
    if (!isStandalone && !localStorage.getItem('installPromptDismissed')) {
      // Show after a short delay even without beforeinstallprompt
      const timer = setTimeout(() => {
        if (!deferredPrompt) {
          setShowPrompt(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isStandalone, deferredPrompt]);

  if (isStandalone) return null;
  if (!showPrompt) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto animate-in slide-in-from-top">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-4 border border-blue-500">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm mb-1">
              Install TempoStep
            </h3>
            <p className="text-blue-100 text-xs mb-3">
              Install as an app for offline access and faster loading
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-white text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-50 active:bg-blue-100 transition-colors"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                Later
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white p-1 -mt-1 -mr-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}