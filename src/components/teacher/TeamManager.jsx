import { useState, useEffect } from 'react';
import { subscribeToTeams, createTeam, updateTeam, deleteTeam } from '../../services/firebaseService';

const TEAM_COLORS = ['#00FFFF', '#FF00FF', '#39FF14', '#FF6600', '#FFD700', '#FF0080', '#00D4FF', '#BF00FF'];

const TeamManager = ({ classCode, students }) => {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamColor, setNewTeamColor] = useState(TEAM_COLORS[0]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [autoTeamCount, setAutoTeamCount] = useState(2);

  useEffect(() => {
    if (!classCode) return;
    const unsub = subscribeToTeams(classCode, setTeams);
    return () => unsub();
  }, [classCode]);

  // Build a map: studentId -> team
  const studentTeamMap = {};
  teams.forEach(t => {
    t.memberIds?.forEach(id => {
      studentTeamMap[id] = t;
    });
  });

  const unassignedStudents = students.filter(s => !studentTeamMap[s.id]);

  const toggleMember = (studentId) => {
    setSelectedMembers(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;
    await createTeam(classCode, {
      name: newTeamName.trim(),
      memberIds: selectedMembers,
      color: newTeamColor
    });
    setNewTeamName('');
    setSelectedMembers([]);
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Delete this team? Members will become unassigned.')) return;
    await deleteTeam(classCode, teamId);
  };

  const handleAutoAssign = async () => {
    const count = Math.max(2, Math.min(autoTeamCount, unassignedStudents.length));
    const shuffled = [...unassignedStudents].sort(() => Math.random() - 0.5);
    const teamNames = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel'];

    for (let i = 0; i < count; i++) {
      const members = [];
      for (let j = i; j < shuffled.length; j += count) {
        members.push(shuffled[j].id);
      }
      await createTeam(classCode, {
        name: `Team ${teamNames[i] || i + 1}`,
        memberIds: members,
        color: TEAM_COLORS[i % TEAM_COLORS.length]
      });
    }
  };

  const handleRemoveMember = async (team, studentId) => {
    const newMembers = team.memberIds.filter(id => id !== studentId);
    await updateTeam(classCode, team.id, { memberIds: newMembers });
  };

  const handleAddMemberToTeam = async (team, studentId) => {
    const newMembers = [...(team.memberIds || []), studentId];
    await updateTeam(classCode, team.id, { memberIds: newMembers });
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student?.name || studentId;
  };

  return (
    <div className="team-manager">
      <h2>Team Manager</h2>

      {/* Full class roster with team assignments */}
      <div className="team-roster">
        <h3>All Students ({students.length})</h3>
        {students.length === 0 ? (
          <p className="team-empty">No students in this class yet.</p>
        ) : (
          <div className="team-roster-list">
            {students.map(student => {
              const team = studentTeamMap[student.id];
              return (
                <div key={student.id} className="team-roster-row">
                  <span className="team-roster-name">{student.name}</span>
                  {team ? (
                    <span className="team-roster-badge" style={{ borderColor: team.color, color: team.color }}>
                      {team.name}
                    </span>
                  ) : (
                    <span className="team-roster-badge unassigned">Unassigned</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Team Form */}
      <div className="team-create-form">
        <h3>Create New Team</h3>
        <div className="team-form-row">
          <input
            type="text"
            value={newTeamName}
            onChange={e => setNewTeamName(e.target.value)}
            placeholder="Team name..."
            className="team-name-input"
          />
          <div className="team-color-picker">
            {TEAM_COLORS.map(color => (
              <button
                key={color}
                className={`team-color-swatch ${newTeamColor === color ? 'active' : ''}`}
                style={{ background: color }}
                onClick={() => setNewTeamColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="team-member-select">
          <label>Select members ({unassignedStudents.length} unassigned):</label>
          <div className="team-member-checkboxes">
            {unassignedStudents.map(student => (
              <label key={student.id} className="team-member-checkbox">
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(student.id)}
                  onChange={() => toggleMember(student.id)}
                />
                {student.name}
              </label>
            ))}
            {unassignedStudents.length === 0 && students.length > 0 && (
              <span className="team-no-unassigned">All students are assigned to teams</span>
            )}
          </div>
        </div>

        <button
          className="confirm-btn approve"
          onClick={handleCreateTeam}
          disabled={!newTeamName.trim()}
        >
          Create Team
        </button>
      </div>

      {/* Auto-Assign */}
      {unassignedStudents.length >= 2 && (
        <div className="team-auto-assign">
          <h3>Auto-Assign Unassigned Students</h3>
          <div className="team-form-row">
            <label>Number of teams:</label>
            <input
              type="number"
              min="2"
              max={unassignedStudents.length}
              value={autoTeamCount}
              onChange={e => setAutoTeamCount(parseInt(e.target.value) || 2)}
              className="team-count-input"
            />
            <button className="confirm-btn approve" onClick={handleAutoAssign}>
              Auto-Assign ({unassignedStudents.length} students)
            </button>
          </div>
        </div>
      )}

      {/* Existing Teams */}
      <div className="team-list">
        <h3>Teams ({teams.length})</h3>
        {teams.length === 0 && <p className="team-empty">No teams created yet.</p>}
        {teams.map(team => (
          <div key={team.id} className="team-card" style={{ borderColor: team.color }}>
            <div className="team-card-header">
              <span className="team-card-name" style={{ color: team.color }}>
                {team.name} ({team.memberIds?.length || 0})
              </span>
              <div className="team-card-actions">
                <button
                  className="team-delete-btn"
                  onClick={() => handleDeleteTeam(team.id)}
                  title="Delete team"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="team-card-members">
              {team.memberIds?.map(memberId => (
                <div key={memberId} className="team-member-row">
                  <span>{getStudentName(memberId)}</span>
                  <button
                    className="team-remove-member"
                    onClick={() => handleRemoveMember(team, memberId)}
                    title="Remove from team"
                  >
                    x
                  </button>
                </div>
              ))}
              {(!team.memberIds || team.memberIds.length === 0) && (
                <span className="team-no-members">No members</span>
              )}
            </div>
            {/* Quick add unassigned to this team */}
            {unassignedStudents.length > 0 && (
              <div className="team-add-member">
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddMemberToTeam(team, e.target.value);
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="" disabled>+ Add student...</option>
                  {unassignedStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
