// Attack detection utilities

import { attackTypes, attackDescriptions, detectionRules } from '../data/attackPatterns';

// Detect attacks in packet stream
export const detectAttacks = (packets, windowMs = 30000) => {
  const detectedAttacks = [];

  // Check each attack type
  for (const [attackType, rule] of Object.entries(detectionRules)) {
    if (rule.check) {
      const result = rule.check(packets, windowMs);
      if (result.detected) {
        detectedAttacks.push({
          type: attackType,
          attackerIP: result.attackerIP,
          evidence: result.evidence,
          timestamp: new Date().toISOString(),
          ...attackDescriptions[attackType],
        });
      }
    }
  }

  return detectedAttacks;
};

// Check if a specific attack type is present
export const isAttackPresent = (packets, attackType, windowMs = 30000) => {
  const rule = detectionRules[attackType];
  if (!rule || !rule.check) return false;

  const result = rule.check(packets, windowMs);
  return result.detected;
};

// Get attack statistics from packets
export const getAttackStats = (packets) => {
  const stats = {
    totalPackets: packets.length,
    maliciousPackets: 0,
    byAttackType: {},
    attackerIPs: new Set(),
  };

  packets.forEach(packet => {
    if (packet.isMalicious) {
      stats.maliciousPackets++;
      stats.attackerIPs.add(packet.sourceIP);

      if (packet.attackType) {
        stats.byAttackType[packet.attackType] = (stats.byAttackType[packet.attackType] || 0) + 1;
      }
    }
  });

  stats.attackerIPs = Array.from(stats.attackerIPs);
  return stats;
};

// Calculate score based on user actions
export const calculateScore = (actions, scenario) => {
  let score = 0;
  const breakdown = [];

  // Points for correctly flagged malicious packets
  const correctFlags = actions.flaggedPackets.filter(p => p.isMalicious);
  const falsePositives = actions.flaggedPackets.filter(p => !p.isMalicious);

  if (correctFlags.length > 0) {
    const flagPoints = correctFlags.length * 5;
    score += flagPoints;
    breakdown.push({ action: 'Correctly flagged malicious packets', count: correctFlags.length, points: flagPoints });
  }

  if (falsePositives.length > 0) {
    const penalty = falsePositives.length * 2;
    score -= penalty;
    breakdown.push({ action: 'False positive flags (penalty)', count: falsePositives.length, points: -penalty });
  }

  // Points for correctly identifying attack type
  if (actions.identifiedAttackType === scenario.attackType) {
    score += 15;
    breakdown.push({ action: 'Correctly identified attack type', count: 1, points: 15 });
  }

  // Points for blocking attacker IP
  const attackerIP = scenario.attackConfig.attackerIP;
  const blockedAttacker = actions.blockedIPs.includes(attackerIP);
  const incorrectBlocks = actions.blockedIPs.filter(ip => ip !== attackerIP);

  if (blockedAttacker) {
    score += 10;
    breakdown.push({ action: 'Blocked attacker IP', count: 1, points: 10 });
  }

  if (incorrectBlocks.length > 0) {
    const penalty = incorrectBlocks.length * 5;
    score -= penalty;
    breakdown.push({ action: 'Incorrectly blocked innocent IP (penalty)', count: incorrectBlocks.length, points: -penalty });
  }

  // Time bonus
  if (actions.completedUnderTimeLimit && score > 0) {
    score += 5;
    breakdown.push({ action: 'Completed under time limit', count: 1, points: 5 });
  }

  return {
    total: Math.max(0, score),
    maxPossible: scenario.points,
    breakdown,
    passed: score >= scenario.points * 0.6, // 60% to pass
  };
};

// Check if scenario success criteria are met
export const checkSuccessCriteria = (actions, scenario, packets) => {
  const criteria = scenario.successCriteria;
  const results = {
    allMet: true,
    details: [],
  };

  // Check if attacker was blocked
  if (criteria.mustBlockAttacker) {
    const blocked = actions.blockedIPs.includes(scenario.attackConfig.attackerIP);
    results.details.push({
      criterion: 'Block attacker IP',
      met: blocked,
      description: blocked ? 'Attacker IP blocked' : 'Attacker IP not blocked',
    });
    if (!blocked) results.allMet = false;
  }

  // Check if attack type was identified
  if (criteria.mustIdentifyAttackType) {
    const identified = actions.identifiedAttackType === scenario.attackType;
    results.details.push({
      criterion: 'Identify attack type',
      met: identified,
      description: identified ? 'Attack type correctly identified' : 'Attack type not identified',
    });
    if (!identified) results.allMet = false;
  }

  // Check minimum flagged packets
  if (criteria.minMaliciousPacketsFlagged) {
    const flaggedMalicious = actions.flaggedPackets.filter(p => p.isMalicious).length;
    const met = flaggedMalicious >= criteria.minMaliciousPacketsFlagged;
    results.details.push({
      criterion: `Flag at least ${criteria.minMaliciousPacketsFlagged} malicious packets`,
      met,
      description: `Flagged ${flaggedMalicious} malicious packets`,
    });
    if (!met) results.allMet = false;
  }

  return results;
};

// Get severity color for UI
export const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical': return '#f44336';
    case 'high': return '#ff9800';
    case 'medium': return '#ffeb3b';
    case 'low': return '#4caf50';
    default: return '#90a4ae';
  }
};

// Get attack type display name
export const getAttackTypeName = (attackType) => {
  return attackDescriptions[attackType]?.name || attackType;
};

// Get attack type description
export const getAttackTypeDescription = (attackType) => {
  return attackDescriptions[attackType] || null;
};

export { attackTypes, attackDescriptions };
