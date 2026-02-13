import { useState, useEffect, useRef, useCallback } from 'react';
import { scenarios } from '../data/networkScenarios';
import { ScenarioPacketGenerator } from '../utils/packetGenerator';
import { detectAttacks, calculateScore, checkSuccessCriteria, getAttackTypeName } from '../utils/attackDetector';
import { attackTypes } from '../data/attackPatterns';
import ScenarioSelector from './ScenarioSelector';
import PacketList from './PacketList';
import PacketDetail from './PacketDetail';
import AlertPanel from './AlertPanel';
import ActionPanel from './ActionPanel';

const NetworkMonitor = ({ completedScenarios, onCompleteScenario, onBack, initialScenario }) => {
  // Scenario state
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [scenarioComplete, setScenarioComplete] = useState(false);

  // Packet state
  const [packets, setPackets] = useState([]);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [packetStats, setPacketStats] = useState({ total: 0, perSecond: 0, bytes: 0 });

  // Speed control state
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(0.5); // Default to slower speed for learning

  // User actions state
  const [flaggedPackets, setFlaggedPackets] = useState([]);
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [identifiedAttackType, setIdentifiedAttackType] = useState(null);

  // Alert state
  const [detectedAlerts, setDetectedAlerts] = useState([]);

  // Results state
  const [results, setResults] = useState(null);

  // Refs
  const generatorRef = useRef(null);
  const intervalRef = useRef(null);
  const lastTickRef = useRef(Date.now());

  // Start scenario
  const startScenario = useCallback((scenario) => {
    let resolvedScenario = scenario;

    // For mystery scenarios, randomly pick an attack from the pool
    if (scenario.mystery && scenario.attackPool) {
      const randomAttack = scenario.attackPool[Math.floor(Math.random() * scenario.attackPool.length)];
      resolvedScenario = {
        ...scenario,
        attackType: randomAttack.attackType,
        attackConfig: randomAttack.attackConfig,
      };
    }

    setSelectedScenario(resolvedScenario);
    setTimeRemaining(resolvedScenario.noTimer ? 0 : resolvedScenario.duration);
    setPackets([]);
    setFlaggedPackets([]);
    setBlockedIPs([]);
    setIdentifiedAttackType(null);
    setDetectedAlerts([]);
    setSelectedPacket(null);
    setResults(null);
    setScenarioComplete(false);

    generatorRef.current = new ScenarioPacketGenerator(resolvedScenario);
    generatorRef.current.start();
    setIsRunning(true);
    lastTickRef.current = Date.now();
  }, []);

  // Auto-select scenario from initialScenario prop
  useEffect(() => {
    if (initialScenario && !selectedScenario) {
      const match = scenarios.find(s => s.id === initialScenario);
      if (match) {
        startScenario(match);
      }
    }
  }, [initialScenario, selectedScenario, startScenario]);

  // Stop scenario
  const stopScenario = useCallback(() => {
    setIsRunning(false);
    if (generatorRef.current) {
      generatorRef.current.stop();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Complete scenario and calculate results
  const completeScenario = useCallback(() => {
    stopScenario();
    setScenarioComplete(true);

    if (!selectedScenario) return;

    const actions = {
      flaggedPackets,
      blockedIPs,
      identifiedAttackType,
      completedUnderTimeLimit: timeRemaining > 0,
    };

    const scoreResult = calculateScore(actions, selectedScenario);
    const criteriaResult = checkSuccessCriteria(actions, selectedScenario, packets);

    setResults({
      score: scoreResult,
      criteria: criteriaResult,
      passed: scoreResult.passed && criteriaResult.allMet,
    });

    // Notify parent if passed
    if (scoreResult.passed && criteriaResult.allMet) {
      onCompleteScenario(selectedScenario.id, scoreResult.total);
    }
  }, [selectedScenario, flaggedPackets, blockedIPs, identifiedAttackType, timeRemaining, packets, stopScenario, onCompleteScenario]);

  // Game loop
  useEffect(() => {
    if (!isRunning || !generatorRef.current) return;

    intervalRef.current = setInterval(() => {
      // Skip updates when paused (but keep the interval running)
      if (isPaused) {
        lastTickRef.current = Date.now();
        return;
      }

      const now = Date.now();
      const deltaSeconds = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      // Apply speed multiplier to packet generation
      const adjustedDelta = deltaSeconds * speedMultiplier;

      // Generate new packets at adjusted speed
      const newPackets = generatorRef.current.generatePackets(adjustedDelta);

      setPackets(prev => {
        const updated = [...prev, ...newPackets].slice(-200); // Keep last 200 packets
        return updated;
      });

      // Update time (timer runs at normal speed even if packets are slow)
      // Skip timer for no-timer scenarios (mystery challenges)
      if (!selectedScenario?.noTimer) {
        setTimeRemaining(prev => {
          const newTime = Math.max(0, prev - deltaSeconds);
          if (newTime <= 0) {
            completeScenario();
          }
          return newTime;
        });
      }

      // Update stats
      setPacketStats(prev => ({
        total: prev.total + newPackets.length,
        perSecond: Math.round(newPackets.length / (deltaSeconds || 0.001)),
        bytes: prev.bytes + newPackets.reduce((sum, p) => sum + p.length, 0),
      }));
    }, 400); // Slower update rate (2.5 updates per second) for easier interaction

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, speedMultiplier, completeScenario]);

  // Detect attacks periodically
  useEffect(() => {
    if (!isRunning || packets.length < 5) return;

    const alerts = detectAttacks(packets, 30000);
    if (alerts.length > 0) {
      setDetectedAlerts(prev => {
        // Avoid duplicate alerts
        const newAlerts = alerts.filter(
          alert => !prev.some(p => p.type === alert.type && p.attackerIP === alert.attackerIP)
        );
        return [...prev, ...newAlerts];
      });
    }
  }, [packets, isRunning]);

  // Flag packet handler
  const handleFlagPacket = useCallback((packet) => {
    setFlaggedPackets(prev => {
      const isAlreadyFlagged = prev.some(p => p.id === packet.id);
      if (isAlreadyFlagged) {
        return prev.filter(p => p.id !== packet.id);
      }
      return [...prev, packet];
    });

    // Update the packet in the list
    setPackets(prev =>
      prev.map(p =>
        p.id === packet.id ? { ...p, flaggedByUser: !p.flaggedByUser } : p
      )
    );
  }, []);

  // Block IP handler
  const handleBlockIP = useCallback((ip) => {
    if (generatorRef.current) {
      generatorRef.current.blockIP(ip);
    }
    setBlockedIPs(prev => {
      if (prev.includes(ip)) return prev;
      return [...prev, ip];
    });
  }, []);

  // Unblock IP handler
  const handleUnblockIP = useCallback((ip) => {
    if (generatorRef.current) {
      generatorRef.current.unblockIP(ip);
    }
    setBlockedIPs(prev => prev.filter(i => i !== ip));
  }, []);

  // Identify attack type handler
  const handleIdentifyAttack = useCallback((attackType) => {
    setIdentifiedAttackType(attackType);
  }, []);

  // Reset to scenario selection
  const handleBackToSelection = useCallback(() => {
    stopScenario();
    setSelectedScenario(null);
    setPackets([]);
    setResults(null);
    setScenarioComplete(false);
  }, [stopScenario]);

  // Render scenario selection if no scenario selected
  if (!selectedScenario) {
    return (
      <div className="network-monitor">
        <div className="nm-header">
          <button className="back-btn" onClick={onBack}>&larr; Back to Dashboard</button>
          <h2>Network Monitor</h2>
          <p className="nm-subtitle">Learn to detect and respond to cyber attacks in real-time</p>
        </div>
        <ScenarioSelector
          scenarios={scenarios}
          completedScenarios={completedScenarios}
          onSelectScenario={startScenario}
        />
      </div>
    );
  }

  // Render results screen
  if (scenarioComplete && results) {
    return (
      <div className="network-monitor">
        <div className="nm-header">
          <h2>Scenario Complete</h2>
          <h3>{selectedScenario.name}</h3>
        </div>

        <div className="nm-results">
          <div className={`results-summary ${results.passed ? 'passed' : 'failed'}`}>
            <div className="result-icon">{results.passed ? '✓' : '✗'}</div>
            <h3>{results.passed ? 'Mission Accomplished!' : 'Mission Failed'}</h3>
            <div className="result-score">
              Score: {results.score.total} / {results.score.maxPossible} points
            </div>
          </div>

          <div className="results-breakdown">
            <h4>Score Breakdown</h4>
            {results.score.breakdown.map((item, idx) => (
              <div key={idx} className={`breakdown-item ${item.points >= 0 ? 'positive' : 'negative'}`}>
                <span>{item.action}</span>
                <span className="breakdown-count">x{item.count}</span>
                <span className="breakdown-points">{item.points >= 0 ? '+' : ''}{item.points}</span>
              </div>
            ))}
          </div>

          <div className="results-criteria">
            <h4>Success Criteria</h4>
            {results.criteria.details.map((item, idx) => (
              <div key={idx} className={`criteria-item ${item.met ? 'met' : 'not-met'}`}>
                <span className="criteria-icon">{item.met ? '✓' : '✗'}</span>
                <span>{item.criterion}</span>
                <span className="criteria-desc">{item.description}</span>
              </div>
            ))}
          </div>

          <div className="results-actions">
            <button className="btn-primary" onClick={() => startScenario(selectedScenario)}>
              Try Again
            </button>
            <button className="btn-secondary" onClick={handleBackToSelection}>
              Choose Another Scenario
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render active monitoring screen
  return (
    <div className="network-monitor">
      <div className="nm-header">
        <button className="back-btn" onClick={handleBackToSelection}>&larr; Back</button>
        <div className="nm-title-section">
          <h2>{selectedScenario.name}</h2>
          <span className={`difficulty ${selectedScenario.difficulty}`}>
            {selectedScenario.difficulty}
          </span>
        </div>
        <div className="nm-stats">
          {!selectedScenario.noTimer && (
            <div className="stat">
              <span className="stat-value">{Math.ceil(timeRemaining)}</span>
              <span className="stat-label">Time Left</span>
            </div>
          )}
          <div className="stat">
            <span className="stat-value">{packetStats.total}</span>
            <span className="stat-label">Packets</span>
          </div>
          <div className="stat">
            <span className="stat-value">{packetStats.perSecond}/s</span>
            <span className="stat-label">Rate</span>
          </div>
          <div className="stat">
            <span className="stat-value">{Math.round(packetStats.bytes / 1024)}KB</span>
            <span className="stat-label">Data</span>
          </div>
        </div>
        <div className="nm-controls">
          <button
            className={`btn-pause ${isPaused ? 'paused' : ''}`}
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume packet capture' : 'Pause to analyze packets'}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <div className="speed-control">
            <label>Speed:</label>
            <select
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
              title="Adjust packet speed for easier analysis"
            >
              <option value="0.25">0.25x (Very Slow)</option>
              <option value="0.5">0.5x (Slow - Recommended)</option>
              <option value="1">1x (Normal)</option>
              <option value="2">2x (Fast)</option>
            </select>
          </div>
        </div>
        <button className="btn-complete" onClick={completeScenario}>
          Complete Mission
        </button>
      </div>

      <div className="nm-objective">
        <strong>Objective:</strong> {selectedScenario.description}
      </div>

      <div className="nm-main-content">
        <div className="nm-left-panel">
          <PacketList
            packets={packets}
            selectedPacket={selectedPacket}
            flaggedPackets={flaggedPackets}
            onSelectPacket={setSelectedPacket}
            onFlagPacket={handleFlagPacket}
          />
        </div>

        <div className="nm-right-panel">
          <AlertPanel
            alerts={detectedAlerts}
            onBlockIP={handleBlockIP}
          />

          <ActionPanel
            blockedIPs={blockedIPs}
            attackTypes={Object.values(attackTypes)}
            identifiedAttackType={identifiedAttackType}
            onBlockIP={handleBlockIP}
            onUnblockIP={handleUnblockIP}
            onIdentifyAttack={handleIdentifyAttack}
            hints={selectedScenario.hints}
          />
        </div>
      </div>

      <div className="nm-bottom-panel">
        <PacketDetail packet={selectedPacket} onFlagPacket={handleFlagPacket} />
      </div>
    </div>
  );
};

export default NetworkMonitor;
