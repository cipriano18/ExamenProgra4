'use client';

import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [prompt, setPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then(() => setShowButton(false));
    }
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg z-50"
    >
      Instalar FlowTasks
    </button>
  );
}
