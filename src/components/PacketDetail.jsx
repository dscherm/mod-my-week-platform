import { protocols } from '../data/packetTemplates';
import { getAttackTypeName } from '../utils/attackDetector';

const PacketDetail = ({ packet, onFlagPacket }) => {
  if (!packet) {
    return (
      <div className="packet-detail">
        <div className="packet-detail-empty">
          Select a packet to view details
        </div>
      </div>
    );
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      hour12: false,
    });
  };

  const getProtocolColor = (protocol) => {
    return protocols[protocol]?.color || '#90a4ae';
  };

  return (
    <div className="packet-detail">
      <div className="packet-detail-header">
        <h4>Packet Details</h4>
        <div className="packet-detail-actions">
          <button
            className={`flag-btn-lg ${packet.flaggedByUser ? 'flagged' : ''}`}
            onClick={() => onFlagPacket(packet)}
          >
            {packet.flaggedByUser ? '⚑ Flagged' : '⚐ Flag as Suspicious'}
          </button>
        </div>
      </div>

      <div className="packet-detail-content">
        <div className="detail-section">
          <h5>General</h5>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Packet ID</span>
              <span className="detail-value mono">{packet.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Timestamp</span>
              <span className="detail-value">{formatTimestamp(packet.timestamp)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Protocol</span>
              <span
                className="detail-value protocol-badge"
                style={{ backgroundColor: getProtocolColor(packet.protocol) }}
              >
                {packet.protocol}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Length</span>
              <span className="detail-value">{packet.length} bytes</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h5>Source</h5>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">IP Address</span>
              <span className="detail-value mono">{packet.sourceIP}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Port</span>
              <span className="detail-value">{packet.sourcePort}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h5>Destination</h5>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">IP Address</span>
              <span className="detail-value mono">{packet.destIP}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Port</span>
              <span className="detail-value">{packet.destPort}</span>
            </div>
          </div>
        </div>

        {packet.flags && (
          <div className="detail-section">
            <h5>TCP Flags</h5>
            <div className="detail-item">
              <span className="detail-value mono">{packet.flags}</span>
            </div>
          </div>
        )}

        <div className="detail-section">
          <h5>Info</h5>
          <div className="detail-item full-width">
            <span className="detail-value info-box mono">{packet.info}</span>
          </div>
        </div>

        {packet.payload && (
          <div className="detail-section">
            <h5>Payload</h5>
            <div className="detail-item full-width">
              <pre className="payload-box">{packet.payload}</pre>
            </div>
          </div>
        )}

        {packet.isMalicious && (
          <div className="detail-section malicious-warning">
            <h5>Warning</h5>
            <div className="warning-content">
              <span className="warning-icon">⚠</span>
              <div>
                <strong>Potentially Malicious Traffic</strong>
                {packet.attackType && (
                  <p>Attack Type: {getAttackTypeName(packet.attackType)}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacketDetail;
