import { useState } from 'react';
import { pseudocodeTopics, pseudocodeExercises } from '../../data/pseudocode';

function TopicLesson({ topicId, onBack, onSelectExercise }) {
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);

  const topicIndex = pseudocodeTopics.findIndex(t => t.id === topicId);
  const topic = pseudocodeTopics[topicIndex];

  const relatedExercises = pseudocodeExercises.filter(ex => ex.topic === topicId).slice(0, 5);

  if (!topic) {
    return (
      <div className="topic-lesson">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="error-message">
          <h1>Topic Not Found</h1>
          <p>This topic doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-lesson">
      <button className="back-btn" onClick={onBack}>
        ← Back to Pseudocode Hub
      </button>

      <div className="lesson-header">
        <h1>{topic.title}</h1>
        <p>{topic.explanation}</p>
      </div>

      <div className="comparison-box">
        <div className="comparison-side pseudocode">
          <h3>Pseudocode</h3>
          <div className="code-panel">
            <pre>{topic.pseudocode}</pre>
          </div>
        </div>
        <div className="comparison-side javascript">
          <h3>JavaScript</h3>
          <div className="code-panel">
            <pre>{topic.javascript}</pre>
          </div>
        </div>
      </div>

      {topic.examples && topic.examples.length > 0 && (
        <div className="examples-list">
          <h3>Examples</h3>
          {topic.examples.map((example, index) => (
            <div key={index} className="example-item">
              <div className="code-panel">
                <div className="code-panel-header given">Pseudocode</div>
                <pre>{example.pseudocode}</pre>
              </div>
              <div className="code-panel">
                <div className="code-panel-header answer">JavaScript</div>
                <pre>{example.javascript}</pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {topic.keyPoints && topic.keyPoints.length > 0 && (
        <div className="key-points">
          <h3>Key Points</h3>
          <ul>
            {topic.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {relatedExercises.length > 0 && (
        <div className="related-exercises">
          <h3>Practice Exercises</h3>
          <div className="exercises-list">
            {relatedExercises.map(exercise => (
              <div
                key={exercise.id}
                className="exercise-card"
                onClick={() => onSelectExercise(exercise.id)}
              >
                <div className="exercise-content">
                  <h4>{exercise.type.replace(/-/g, ' ')}</h4>
                  <p className="exercise-prompt">{exercise.prompt}</p>
                </div>
                <div className={`difficulty-badge ${exercise.difficulty}`}>
                  {exercise.difficulty}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicLesson;
