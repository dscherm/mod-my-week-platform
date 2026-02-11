import React, { useState, useEffect } from 'react';
import planningToolForms from '../data/planningToolForms';
import { savePlanningToolResponse, getPlanningToolResponse } from '../services/firebaseService';

function PlanningToolModal({ tool, student, onClose, onSave }) {
  const formConfig = planningToolForms[tool.id];
  const [formData, setFormData] = useState({});
  const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'saved', 'error'
  const [loading, setLoading] = useState(true);

  // If no form config, fallback to opening the file
  useEffect(() => {
    if (!formConfig) {
      window.open(tool.file, '_blank');
      onClose();
    }
  }, [formConfig, tool.file, onClose]);

  // Load saved data on mount
  useEffect(() => {
    if (!formConfig || !student) return;

    const loadSaved = async () => {
      try {
        const saved = await getPlanningToolResponse(student.id, tool.id);
        if (saved && saved.formData) {
          setFormData(saved.formData);
        }
      } catch (e) {
        console.error('Error loading planning tool response:', e);
      }
      setLoading(false);
    };
    loadSaved();
  }, [tool.id, student, formConfig]);

  if (!formConfig) return null;

  const handleFieldChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear save status when editing
    if (saveStatus === 'saved') setSaveStatus(null);
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await savePlanningToolResponse(student.id, tool.id, {
        formData,
        toolTitle: tool.title
      });
      setSaveStatus('saved');
      if (onSave) onSave(tool.id);
    } catch (e) {
      console.error('Error saving planning tool response:', e);
      setSaveStatus('error');
    }
  };

  const renderField = (field) => {
    const value = formData[field.key] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
          >
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content planning-tool-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        <h2 className="pt-modal-title">
          <span className="pt-modal-icon">{tool.icon}</span>
          {tool.title}
        </h2>
        {tool.description && <p className="pt-modal-desc">{tool.description}</p>}

        {loading ? (
          <div className="pt-loading">Loading saved responses...</div>
        ) : (
          <div className="pt-form-sections">
            {formConfig.sections.map((section, sIdx) => (
              <div key={sIdx} className="pt-form-section">
                <h3>{section.heading}</h3>
                {section.fields.map((field) => (
                  <div key={field.key} className="pt-field">
                    <label>{field.label}</label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="pt-form-actions">
          <button className="pt-save-btn" onClick={handleSave} disabled={saveStatus === 'saving'}>
            {saveStatus === 'saving' ? 'Saving...' : 'Save'}
          </button>
          {saveStatus === 'saved' && <span className="pt-save-status saved">Saved!</span>}
          {saveStatus === 'error' && <span className="pt-save-status error">Error saving. Try again.</span>}
        </div>
      </div>
    </div>
  );
}

export default PlanningToolModal;
