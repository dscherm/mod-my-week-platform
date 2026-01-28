import { useState } from 'react';
import { contentTypes } from '../../data/contentTypes';
import { createAssignment, deleteAssignment } from '../../services/firebaseService';

const AssignmentManager = ({ classCode, assignments, onAssignmentCreated }) => {
  const [creating, setCreating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Check if a module is already assigned
  const isModuleAssigned = (moduleType) => {
    return assignments.some(a => a.type === moduleType);
  };

  const handleAssignModule = async (moduleType) => {
    if (isModuleAssigned(moduleType)) {
      alert(`${contentTypes[moduleType].name} is already assigned to this class.`);
      return;
    }

    setCreating(moduleType);
    try {
      // Assign the entire module (all units)
      const allUnitIds = contentTypes[moduleType].units.map(u => u.id);
      await createAssignment(classCode, {
        type: moduleType,
        items: allUnitIds,
        title: contentTypes[moduleType].name
      });
      if (onAssignmentCreated) onAssignmentCreated();
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert('Failed to create assignment. Please try again.');
    } finally {
      setCreating(null);
    }
  };

  const handleDelete = async (assignmentId) => {
    if (!confirm('Are you sure you want to remove this module assignment?')) return;

    setDeleting(assignmentId);
    try {
      await deleteAssignment(classCode, assignmentId);
    } catch (error) {
      console.error('Error deleting assignment:', error);
      alert('Failed to delete assignment.');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="assignment-manager">
      <div className="am-header">
        <h3>Module Assignments</h3>
        <p className="am-subtitle">Assign entire modules to give students access to all content within.</p>
      </div>

      <div className="am-modules">
        {/* Cybersecurity Module */}
        <div className={`am-module-card cyber ${isModuleAssigned('cyber-range') ? 'assigned' : ''}`}>
          <div className="am-module-icon">{contentTypes['cyber-range'].icon}</div>
          <div className="am-module-info">
            <h4>{contentTypes['cyber-range'].name}</h4>
            <p>{contentTypes['cyber-range'].description}</p>
            <span className="am-module-count">
              {contentTypes['cyber-range'].units.length} categories
            </span>
          </div>
          <div className="am-module-action">
            {isModuleAssigned('cyber-range') ? (
              <div className="am-assigned-info">
                <span className="am-assigned-badge">Assigned</span>
                <button
                  className="am-remove-btn"
                  onClick={() => {
                    const assignment = assignments.find(a => a.type === 'cyber-range');
                    if (assignment) handleDelete(assignment.id);
                  }}
                  disabled={deleting}
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                className="am-btn cyber"
                onClick={() => handleAssignModule('cyber-range')}
                disabled={creating === 'cyber-range'}
              >
                {creating === 'cyber-range' ? 'Assigning...' : 'Assign Module'}
              </button>
            )}
          </div>
        </div>

        {/* Programming Module */}
        <div className={`am-module-card programming ${isModuleAssigned('arrays-loops') ? 'assigned' : ''}`}>
          <div className="am-module-icon">{contentTypes['arrays-loops'].icon}</div>
          <div className="am-module-info">
            <h4>{contentTypes['arrays-loops'].name}</h4>
            <p>{contentTypes['arrays-loops'].description}</p>
            <span className="am-module-count">
              {contentTypes['arrays-loops'].units.length} weeks
            </span>
          </div>
          <div className="am-module-action">
            {isModuleAssigned('arrays-loops') ? (
              <div className="am-assigned-info">
                <span className="am-assigned-badge">Assigned</span>
                <button
                  className="am-remove-btn"
                  onClick={() => {
                    const assignment = assignments.find(a => a.type === 'arrays-loops');
                    if (assignment) handleDelete(assignment.id);
                  }}
                  disabled={deleting}
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                className="am-btn programming"
                onClick={() => handleAssignModule('arrays-loops')}
                disabled={creating === 'arrays-loops'}
              >
                {creating === 'arrays-loops' ? 'Assigning...' : 'Assign Module'}
              </button>
            )}
          </div>
        </div>

        {/* AP CSP Module */}
        <div className={`am-module-card apcsp ${isModuleAssigned('ap-csp') ? 'assigned' : ''}`}>
          <div className="am-module-icon">{contentTypes['ap-csp'].icon}</div>
          <div className="am-module-info">
            <h4>{contentTypes['ap-csp'].name}</h4>
            <p>{contentTypes['ap-csp'].description}</p>
            <span className="am-module-count">
              {contentTypes['ap-csp'].units.length} modules
            </span>
          </div>
          <div className="am-module-action">
            {isModuleAssigned('ap-csp') ? (
              <div className="am-assigned-info">
                <span className="am-assigned-badge">Assigned</span>
                <button
                  className="am-remove-btn"
                  onClick={() => {
                    const assignment = assignments.find(a => a.type === 'ap-csp');
                    if (assignment) handleDelete(assignment.id);
                  }}
                  disabled={deleting}
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                className="am-btn apcsp"
                onClick={() => handleAssignModule('ap-csp')}
                disabled={creating === 'ap-csp'}
              >
                {creating === 'ap-csp' ? 'Assigning...' : 'Assign Module'}
              </button>
            )}
          </div>
        </div>
      </div>

      {assignments.length > 0 && (
        <div className="am-current">
          <h4>Current Assignments</h4>
          {assignments.map(assignment => (
            <div key={assignment.id} className="am-current-item">
              <span
                className="am-type-badge"
                style={{ backgroundColor: contentTypes[assignment.type]?.color || '#888' }}
              >
                {contentTypes[assignment.type]?.icon} {contentTypes[assignment.type]?.name}
              </span>
              <span className="am-date">Assigned: {formatDate(assignment.assignedAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentManager;
