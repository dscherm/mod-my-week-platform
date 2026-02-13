import { useState, useEffect, useRef } from 'react';
import { getStudentTeam, sendTeamMessage, subscribeToTeamMessages } from '../services/firebaseService';
import PixelAvatar from './PixelAvatar';

const TeamChat = ({ classCode, currentUser, clothingItemsMap = {} }) => {
  const [team, setTeam] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!classCode || !currentUser) return;

    let unsubMessages = null;

    const loadTeam = async () => {
      const studentTeam = await getStudentTeam(classCode, currentUser.id);
      setTeam(studentTeam);
      setLoading(false);

      if (studentTeam) {
        unsubMessages = subscribeToTeamMessages(classCode, studentTeam.id, (msgs) => {
          setMessages(msgs);
        });
      }
    };

    loadTeam();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [classCode, currentUser]);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || !team || !currentUser) return;

    setText('');
    await sendTeamMessage(classCode, {
      teamId: team.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: trimmed
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <div className="team-chat-loading">Loading...</div>;
  }

  if (!team) {
    return (
      <div className="team-chat-no-team">
        Not assigned to a team yet. Ask your teacher to assign you!
      </div>
    );
  }

  return (
    <div className="team-chat">
      <div className="team-chat-header">
        <span className="team-chat-name" style={{ color: team.color || '#00FFFF' }}>
          {team.name}
        </span>
      </div>

      <div className="team-chat-messages">
        {messages.length === 0 && (
          <div className="team-chat-empty">No messages yet. Say hello!</div>
        )}
        {messages.map(msg => {
          const isOwn = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`team-chat-message ${isOwn ? 'own' : ''}`}>
              {!isOwn && (
                <div className="team-chat-avatar">
                  <PixelAvatar size={24} clothingItems={clothingItemsMap} />
                </div>
              )}
              <div className="team-chat-bubble">
                {!isOwn && <div className="team-chat-sender">{msg.senderName}</div>}
                <div className="team-chat-text">{msg.text}</div>
                <div className="team-chat-time">{formatTime(msg.createdAt)}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="team-chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 500))}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          maxLength={500}
        />
        <button onClick={handleSend} disabled={!text.trim()}>Send</button>
      </div>
    </div>
  );
};

export default TeamChat;
