import { useState } from 'react';
import { Plus, X, GripVertical, CheckCircle, Circle } from 'lucide-react';

const QUESTION_TYPES = [
  { id: 'multiple_choice', name: 'Multiple Choice' },
  { id: 'true_false', name: 'True/False' },
  { id: 'short_answer', name: 'Short Answer' },
  { id: 'matching', name: 'Matching' },
];

function QuizEditor({ activity, onChange }) {
  const { content = {}, config = {} } = activity;

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

  const addQuestion = () => {
    const questions = content.questions || [];
    updateContent('questions', [...questions, {
      id: `q-${Date.now()}`,
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }]);
  };

  const updateQuestion = (index, updates) => {
    const questions = [...(content.questions || [])];
    questions[index] = { ...questions[index], ...updates };
    updateContent('questions', questions);
  };

  const removeQuestion = (index) => {
    const questions = (content.questions || []).filter((_, i) => i !== index);
    updateContent('questions', questions);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const questions = [...(content.questions || [])];
    const options = [...questions[qIndex].options];
    options[optIndex] = value;
    questions[qIndex] = { ...questions[qIndex], options };
    updateContent('questions', questions);
  };

  const addOption = (qIndex) => {
    const questions = [...(content.questions || [])];
    questions[qIndex] = {
      ...questions[qIndex],
      options: [...questions[qIndex].options, '']
    };
    updateContent('questions', questions);
  };

  const removeOption = (qIndex, optIndex) => {
    const questions = [...(content.questions || [])];
    const options = questions[qIndex].options.filter((_, i) => i !== optIndex);
    // Adjust correct answer if needed
    let correctAnswer = questions[qIndex].correctAnswer;
    if (correctAnswer >= optIndex) {
      correctAnswer = Math.max(0, correctAnswer - 1);
    }
    questions[qIndex] = { ...questions[qIndex], options, correctAnswer };
    updateContent('questions', questions);
  };

  return (
    <div className="space-y-6">
      {/* Questions */}
      <div className="space-y-4">
        {(content.questions || []).map((question, qIndex) => (
          <div key={question.id} className="p-4 bg-dark-bg rounded-lg space-y-4">
            {/* Question header */}
            <div className="flex items-start gap-3">
              <button className="mt-2 cursor-grab text-text-muted hover:text-text-primary">
                <GripVertical className="w-4 h-4" />
              </button>
              <span className="mt-2 w-6 h-6 bg-accent-purple/20 rounded-full flex items-center justify-center text-sm text-accent-purple font-medium">
                {qIndex + 1}
              </span>
              <div className="flex-1 space-y-3">
                {/* Question type */}
                <select
                  value={question.type}
                  onChange={(e) => updateQuestion(qIndex, { type: e.target.value })}
                  className="input w-40"
                >
                  {QUESTION_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>

                {/* Question text */}
                <textarea
                  value={question.question}
                  onChange={(e) => updateQuestion(qIndex, { question: e.target.value })}
                  placeholder="Enter your question..."
                  className="input w-full resize-none"
                  rows={2}
                />

                {/* Multiple choice options */}
                {question.type === 'multiple_choice' && (
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuestion(qIndex, { correctAnswer: optIndex })}
                          className={`flex-shrink-0 ${
                            question.correctAnswer === optIndex
                              ? 'text-green-400'
                              : 'text-text-muted hover:text-text-primary'
                          }`}
                        >
                          {question.correctAnswer === optIndex ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                          placeholder={`Option ${optIndex + 1}...`}
                          className="input flex-1"
                        />
                        {question.options.length > 2 && (
                          <button
                            onClick={() => removeOption(qIndex, optIndex)}
                            className="p-1 text-text-muted hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {question.options.length < 6 && (
                      <button
                        onClick={() => addOption(qIndex)}
                        className="text-sm text-accent-purple hover:underline"
                      >
                        + Add option
                      </button>
                    )}
                  </div>
                )}

                {/* True/False options */}
                {question.type === 'true_false' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => updateQuestion(qIndex, { correctAnswer: 'true' })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        question.correctAnswer === 'true'
                          ? 'border-green-400 bg-green-400/10 text-green-400'
                          : 'border-dark-border text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {question.correctAnswer === 'true' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                      True
                    </button>
                    <button
                      onClick={() => updateQuestion(qIndex, { correctAnswer: 'false' })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        question.correctAnswer === 'false'
                          ? 'border-green-400 bg-green-400/10 text-green-400'
                          : 'border-dark-border text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {question.correctAnswer === 'false' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                      False
                    </button>
                  </div>
                )}

                {/* Short answer */}
                {question.type === 'short_answer' && (
                  <input
                    type="text"
                    value={question.correctAnswer || ''}
                    onChange={(e) => updateQuestion(qIndex, { correctAnswer: e.target.value })}
                    placeholder="Expected answer (for grading)..."
                    className="input"
                  />
                )}

                {/* Explanation */}
                <div>
                  <label className="text-xs text-text-muted">Explanation (shown after answering)</label>
                  <input
                    type="text"
                    value={question.explanation || ''}
                    onChange={(e) => updateQuestion(qIndex, { explanation: e.target.value })}
                    placeholder="Why this is the correct answer..."
                    className="input mt-1"
                  />
                </div>
              </div>

              <button
                onClick={() => removeQuestion(qIndex)}
                className="p-2 text-text-muted hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="w-full p-3 border-2 border-dashed border-dark-border rounded-lg text-text-muted hover:text-text-primary hover:border-text-muted transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {/* Settings */}
      <div className="p-4 bg-dark-bg rounded-lg">
        <h4 className="font-medium text-text-primary mb-4">Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.shuffleQuestions || false}
              onChange={(e) => updateConfig('shuffleQuestions', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Shuffle questions</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.shuffleOptions || false}
              onChange={(e) => updateConfig('shuffleOptions', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Shuffle options</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.showFeedback !== false}
              onChange={(e) => updateConfig('showFeedback', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Show feedback</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.allowRetry || false}
              onChange={(e) => updateConfig('allowRetry', e.target.checked)}
              className="rounded border-dark-border"
            />
            <span className="text-sm text-text-secondary">Allow retry</span>
          </label>
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary">Passing score:</label>
            <input
              type="number"
              min="0"
              max="100"
              value={config.passingScore || 70}
              onChange={(e) => updateConfig('passingScore', parseInt(e.target.value))}
              className="input w-20"
            />
            <span className="text-xs text-text-muted">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizEditor;
