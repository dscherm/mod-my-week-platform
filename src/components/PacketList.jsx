import { useEffect, useRef } from 'react';
import { protocols } from '../data/packetTemplates';

const PacketList = ({ packets, selectedPacket, flaggedPackets, onSelectPacket, onFlagPacket }) => {
  const listRef = useRef(null);
  const autoScrollRef = useRef(true);

  // Auto-scroll to bottom when new packets arrive
  useEffect(() => {
    if (listRef.current && autoScrollRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [packets]);

  // Handle scroll - disable auto-scroll if user scrolls up
  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      autoScrollRef.current = scrollTop + clientHeight >= scrollHeight - 50;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 2,
    });
  };

  const getProtocolColor = (protocol) => {
    return protocols[protocol]?.color || '#90a4ae';
  };

  const isPacketFlagged = (packet) => {
    return flaggedPackets.some(p => p.id === packet.id);
  };

  const handleRowClick = (packet) => {
    onSelectPacket(packet);
  };

  const handleFlagClick = (e, packet) => {
    e.stopPropagation();
    onFlagPacket(packet);
  };

  return (
    <div className="packet-list-container">
      <div className="packet-list-header">
        <h3>Live Traffic</h3>
        <span className="packet-count">{packets.length} packets</span>
      </div>

      <div className="packet-table-header">
        <div className="col-flag"></div>
        <div className="col-time">Time</div>
        <div className="col-src">Source</div>
        <div className="col-dst">Destination</div>
        <div className="col-proto">Protocol</div>
        <div className="col-len">Length</div>
        <div className="col-info">Info</div>
      </div>

      <div
        className="packet-list"
        ref={listRef}
        onScroll={handleScroll}
      >
        {packets.map((packet) => (
          <div
            key={packet.id}
            className={`packet-row
              ${selectedPacket?.id === packet.id ? 'selected' : ''}
              ${packet.isMalicious ? 'malicious' : ''}
              ${isPacketFlagged(packet) ? 'flagged' : ''}
            `}
            onClick={() => handleRowClick(packet)}
          >
            <div className="col-flag">
              <button
                className={`flag-btn ${isPacketFlagged(packet) ? 'flagged' : ''}`}
                onClick={(e) => handleFlagClick(e, packet)}
                title={isPacketFlagged(packet) ? 'Unflag packet' : 'Flag as suspicious'}
              >
                {isPacketFlagged(packet) ? '⚑' : '⚐'}
              </button>
            </div>
            <div className="col-time">{formatTimestamp(packet.timestamp)}</div>
            <div className="col-src">
              <span className="ip">{packet.sourceIP}</span>
              <span className="port">:{packet.sourcePort}</span>
            </div>
            <div className="col-dst">
              <span className="ip">{packet.destIP}</span>
              <span className="port">:{packet.destPort}</span>
            </div>
            <div className="col-proto">
              <span
                className="protocol-badge"
                style={{ backgroundColor: getProtocolColor(packet.protocol) }}
              >
                {packet.protocol}
              </span>
            </div>
            <div className="col-len">{packet.length}</div>
            <div className="col-info" title={packet.info}>
              {packet.info}
            </div>
          </div>
        ))}

        {packets.length === 0 && (
          <div className="packet-list-empty">
            Waiting for network traffic...
          </div>
        )}
      </div>
    </div>
  );
};

export default PacketList;
