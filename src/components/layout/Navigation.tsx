import { useState } from 'react';

export function Navigation() {
  const [activeTab, setActiveTab] = useState<'compare' | 'compose'>('compare');

  return (
    <nav className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setActiveTab('compare')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'compare'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        Compare
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('compose')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'compose'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        Compose
      </button>
    </nav>
  );
}
