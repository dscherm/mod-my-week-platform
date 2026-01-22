import { getSeverityColor } from '../utils/attackDetector';

const AlertPanel = ({ alerts, onBlockIP }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="alert-panel">
      <div className="alert-panel-header">
        <h4>Threat Alerts</h4>
        {alerts.length > 0 && (
          <span className="alert-count">{alerts.length}</span>
        )}
      </div>

      <div className="alert-list">
        {alerts.length === 0 ? (
          <div className="alert-empty">
            <span className="alert-empty-icon">🛡</span>
            <p>No threats detected yet</p>
            <p className="alert-empty-hint">Monitoring network traffic...</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={`${alert.type}-${alert.attackerIP}-${index}`}
              className="alert-item"
              style={{ borderLeftColor: getSeverityColor(alert.severity) }}
            >
              <div className="alert-header">
                <span
                  className="alert-severity"
                  style={{ backgroundColor: getSeverityColor(alert.severity) }}
                >
                  {alert.severity.toUpperCase()}
                </span>
                <span className="alert-time">{formatTime(alert.timestamp)}</span>
              </div>

              <div className="alert-title">{alert.name}</div>
              <div className="alert-description">{alert.description}</div>

              <div className="alert-details">
                <div className="alert-evidence">
                  <strong>Evidence:</strong> {alert.evidence}
                </div>
                <div className="alert-ip">
                  <strong>Source IP:</strong>
                  <span className="mono">{alert.attackerIP}</span>
                </div>
              </div>

              <div className="alert-indicators">
                <strong>Indicators:</strong>
                <ul>
                  {alert.indicators.slice(0, 2).map((indicator, idx) => (
                    <li key={idx}>{indicator}</li>
                  ))}
                </ul>
              </div>

              <div className="alert-actions">
                <button
                  className="btn-block"
                  onClick={() => onBlockIP(alert.attackerIP)}
                >
                  Block {alert.attackerIP}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertPanel;
