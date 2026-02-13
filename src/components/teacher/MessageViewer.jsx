import { useState, useEffect } from 'react';
import { subscribeToAllMessages, subscribeToTeams, deleteMessage } from '../../services/firebaseService';

const MessageViewer = ({ classCode }) => {
  const [messages, setMessages] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filterTeam, setFilterTeam] = useState('all');

  useEffect(() => {
    if (!classCode) return;

    const unsubMessages = subscribeToAllMessages(classCode, setMessages);
    const unsubTeams = subscribeToTeams(classCode, setTeams);

    return () => {
      unsubMessages();
      unsubTeams();
    };
  }, [classCode]);

  const teamMap = {};
  teams.forEach(t => { teamMap[t.id] = t; });

  const filteredMessages = filterTeam === 'all'
    ? messages
    : messages.filter(m => m.teamId === filterTeam);

  const handleDelete = async (messageId) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteMessage(classCode, messageId);
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="message-viewer">
      <h2>Team Messages</h2>

      <div className="message-viewer-filter">
        <label>Filter by team:</label>
        <select value={filterTeam} onChange={e => setFilterTeam(e.target.value)}>
          <option value="all">All Teams</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="message-viewer-list">
        {filteredMessages.length === 0 && (
          <p className="message-viewer-empty">No messages yet.</p>
        )}
        {filteredMessages.map(msg => {
          const team = teamMap[msg.teamId];
          return (
            <div key={msg.id} className="message-viewer-row">
              <div className="message-viewer-meta">
                <span
                  className="message-viewer-team"
                  style={{ color: team?.color || '#888' }}
                >
                  {team?.name || 'Unknown Team'}
                </span>
                <span className="message-viewer-sender">{msg.senderName}</span>
                <span className="message-viewer-time">{formatTime(msg.createdAt)}</span>
              </div>
              <div className="message-viewer-text">{msg.text}</div>
              <button
                className="message-viewer-delete"
                onClick={() => handleDelete(msg.id)}
                title="Delete message"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageViewer;
