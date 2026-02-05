import { useState, useEffect } from 'react';

const DEFAULT_CUSTOM_COLORS = {
  primary: '#00ffff',
  secondary: '#ff00ff',
  accent: '#39ff14',
  background: '#0a0a0f'
};

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
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Create your own color scheme',
    preview: ['#00ffff', '#ff00ff', '#39ff14', '#0a0a0f'],
    isCustom: true
  }
];

const ColorPicker = ({ label, value, onChange }) => (
  <div className="color-picker-item">
    <label className="color-label">{label}</label>
    <div className="color-input-wrapper">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="color-input"
      />
      <span className="color-hex">{value.toUpperCase()}</span>
    </div>
  </div>
);

const applyCustomColors = (colors) => {
  const existingStyle = document.getElementById('custom-theme-styles');
  if (existingStyle) existingStyle.remove();

  const style = document.createElement('style');
  style.id = 'custom-theme-styles';
  style.textContent = `
    [data-theme="custom"] {
      --neon-cyan: ${colors.primary};
      --neon-magenta: ${colors.secondary};
      --neon-green: ${colors.accent};
      --bg-dark: ${colors.background};
      --text-primary: ${colors.primary};
      --text-secondary: ${colors.secondary};
      --glow-cyan: 0 0 10px ${colors.primary}, 0 0 20px ${colors.primary}, 0 0 40px ${colors.primary};
      --glow-magenta: 0 0 10px ${colors.secondary}, 0 0 20px ${colors.secondary}, 0 0 40px ${colors.secondary};
      --glow-green: 0 0 10px ${colors.accent}, 0 0 20px ${colors.accent}, 0 0 40px ${colors.accent};
    }
  `;
  document.head.appendChild(style);
};

const removeCustomStyles = () => {
  const existingStyle = document.getElementById('custom-theme-styles');
  if (existingStyle) existingStyle.remove();
};

function ThemeSwitcher({ onClose }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('cyberrange-theme') || '80s';
  });

  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem('cyberrange-custom-colors');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_COLORS;
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('cyberrange-theme', currentTheme);

    // Handle custom theme styles
    if (currentTheme === 'custom') {
      applyCustomColors(customColors);
    } else {
      removeCustomStyles();
    }
  }, [currentTheme, customColors]);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
  };

  const handleColorChange = (colorKey, value) => {
    const newColors = { ...customColors, [colorKey]: value };
    setCustomColors(newColors);
    localStorage.setItem('cyberrange-custom-colors', JSON.stringify(newColors));
  };

  // Get dynamic preview for custom theme
  const getThemePreview = (theme) => {
    if (theme.isCustom) {
      return [customColors.primary, customColors.secondary, customColors.accent, customColors.background];
    }
    return theme.preview;
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
                {getThemePreview(theme).map((color, idx) => (
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

        {currentTheme === 'custom' && (
          <div className="custom-colors-section">
            <h3>Customize Your Colors</h3>
            <div className="color-pickers-grid">
              <ColorPicker
                label="Primary"
                value={customColors.primary}
                onChange={(value) => handleColorChange('primary', value)}
              />
              <ColorPicker
                label="Secondary"
                value={customColors.secondary}
                onChange={(value) => handleColorChange('secondary', value)}
              />
              <ColorPicker
                label="Accent"
                value={customColors.accent}
                onChange={(value) => handleColorChange('accent', value)}
              />
              <ColorPicker
                label="Background"
                value={customColors.background}
                onChange={(value) => handleColorChange('background', value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hook to initialize theme on app load
export function useTheme() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('cyberrange-theme') || '80s';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // If custom theme is active, apply saved custom colors
    if (savedTheme === 'custom') {
      const savedColors = localStorage.getItem('cyberrange-custom-colors');
      const colors = savedColors ? JSON.parse(savedColors) : DEFAULT_CUSTOM_COLORS;
      applyCustomColors(colors);
    }
  }, []);
}

export default ThemeSwitcher;
