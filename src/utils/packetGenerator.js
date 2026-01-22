// Packet generation utilities for network traffic simulation

import {
  createPacket,
  getRandomInternalIP,
  getRandomExternalIP,
  getRandomPort,
  getRandomPacketSize,
  protocols,
  tcpFlags,
  httpRequests,
  dnsQueries,
  sshMessages,
} from '../data/packetTemplates';
import { attackTypes } from '../data/attackPatterns';

let packetCounter = 0;

// Generate a unique packet ID
const generatePacketId = () => {
  packetCounter++;
  return `pkt-${Date.now()}-${packetCounter}`;
};

// Generate normal background traffic packet
export const generateNormalPacket = (allowedProtocols = ['HTTP', 'HTTPS', 'DNS', 'TCP']) => {
  const protocol = allowedProtocols[Math.floor(Math.random() * allowedProtocols.length)];
  const sourceIP = getRandomInternalIP();
  const destIP = Math.random() > 0.3 ? getRandomExternalIP() : getRandomInternalIP();

  let destPort, sourcePort, info, flags;

  switch (protocol) {
    case 'HTTP':
      destPort = 80;
      sourcePort = getRandomPort(false);
      info = httpRequests.normal[Math.floor(Math.random() * httpRequests.normal.length)];
      flags = tcpFlags.ACK;
      break;
    case 'HTTPS':
      destPort = 443;
      sourcePort = getRandomPort(false);
      info = 'TLS Application Data';
      flags = tcpFlags.ACK;
      break;
    case 'DNS':
      destPort = 53;
      sourcePort = getRandomPort(false);
      info = dnsQueries.normal[Math.floor(Math.random() * dnsQueries.normal.length)];
      flags = '';
      break;
    case 'SSH':
      destPort = 22;
      sourcePort = getRandomPort(false);
      info = sshMessages.normal[Math.floor(Math.random() * sshMessages.normal.length)];
      flags = tcpFlags.ACK;
      break;
    default: // TCP
      destPort = getRandomPort(true);
      sourcePort = getRandomPort(false);
      info = 'TCP segment';
      flags = [tcpFlags.ACK, tcpFlags.PSH, tcpFlags['SYN-ACK']][Math.floor(Math.random() * 3)];
  }

  return createPacket({
    id: generatePacketId(),
    timestamp: new Date().toISOString(),
    sourceIP,
    destIP,
    sourcePort,
    destPort,
    protocol,
    length: getRandomPacketSize(protocol.toLowerCase()),
    flags,
    info,
    payload: '',
    isMalicious: false,
    attackType: null,
  });
};

// Generate port scan packet
export const generatePortScanPacket = (attackerIP, targetIP, targetPort) => {
  return createPacket({
    id: generatePacketId(),
    timestamp: new Date().toISOString(),
    sourceIP: attackerIP,
    destIP: targetIP,
    sourcePort: getRandomPort(false),
    destPort: targetPort,
    protocol: 'TCP',
    length: getRandomPacketSize('tcp'),
    flags: tcpFlags.SYN,
    info: `SYN scan to port ${targetPort}`,
    payload: '',
    isMalicious: true,
    attackType: attackTypes.PORT_SCAN,
  });
};

// Generate SSH brute force packet
export const generateSSHBruteForcePacket = (attackerIP, targetIP, username) => {
  const messages = [
    `Authentication failed for ${username}`,
    `Invalid password for ${username}`,
    `Failed password for ${username} from ${attackerIP}`,
  ];
  const info = messages[Math.floor(Math.random() * messages.length)];

  return createPacket({
    id: generatePacketId(),
    timestamp: new Date().toISOString(),
    sourceIP: attackerIP,
    destIP: targetIP,
    sourcePort: getRandomPort(false),
    destPort: 22,
    protocol: 'SSH',
    length: getRandomPacketSize('ssh'),
    flags: tcpFlags.ACK,
    info,
    payload: `SSH-2.0-OpenSSH_7.9 [AUTH FAIL: ${username}]`,
    isMalicious: true,
    attackType: attackTypes.BRUTE_FORCE_SSH,
  });
};

// Generate SQL injection packet
export const generateSQLInjectionPacket = (attackerIP, targetIP) => {
  const payload = httpRequests.sqlInjection[
    Math.floor(Math.random() * httpRequests.sqlInjection.length)
  ];

  return createPacket({
    id: generatePacketId(),
    timestamp: new Date().toISOString(),
    sourceIP: attackerIP,
    destIP: targetIP,
    sourcePort: getRandomPort(false),
    destPort: 80,
    protocol: 'HTTP',
    length: getRandomPacketSize('http'),
    flags: tcpFlags.PSH,
    info: payload,
    payload,
    isMalicious: true,
    attackType: attackTypes.SQL_INJECTION,
  });
};

// Generate data exfiltration packet
export const generateExfiltrationPacket = (sourceIP, destIP, minSize = 5000, maxSize = 15000) => {
  const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;

  return createPacket({
    id: generatePacketId(),
    timestamp: new Date().toISOString(),
    sourceIP,
    destIP,
    sourcePort: getRandomPort(false),
    destPort: 443,
    protocol: 'HTTPS',
    length: size,
    flags: tcpFlags.PSH,
    info: `Large outbound transfer (${Math.round(size / 1024)}KB)`,
    payload: `[Encrypted data: ${size} bytes]`,
    isMalicious: true,
    attackType: attackTypes.DATA_EXFILTRATION,
  });
};

// Generate DNS tunneling packet
export const generateDNSTunnelingPacket = (sourceIP, destIP) => {
  const query = dnsQueries.tunneling[
    Math.floor(Math.random() * dnsQueries.tunneling.length)
  ];

  return createPacket({
    id: generatePacketId(),
    timestamp: new Date().toISOString(),
    sourceIP,
    destIP,
    sourcePort: getRandomPort(false),
    destPort: 53,
    protocol: 'DNS',
    length: getRandomPacketSize('dns'),
    flags: '',
    info: query,
    payload: query,
    isMalicious: true,
    attackType: attackTypes.DNS_TUNNELING,
  });
};

// Packet generator class for scenarios
export class ScenarioPacketGenerator {
  constructor(scenario) {
    this.scenario = scenario;
    this.isRunning = false;
    this.attackStarted = false;
    this.attackPortIndex = 0;
    this.attackUsernameIndex = 0;
    this.elapsedTime = 0;
    this.targetIP = getRandomInternalIP();
    this.blockedIPs = new Set();
  }

  start() {
    this.isRunning = true;
    this.attackStarted = false;
    this.elapsedTime = 0;
  }

  stop() {
    this.isRunning = false;
  }

  blockIP(ip) {
    this.blockedIPs.add(ip);
  }

  unblockIP(ip) {
    this.blockedIPs.delete(ip);
  }

  isIPBlocked(ip) {
    return this.blockedIPs.has(ip);
  }

  // Generate packets for current tick
  generatePackets(deltaSeconds) {
    if (!this.isRunning) return [];

    this.elapsedTime += deltaSeconds;
    const packets = [];
    const { backgroundTraffic, attackConfig } = this.scenario;

    // Generate background traffic
    const bgPacketCount = Math.round(backgroundTraffic.packetsPerSecond * deltaSeconds);
    for (let i = 0; i < bgPacketCount; i++) {
      packets.push(generateNormalPacket(backgroundTraffic.protocols));
    }

    // Check if attack should start
    if (this.elapsedTime >= attackConfig.startDelay) {
      this.attackStarted = true;
    }

    // Generate attack traffic if started and attacker not blocked
    if (this.attackStarted && !this.isIPBlocked(attackConfig.attackerIP)) {
      const attackPacketCount = Math.round(attackConfig.packetsPerSecond * deltaSeconds);

      for (let i = 0; i < attackPacketCount; i++) {
        const attackPacket = this.generateAttackPacket();
        if (attackPacket) {
          packets.push(attackPacket);
        }
      }
    }

    return packets;
  }

  generateAttackPacket() {
    const { attackType, attackConfig } = this.scenario;

    switch (attackType) {
      case attackTypes.PORT_SCAN: {
        const port = attackConfig.targetPorts[this.attackPortIndex % attackConfig.targetPorts.length];
        this.attackPortIndex++;
        return generatePortScanPacket(attackConfig.attackerIP, this.targetIP, port);
      }

      case attackTypes.BRUTE_FORCE_SSH: {
        const username = attackConfig.usernames[this.attackUsernameIndex % attackConfig.usernames.length];
        this.attackUsernameIndex++;
        return generateSSHBruteForcePacket(attackConfig.attackerIP, this.targetIP, username);
      }

      case attackTypes.SQL_INJECTION: {
        return generateSQLInjectionPacket(attackConfig.attackerIP, this.targetIP);
      }

      case attackTypes.DATA_EXFILTRATION: {
        return generateExfiltrationPacket(
          attackConfig.sourceIP,
          attackConfig.attackerIP,
          attackConfig.minPacketSize,
          attackConfig.maxPacketSize
        );
      }

      case attackTypes.DNS_TUNNELING: {
        return generateDNSTunnelingPacket(attackConfig.sourceIP || this.targetIP, '8.8.8.8');
      }

      default:
        return null;
    }
  }

  getAttackerIP() {
    return this.scenario.attackConfig.attackerIP;
  }
}

// Reset packet counter (useful for testing)
export const resetPacketCounter = () => {
  packetCounter = 0;
};
