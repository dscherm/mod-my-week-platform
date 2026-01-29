import { useState } from 'react';
import { Upload, FileText, Download, Plus, X, Eye } from 'lucide-react';

const TEMPLATE_TYPES = [
  { id: 'blank', name: 'Blank Worksheet', icon: '📄' },
  { id: 'guided_notes', name: 'Guided Notes', icon: '📝' },
  { id: 'practice_problems', name: 'Practice Problems', icon: '✏️' },
  { id: 'graphic_organizer', name: 'Graphic Organizer', icon: '🗺️' },
  { id: 'exit_ticket', name: 'Exit Ticket', icon: '🎫' },
  { id: 'vocabulary', name: 'Vocabulary Sheet', icon: '📚' },
];

function WorksheetEditor({ activity, onChange }) {
  const { content = {}, config = {} } = activity;
  const [dragOver, setDragOver] = useState(false);

  const updateContent = (key, value) => {
    onChange({
      ...activity,
      content: { ...content, [key]: value }
    });
  };

  const updateConfig = (key, value) => {
    onChange({
      ...activity,
      config: { ...config, [key]: value }
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      // In a real implementation, this would upload to Firebase Storage
      // For now, we'll just store the file name
      updateContent('printableUrl', URL.createObjectURL(file));
      updateContent('fileName', file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      updateContent('printableUrl', URL.createObjectURL(file));
      updateContent('fileName', file.name);
    }
  };

  const addSection = () => {
    const sections = content.sections || [];
    updateContent('sections', [...sections, {
      id: `section-${Date.now()}`,
      title: '',
      type: 'text', // 'text', 'fill_blank', 'multiple_choice', 'short_answer'
      content: ''
    }]);
  };

  const updateSection = (index, updates) => {
    const sections = [...(content.sections || [])];
    sections[index] = { ...sections[index], ...updates };
    updateContent('sections', sections);
  };

  const removeSection = (index) => {
    const sections = (content.sections || []).filter((_, i) => i !== index);
    updateContent('sections', sections);
  };

  return (
    <div className="space-y-6">
      {/* Template Type */}
      <div>
        <label className="label">Worksheet Type</label>
        <div className="grid grid-cols-3 gap-3">
          {TEMPLATE_TYPES.map(template => (
            <button
              key={template.id}
              onClick={() => updateContent('templateType', template.id)}
              className={`
                p-3 rounded-lg border text-left transition-all
                ${content.templateType === template.id
                  ? 'border-accent-purple bg-accent-purple/10'
                  : 'border-dark-border hover:border-text-muted'
                }
              `}
            >
              <span className="text-xl mr-2">{template.icon}</span>
              <span className="text-sm text-text-primary">{template.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div>
        <label className="label">Student Instructions</label>
        <textarea
          value={content.instructions || ''}
          onChange={(e) => updateContent('instructions', e.target.value)}
          placeholder="Instructions for completing this worksheet..."
          className="input min-h-[80px] resize-none"
          rows={3}
        />
      </div>

      {/* File Upload or Content Builder */}
      <div>
        <label className="label">Worksheet Content</label>

        {/* Upload option */}
        <div
          className={`
            p-6 border-2 border-dashed rounded-lg text-center transition-colors mb-4
            ${dragOver
              ? 'border-accent-purple bg-accent-purple/10'
              : 'border-dark-border hover:border-text-muted'
            }
          `}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {content.printableUrl ? (
            <div className="flex items-center justify-center gap-4">
              <FileText className="w-8 h-8 text-accent-purple" />
              <div className="text-left">
                <p className="text-text-primary font-medium">{content.fileName || 'Uploaded PDF'}</p>
                <div className="flex gap-2 mt-2">
                  <a
                    href={content.printableUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-purple hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </a>
                  <button
                    onClick={() => {
                      updateContent('printableUrl', null);
                      updateContent('fileName', null);
                    }}
                    className="text-sm text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
              <p className="text-text-muted mb-2">
                Drag & drop a PDF, or
              </p>
              <label className="btn btn-secondary cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                Upload PDF
              </label>
            </>
          )}
        </div>

        {/* Or build content */}
        <div className="text-center text-text-muted text-sm mb-4">
          — or build worksheet content below —
        </div>

        {/* Content sections */}
        <div className="space-y-4">
          {(content.sections || []).map((section, index) => (
            <div key={section.id} className="p-4 bg-dark-bg rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(index, { title: e.target.value })}
                  placeholder={`Section ${index + 1} title...`}
                  className="input flex-1"
                />
                <select
                  value={section.type}
                  onChange={(e) => updateSection(index, { type: e.target.value })}
                  className="input w-40"
                >
                  <option value="text">Text/Instructions</option>
                  <option value="fill_blank">Fill in the Blank</option>
                  <option value="short_answer">Short Answer</option>
                  <option value="multiple_choice">Multiple Choice</option>
                </select>
                <button
                  onClick={() => removeSection(index)}
                  className="p-2 text-text-muted hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={section.content}
                onChange={(e) => updateSection(index, { content: e.target.value })}
                placeholder={
                  section.type === 'fill_blank' ? 'Use ___ for blanks...' :
                  section.type === 'short_answer' ? 'Question text...' :
                  'Content...'
                }
                className="input w-full resize-none"
                rows={3}
              />
            </div>
          ))}

          <button
            onClick={addSection}
            className="w-full p-3 border-2 border-dashed border-dark-border rounded-lg text-text-muted hover:text-text-primary hover:border-text-muted transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 bg-dark-bg rounded-lg">
        <h4 className="font-medium text-text-primary mb-4">Settings</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.includeAnswerKey !== false}
              onChange={(e) => updateConfig('includeAnswerKey', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Generate answer key for teacher</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.includeNameDate !== false}
              onChange={(e) => updateConfig('includeNameDate', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Include name/date fields</span>
          </label>
        </div>
      </div>

      {/* Preview button */}
      <div className="flex justify-end">
        <button className="btn btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Preview PDF
        </button>
      </div>
    </div>
  );
}

export default WorksheetEditor;
