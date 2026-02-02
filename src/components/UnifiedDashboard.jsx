import { challenges } from '../data/challenges';
import { scenarios } from '../data/networkScenarios';
import { exercises, getWeekExercises } from '../data/exercises';
import { contentTypes } from '../data/contentTypes';
import { pseudocodeTopics, pseudocodeExercises } from '../data/pseudocode';
import { flowchartExercises } from '../data/flowcharts';
import { dataApisExercises, getDataApisWeekExercises } from '../data/data-apis-exercises';

const UnifiedDashboard = ({
  studentName,
  totalPoints,
  assignments,
  completedChallenges,
  completedScenarios,
  completedExercises,
  completedPseudocode = [],
  completedFlowcharts = [],
  completedDataApisExercises = [],
  onSelectCategory,
  onSelectNetworkMonitor,
  onSelectWeek,
  onSelectAPCSP,
  onSelectDataApisWeek
}) => {
  // Check if entire modules are assigned
  const hasCyberModule = assignments.some(a => a.type === 'cyber-range');
  const hasProgrammingModule = assignments.some(a => a.type === 'arrays-loops');
  const hasAPCSPModule = assignments.some(a => a.type === 'ap-csp');
  const hasDataApisModule = assignments.some(a => a.type === 'data-apis');

  // Calculate cyber-range progress
  const getCyberCategoryProgress = (categoryId) => {
    if (categoryId === 'network-monitor') {
      return {
        completed: completedScenarios.length,
        total: scenarios.length,
        percentage: scenarios.length > 0 ? (completedScenarios.length / scenarios.length) * 100 : 0
      };
    }
    const categoryChalls = challenges[categoryId] || [];
    const completed = categoryChalls.filter(c => completedChallenges.includes(c.id)).length;
    return {
      completed,
      total: categoryChalls.length,
      percentage: categoryChalls.length > 0 ? (completed / categoryChalls.length) * 100 : 0
    };
  };

  // Calculate programming progress
  const getWeekProgress = (weekKey) => {
    const weekExercises = getWeekExercises(weekKey);
    const completed = weekExercises.filter(e => completedExercises.includes(e.id)).length;
    return {
      completed,
      total: weekExercises.length,
      percentage: weekExercises.length > 0 ? (completed / weekExercises.length) * 100 : 0
    };
  };

  // Calculate AP CSP progress
  const getAPCSPProgress = (unitId) => {
    if (unitId === 'pseudocode') {
      return {
        completed: completedPseudocode.length,
        total: pseudocodeExercises.length,
        percentage: pseudocodeExercises.length > 0 ? (completedPseudocode.length / pseudocodeExercises.length) * 100 : 0
      };
    } else {
      return {
        completed: completedFlowcharts.length,
        total: flowchartExercises.length,
        percentage: flowchartExercises.length > 0 ? (completedFlowcharts.length / flowchartExercises.length) * 100 : 0
      };
    }
  };

  // Calculate Data & APIs progress
  const getDataApisWeekProgress = (weekKey) => {
    const weekExercises = getDataApisWeekExercises(weekKey);
    const completed = weekExercises.filter(e => completedDataApisExercises.includes(e.id)).length;
    return {
      completed,
      total: weekExercises.length,
      percentage: weekExercises.length > 0 ? (completed / weekExercises.length) * 100 : 0
    };
  };

  // Get total stats
  const totalChallengesCompleted = completedChallenges.length + completedScenarios.length;
  const totalExercisesCompleted = completedExercises.length;
  const totalAPCSPCompleted = completedPseudocode.length + completedFlowcharts.length;
  const totalDataApisCompleted = completedDataApisExercises.length;

  const cyberCategories = [
    { id: 'cryptography', name: 'Cryptography', icon: '[ CRYPTO ]', description: 'Encryption, ciphers, and secure communication' },
    { id: 'network', name: 'Network Security', icon: '[ NETWORK ]', description: 'Network protocols, ports, and traffic analysis' },
    { id: 'password', name: 'Password Security', icon: '[ PASSWD ]', description: 'Password strength and authentication' },
    { id: 'web', name: 'Web Security', icon: '[ WEB ]', description: 'Web vulnerabilities and secure coding' },
    { id: 'social', name: 'Social Engineering', icon: '[ SOCIAL ]', description: 'Manipulation tactics and security awareness' },
    { id: 'network-monitor', name: 'Network Monitor', icon: '[ MONITOR ]', description: 'Real-time traffic analysis', isScenario: true }
  ];

  const apCSPCategories = [
    { id: 'pseudocode', name: 'Pseudocode', icon: '[ CODE ]', description: 'Translate between AP CSP pseudocode and JavaScript' },
    { id: 'flowcharts', name: 'Flowcharts', icon: '[ FLOW ]', description: 'Read, interpret, and build flowcharts' }
  ];

  const hasAssignments = hasCyberModule || hasProgrammingModule || hasAPCSPModule || hasDataApisModule;

  return (
    <div className="unified-dashboard">
      <div className="welcome-section">
        <h1>Welcome, {studentName}!</h1>
        <p>Complete your assigned work below. Track your progress across both cybersecurity and programming content.</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <span className="stat-value">{totalPoints}</span>
          <span className="stat-label">Total Points</span>
        </div>
        <div className="stat-card cyber">
          <span className="stat-value">{totalChallengesCompleted}</span>
          <span className="stat-label">Cyber Challenges</span>
        </div>
        <div className="stat-card programming">
          <span className="stat-value">{totalExercisesCompleted}</span>
          <span className="stat-label">Programming Exercises</span>
        </div>
        <div className="stat-card apcsp">
          <span className="stat-value">{totalAPCSPCompleted}</span>
          <span className="stat-label">AP CSP Exercises</span>
        </div>
        <div className="stat-card data-apis">
          <span className="stat-value">{totalDataApisCompleted}</span>
          <span className="stat-label">Data & APIs</span>
        </div>
      </div>

      {!hasAssignments ? (
        <div className="no-assignments">
          <div className="no-assignments-icon">[ WAITING ]</div>
          <h2>No Assignments Yet</h2>
          <p>Your teacher hasn't assigned any content yet. Check back soon!</p>
        </div>
      ) : (
        <>
          {hasCyberModule && (
            <section className="content-section cyber-section">
              <h2 className="section-title cyber">
                <span className="section-icon">{contentTypes['cyber-range'].icon}</span>
                Cybersecurity Challenges
              </h2>

              <div className="categories">
                {cyberCategories.map(category => {
                  const progress = getCyberCategoryProgress(category.id);
                  return (
                    <div
                      key={category.id}
                      className="category-card cyber"
                      onClick={() => category.isScenario ? onSelectNetworkMonitor() : onSelectCategory(category.id)}
                    >
                      <div className="category-icon">{category.icon}</div>
                      <h3>{category.name}</h3>
                      <p className="category-description">{category.description}</p>
                      <p className="category-progress-text">
                        {progress.completed} / {progress.total} completed
                      </p>
                      <div className="category-progress">
                        <div
                          className="category-progress-bar cyber"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {hasProgrammingModule && (
            <section className="content-section programming-section">
              <h2 className="section-title programming">
                <span className="section-icon">{contentTypes['arrays-loops'].icon}</span>
                Programming Exercises
              </h2>

              <div className="categories">
                {Object.entries(exercises).map(([weekKey, week]) => {
                  const progress = getWeekProgress(weekKey);
                  const weekNum = weekKey.replace('week', '');
                  return (
                    <div
                      key={weekKey}
                      className="category-card programming"
                      onClick={() => onSelectWeek(weekKey)}
                    >
                      <div className="category-icon">[ WEEK {weekNum} ]</div>
                      <h3>{week.title}</h3>
                      <p className="category-description">{week.bigIdea}</p>
                      <p className="category-progress-text">
                        {progress.completed} / {progress.total} completed
                      </p>
                      <div className="category-progress">
                        <div
                          className="category-progress-bar programming"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {hasAPCSPModule && (
            <section className="content-section apcsp-section">
              <h2 className="section-title apcsp">
                <span className="section-icon">{contentTypes['ap-csp'].icon}</span>
                AP CSP Exam Prep
              </h2>

              <div className="categories">
                {apCSPCategories.map(category => {
                  const progress = getAPCSPProgress(category.id);
                  return (
                    <div
                      key={category.id}
                      className="category-card apcsp"
                      onClick={() => onSelectAPCSP(category.id)}
                    >
                      <div className="category-icon">{category.icon}</div>
                      <h3>{category.name}</h3>
                      <p className="category-description">{category.description}</p>
                      <p className="category-progress-text">
                        {progress.completed} / {progress.total} completed
                      </p>
                      <div className="category-progress">
                        <div
                          className="category-progress-bar apcsp"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {hasDataApisModule && (
            <section className="content-section data-apis-section">
              <h2 className="section-title data-apis">
                <span className="section-icon">{contentTypes['data-apis'].icon}</span>
                Data & APIs
              </h2>

              <div className="categories">
                {Object.entries(dataApisExercises).map(([weekKey, week]) => {
                  const progress = getDataApisWeekProgress(weekKey);
                  const weekNum = weekKey.replace('week', '');
                  return (
                    <div
                      key={weekKey}
                      className="category-card data-apis"
                      onClick={() => onSelectDataApisWeek(weekKey)}
                    >
                      <div className="category-icon">[ WEEK {weekNum} ]</div>
                      <h3>{week.title}</h3>
                      <p className="category-description">{week.bigIdea}</p>
                      <p className="category-progress-text">
                        {progress.completed} / {progress.total} completed
                      </p>
                      <div className="category-progress">
                        <div
                          className="category-progress-bar data-apis"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      <div className="learning-objectives">
        <h3>About This Platform</h3>
        <ul>
          <li>Complete assigned challenges and exercises at your own pace</li>
          <li>Earn points by completing each activity</li>
          <li>Your progress is automatically saved</li>
          <li>Access vocabulary terms for help with key concepts</li>
        </ul>
      </div>
    </div>
  );
};

export default UnifiedDashboard;
