import { useState } from 'react';
import { getAttackTypeName } from '../utils/attackDetector';

const ActionPanel = ({
  blockedIPs,
  attackTypes,
  identifiedAttackType,
  onBlockIP,
  onUnblockIP,
  onIdentifyAttack,
  hints,
}) => {
  const [manualIP, setManualIP] = useState('');
  const [showHints, setShowHints] = useState(false);

  const handleManualBlock = (e) => {
    e.preventDefault();
    const ip = manualIP.trim();
    if (ip && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
      onBlockIP(ip);
      setManualIP('');
    }
  };

  return (
    <div className="action-panel">
      <div className="action-section">
        <h4>Identify Attack Type</h4>
        <p className="action-hint">What type of attack is occurring?</p>
        <div className="attack-type-grid">
          {attackTypes.map((type) => (
            <button
              key={type}
              className={`attack-type-btn ${identifiedAttackType === type ? 'selected' : ''}`}
              onClick={() => onIdentifyAttack(type)}
            >
              {getAttackTypeName(type)}
            </button>
          ))}
        </div>
        {identifiedAttackType && (
          <div className="selected-attack">
            Selected: <strong>{getAttackTypeName(identifiedAttackType)}</strong>
          </div>
        )}
      </div>

      <div className="action-section">
        <h4>Firewall Rules</h4>
        <form onSubmit={handleManualBlock} className="block-ip-form">
          <input
            type="text"
            placeholder="Enter IP to block (e.g., 192.168.1.100)"
            value={manualIP}
            onChange={(e) => setManualIP(e.target.value)}
            className="ip-input"
          />
          <button type="submit" className="btn-block-submit">
            Block IP
          </button>
        </form>

        <div className="blocked-ips">
          <h5>Blocked IPs ({blockedIPs.length})</h5>
          {blockedIPs.length === 0 ? (
            <p className="no-blocked">No IPs blocked yet</p>
          ) : (
            <ul className="blocked-ip-list">
              {blockedIPs.map((ip) => (
                <li key={ip} className="blocked-ip-item">
                  <span className="mono">{ip}</span>
                  <button
                    className="btn-unblock"
                    onClick={() => onUnblockIP(ip)}
                    title="Unblock this IP"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {hints && hints.length > 0 && (
        <div className="action-section hints-section">
          <button
            className="hints-toggle"
            onClick={() => setShowHints(!showHints)}
          >
            {showHints ? 'Hide Hints' : 'Show Hints'} 💡
          </button>

          {showHints && (
            <div className="hints-list">
              {hints.map((hint, index) => (
                <div key={index} className="hint-item">
                  <span className="hint-number">{index + 1}</span>
                  <span className="hint-text">{hint}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionPanel;
