import { useState } from 'react';
import PixelAvatar from './PixelAvatar';

const SKIN_SWATCHES = [
  '#FDDBB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#5C3317', '#3B1F0B'
];

const HAIR_SWATCHES = [
  // Natural colors
  '#2C1B0E', '#4A3728', '#8B4513', '#D4A56A', '#F5DEB3', '#1C1C1C',
  // Cyberpunk neon colors
  '#FF1493', '#00FFFF', '#39FF14', '#FF6600', '#8B00FF', '#FF0044',
  '#00FF88', '#FFD700', '#C0C0C0',
];

const EYE_SWATCHES = [
  '#4A90D9', '#2E86C1', '#196F3D', '#7D6608', '#6E2C00', '#1C1C1C', '#8E44AD', '#C0392B',
  '#FF0044', '#00FFFF', '#39FF14',
];

const HAIR_STYLE_OPTIONS = [
  { id: 'short', label: 'Short' },
  { id: 'long', label: 'Long' },
  { id: 'curly', label: 'Curly' },
  { id: 'buzz', label: 'Buzz' },
  { id: 'ponytail', label: 'Ponytail' },
  { id: 'mohawk', label: 'Mohawk' },
  { id: 'undercut', label: 'Undercut' },
  { id: 'spiky', label: 'Spiky' },
  { id: 'sideshave', label: 'Side Shave' },
  { id: 'cyberdreads', label: 'Cyber Dreads' },
  { id: 'fauxhawk', label: 'Faux Hawk' },
  { id: 'braids', label: 'Braids' },
  { id: 'afro', label: 'Afro' },
  { id: 'twists', label: 'Twists' },
  { id: 'locs', label: 'Locs' },
  { id: 'flattop', label: 'Flat Top' },
];

const SLOT_LABELS = {
  top: 'Top',
  bottom: 'Bottom',
  shoes: 'Shoes',
  hat: 'Hat',
  face: 'Face',
  cyborg: 'Cyborg',
};

const AvatarEditor = ({ avatarConfig, onSave, onClose, ownedClothing = [], clothingItemsMap = {} }) => {
  const [config, setConfig] = useState(() => ({
    skinTone: avatarConfig?.skinTone || '#C68642',
    hairColor: avatarConfig?.hairColor || '#2C1B0E',
    hairStyle: avatarConfig?.hairStyle || 'short',
    eyeColor: avatarConfig?.eyeColor || '#4A90D9',
    equippedClothing: {
      top: avatarConfig?.equippedClothing?.top || null,
      bottom: avatarConfig?.equippedClothing?.bottom || null,
      shoes: avatarConfig?.equippedClothing?.shoes || null,
      hat: avatarConfig?.equippedClothing?.hat || null,
      face: avatarConfig?.equippedClothing?.face || null,
      cyborg: avatarConfig?.equippedClothing?.cyborg || null,
    },
  }));

  const update = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleEquip = (slot, itemId) => {
    setConfig(prev => ({
      ...prev,
      equippedClothing: {
        ...prev.equippedClothing,
        [slot]: prev.equippedClothing[slot] === itemId ? null : itemId,
      },
    }));
  };

  // Group owned clothing by slot
  const clothingBySlot = {};
  ownedClothing.forEach(item => {
    const slot = item.clothingType;
    if (!slot) return;
    if (!clothingBySlot[slot]) clothingBySlot[slot] = [];
    clothingBySlot[slot].push(item);
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content avatar-editor" onClick={e => e.stopPropagation()}>
        <h3>Customize Your Avatar</h3>

        <div className="avatar-editor-layout">
          <div className="avatar-editor-preview">
            <PixelAvatar avatarConfig={config} size={160} clothingItems={clothingItemsMap} />
          </div>

          <div className="avatar-editor-controls">
            {/* Skin Tone */}
            <div className="avatar-editor-group">
              <label>Skin Tone</label>
              <div className="avatar-editor-swatches">
                {SKIN_SWATCHES.map(c => (
                  <button
                    key={c}
                    className={`swatch ${config.skinTone === c ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => update('skinTone', c)}
                  />
                ))}
              </div>
            </div>

            {/* Hair Color */}
            <div className="avatar-editor-group">
              <label>Hair Color</label>
              <div className="avatar-editor-swatches">
                {HAIR_SWATCHES.map(c => (
                  <button
                    key={c}
                    className={`swatch ${config.hairColor === c ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => update('hairColor', c)}
                  />
                ))}
              </div>
            </div>

            {/* Eye Color */}
            <div className="avatar-editor-group">
              <label>Eye Color</label>
              <div className="avatar-editor-swatches">
                {EYE_SWATCHES.map(c => (
                  <button
                    key={c}
                    className={`swatch ${config.eyeColor === c ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => update('eyeColor', c)}
                  />
                ))}
              </div>
            </div>

            {/* Hair Style */}
            <div className="avatar-editor-group">
              <label>Hair Style</label>
              <div className="hair-style-picker">
                {HAIR_STYLE_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    className={`hair-style-btn ${config.hairStyle === opt.id ? 'active' : ''}`}
                    onClick={() => update('hairStyle', opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clothing Equip */}
            {Object.keys(SLOT_LABELS).map(slot => {
              const items = clothingBySlot[slot];
              if (!items || items.length === 0) return null;
              return (
                <div key={slot} className="avatar-editor-group">
                  <label>{SLOT_LABELS[slot]}</label>
                  <div className="clothing-equip-section">
                    {items.map(item => (
                      <button
                        key={item.id}
                        className={`clothing-equip-btn ${config.equippedClothing[slot] === item.id ? 'equipped' : ''}`}
                        onClick={() => toggleEquip(slot, item.id)}
                      >
                        <span className="clothing-equip-icon">{item.icon}</span>
                        <span className="clothing-equip-name">{item.name}</span>
                        {config.equippedClothing[slot] === item.id && <span className="clothing-equipped-badge">ON</span>}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="confirm-actions">
          <button className="confirm-btn approve" onClick={() => onSave(config)}>
            Save Avatar
          </button>
          <button className="confirm-btn cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarEditor;
