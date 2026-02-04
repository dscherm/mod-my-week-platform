import { useState, useEffect } from 'react';

const themes = [
  {
    id: '20s',
    name: '20s Metropolis',
    description: 'Art Deco machine age',
    preview: ['#d4af37', '#1a1a1a', '#c0c0c0', '#8b7355']
  },
  {
    id: '60s',
    name: '60s Space Age',
    description: 'Atomic era optimism',
    preview: ['#ff6b35', '#00b4d8', '#ffd93d', '#f8f9fa']
  },
  {
    id: '70s',
    name: '70s Retro Tech',
    description: 'Earth tones meet chrome',
    preview: ['#d4a373', '#e07a5f', '#81b29a', '#f4a261']
  },
  {
    id: '80s',
    name: '80s Neon Grid',
    description: 'Cyberpunk terminal',
    preview: ['#00ffff', '#ff00ff', '#39ff14', '#0a0a0f']
  },
  {
    id: '90s',
    name: '90s Y2K Chrome',
    description: 'Millennium tech bubble',
    preview: ['#7b68ee', '#00ced1', '#c0c0c0', '#191970']
  }
];

function ThemeSwitcher({ onClose }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('cyberrange-theme') || '80s';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('cyberrange-theme', currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
  };

  return (
    <div className="theme-switcher-overlay" onClick={onClose}>
      <div className="theme-switcher-modal" onClick={(e) => e.stopPropagation()}>
        <div className="theme-switcher-header">
          <h2>Choose Your Era</h2>
          <p>Select a retrofuturistic theme</p>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="theme-grid">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`theme-card ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.id)}
            >
              <div className="theme-preview">
                {theme.preview.map((color, idx) => (
                  <div
                    key={idx}
                    className="preview-color"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="theme-info">
                <h3>{theme.name}</h3>
                <p>{theme.description}</p>
              </div>
              {currentTheme === theme.id && (
                <div className="theme-active-badge">ACTIVE</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hook to initialize theme on app load
export function useTheme() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('cyberrange-theme') || '80s';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
}

export default ThemeSwitcher;
