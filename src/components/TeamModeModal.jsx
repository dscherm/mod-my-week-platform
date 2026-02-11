import React, { useState, useEffect } from 'react';
import {
  saveTeamModeData,
  getTeamModeData,
  createHelpRequest,
  getStudentHelpRequests
} from '../services/firebaseService';

const TEAM_ROLES = [
  { id: 'leader', name: 'Leader', icon: '\u{1F9ED}', color: '#39ff14',
    prompt: 'Document milestones and team progress:' },
  { id: 'explainer', name: 'Explainer', icon: '\u{1F9E9}', color: '#00d4ff',
    prompt: 'Document concepts that needed further explanation:' },
  { id: 'questioner', name: 'Questioner', icon: '\u2753', color: '#bf00ff',
    prompt: 'Document important questions your team raised:' }
];

function TeamModeModal({ exerciseId, exerciseTitle, moduleName, student, onClose }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [contributions, setContributions] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [loading, setLoading] = useState(true);

  // Help request state
  const [checklistItems, setChecklistItems] = useState([false, false, false]);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [helpRequestStatus, setHelpRequestStatus] = useState('');

  // Load existing data on mount
  useEffect(() => {
    const loadData = async () => {
      if (!student?.id) { setLoading(false); return; }
      try {
        const [teamData, helpRequests] = await Promise.all([
          getTeamModeData(student.id, exerciseId),
          getStudentHelpRequests(student.classCode, student.id, exerciseId)
        ]);

        if (teamData) {
          setSelectedRole(teamData.role || '');
          setTeamMembers(teamData.teamMembers || '');
          setContributions(teamData.contributions || '');
        }

        if (helpRequests && helpRequests.length > 0) {
          setHasPendingRequest(true);
        }
      } catch (err) {
        console.error('Error loading team mode data:', err);
      }
      setLoading(false);
    };
    loadData();
  }, [student, exerciseId]);

  const handleSave = async () => {
    if (!student?.id) return;
    setSaveStatus('saving');
    try {
      await saveTeamModeData(student.id, exerciseId, {
        role: selectedRole,
        teamMembers,
        contributions,
        lastSaved: new Date().toISOString()
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      console.error('Error saving team mode data:', err);
      setSaveStatus('error');
    }
  };

  const allChecked = checklistItems.every(Boolean);

  const handleRequestHelp = async () => {
    if (!allChecked || !student?.id || hasPendingRequest) return;
    setHelpRequestStatus('sending');
    try {
      await createHelpRequest(student.classCode, {
        studentId: student.id,
        studentName: student.name,
        exerciseId,
        exerciseTitle,
        moduleName
      });
      setHasPendingRequest(true);
      setHelpRequestStatus('sent');
    } catch (err) {
      console.error('Error creating help request:', err);
      setHelpRequestStatus('error');
    }
  };

  const toggleChecklist = (index) => {
    setChecklistItems(prev => prev.map((v, i) => i === index ? !v : v));
  };

  const activeRole = TEAM_ROLES.find(r => r.id === selectedRole);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content team-mode-modal" onClick={e => e.stopPropagation()}>
        <button className="tm-close-btn" onClick={onClose}>&times;</button>
        <h2 className="tm-title">{'\u{1F465}'} Team Mode</h2>

        {loading ? (
          <p className="tm-loading">Loading...</p>
        ) : (
          <>
            {/* Role Selection */}
            <div className="tm-section">
              <h3 className="tm-section-title">Your Role</h3>
              <div className="tm-role-grid">
                {TEAM_ROLES.map(role => (
                  <button
                    key={role.id}
                    className={`tm-role-card ${selectedRole === role.id ? 'selected' : ''}`}
                    style={{
                      borderColor: selectedRole === role.id ? role.color : 'rgba(255,255,255,0.1)',
                      boxShadow: selectedRole === role.id ? `0 0 15px ${role.color}40` : 'none'
                    }}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <span className="tm-role-icon">{role.icon}</span>
                    <span className="tm-role-name" style={{ color: role.color }}>{role.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div className="tm-section">
              <h3 className="tm-section-title">Team Members</h3>
              <input
                type="text"
                className="tm-input"
                placeholder="e.g. Alice, Bob"
                value={teamMembers}
                onChange={e => setTeamMembers(e.target.value)}
              />
            </div>

            {/* Contributions (only after role selected) */}
            {selectedRole && (
              <div className="tm-section">
                <h3 className="tm-section-title">Contributions</h3>
                <label className="tm-prompt">{activeRole?.prompt}</label>
                <textarea
                  className="tm-textarea"
                  rows={4}
                  value={contributions}
                  onChange={e => setContributions(e.target.value)}
                  placeholder="Describe your contributions..."
                />
              </div>
            )}

            {/* Save Button */}
            <button className="tm-save-btn" onClick={handleSave}>
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : saveStatus === 'error' ? 'Error - Try Again' : 'Save'}
            </button>

            <hr className="tm-divider" />

            {/* Help Request Section */}
            <div className="tm-section">
              <h3 className="tm-section-title">Need Help?</h3>
              <p className="tm-help-intro">Before requesting teacher help, confirm:</p>
              <div className="tm-checklist">
                {[
                  'I have used the platform\'s resources (hints, explanations, vocab)',
                  'I have re-read the directions carefully',
                  'I have done a web search for my question'
                ].map((label, i) => (
                  <label key={i} className="tm-checklist-item">
                    <input
                      type="checkbox"
                      checked={checklistItems[i]}
                      onChange={() => toggleChecklist(i)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {hasPendingRequest ? (
                <div className="tm-help-pending">
                  {helpRequestStatus === 'sent' ? 'Request Sent!' : 'Request Already Pending'}
                </div>
              ) : (
                <button
                  className="tm-help-btn"
                  disabled={!allChecked}
                  onClick={handleRequestHelp}
                >
                  {helpRequestStatus === 'sending' ? 'Sending...' : helpRequestStatus === 'error' ? 'Error - Try Again' : 'Request Teacher Help'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeamModeModal;
