// Attack detection rules and patterns

export const attackTypes = {
  PORT_SCAN: 'port-scan',
  BRUTE_FORCE_SSH: 'brute-force-ssh',
  SQL_INJECTION: 'sql-injection',
  DATA_EXFILTRATION: 'data-exfiltration',
  DDOS: 'ddos',
  DNS_TUNNELING: 'dns-tunneling',
};

export const attackDescriptions = {
  [attackTypes.PORT_SCAN]: {
    name: 'Port Scan',
    description: 'An attacker is scanning multiple ports on your system to find open services.',
    severity: 'medium',
    indicators: [
      'Single source IP connecting to many different ports',
      'Sequential or rapid port probing',
      'SYN packets without completing handshake',
    ],
    mitigation: 'Block the scanning IP address',
  },
  [attackTypes.BRUTE_FORCE_SSH]: {
    name: 'SSH Brute Force',
    description: 'An attacker is attempting to guess SSH credentials through repeated login attempts.',
    severity: 'high',
    indicators: [
      'Multiple failed SSH authentication attempts',
      'Same source IP with repeated connections to port 22',
      'Various username attempts (root, admin, user)',
    ],
    mitigation: 'Block the attacking IP and implement rate limiting',
  },
  [attackTypes.SQL_INJECTION]: {
    name: 'SQL Injection',
    description: 'An attacker is attempting to inject malicious SQL code through web requests.',
    severity: 'critical',
    indicators: [
      'HTTP requests containing SQL keywords (SELECT, UNION, DROP)',
      'Special characters in URL parameters (\', --, ;)',
      'Attempts to manipulate database queries',
    ],
    mitigation: 'Block the source IP and review web application security',
  },
  [attackTypes.DATA_EXFILTRATION]: {
    name: 'Data Exfiltration',
    description: 'Large amounts of data are being transferred to an external IP address.',
    severity: 'critical',
    indicators: [
      'Unusually large outbound data transfers',
      'Data sent to unfamiliar external IPs',
      'Sustained high-bandwidth connections',
    ],
    mitigation: 'Block the external IP and investigate compromised system',
  },
  [attackTypes.DDOS]: {
    name: 'DDoS Attack',
    description: 'Multiple sources are flooding the network with traffic to overwhelm services.',
    severity: 'high',
    indicators: [
      'High volume of traffic from many sources',
      'Repeated requests to same destination',
      'Network bandwidth saturation',
    ],
    mitigation: 'Enable rate limiting and block attacking IPs',
  },
  [attackTypes.DNS_TUNNELING]: {
    name: 'DNS Tunneling',
    description: 'Data is being exfiltrated through encoded DNS queries.',
    severity: 'high',
    indicators: [
      'Unusual DNS query patterns',
      'Long subdomain names with encoded data',
      'High volume of TXT record queries',
    ],
    mitigation: 'Block suspicious DNS queries and investigate endpoint',
  },
};

// Detection rules for each attack type
export const detectionRules = {
  [attackTypes.PORT_SCAN]: {
    // Detect if same source IP connects to many different ports
    windowSeconds: 10,
    thresholds: {
      uniquePortsFromSameSource: 5, // 5+ different ports from same IP
      packetsPerSecond: 3,
    },
    check: (packets, windowMs = 10000) => {
      const now = Date.now();
      const recentPackets = packets.filter(
        p => new Date(p.timestamp).getTime() > now - windowMs
      );

      const sourceIPs = {};
      recentPackets.forEach(p => {
        if (!sourceIPs[p.sourceIP]) {
          sourceIPs[p.sourceIP] = new Set();
        }
        sourceIPs[p.sourceIP].add(p.destPort);
      });

      for (const [ip, ports] of Object.entries(sourceIPs)) {
        if (ports.size >= 5) {
          return { detected: true, attackerIP: ip, evidence: `${ports.size} ports scanned` };
        }
      }
      return { detected: false };
    },
  },

  [attackTypes.BRUTE_FORCE_SSH]: {
    windowSeconds: 30,
    thresholds: {
      failedAttemptsFromSameSource: 5,
    },
    check: (packets, windowMs = 30000) => {
      const now = Date.now();
      const recentPackets = packets.filter(
        p => new Date(p.timestamp).getTime() > now - windowMs &&
             p.protocol === 'SSH' &&
             p.info.toLowerCase().includes('failed')
      );

      const sourceIPs = {};
      recentPackets.forEach(p => {
        sourceIPs[p.sourceIP] = (sourceIPs[p.sourceIP] || 0) + 1;
      });

      for (const [ip, count] of Object.entries(sourceIPs)) {
        if (count >= 5) {
          return { detected: true, attackerIP: ip, evidence: `${count} failed SSH attempts` };
        }
      }
      return { detected: false };
    },
  },

  [attackTypes.SQL_INJECTION]: {
    patterns: [
      /('|"|;|--|\/\*|\*\/|union|select|insert|update|delete|drop|exec|execute)/i,
      /(or|and)\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
      /'\s*(or|and)\s*'[^']*'\s*=\s*'/i,
    ],
    check: (packets) => {
      const sqlPackets = packets.filter(p =>
        p.protocol === 'HTTP' && p.isMalicious && p.attackType === attackTypes.SQL_INJECTION
      );

      if (sqlPackets.length >= 3) {
        const attackerIP = sqlPackets[0].sourceIP;
        return { detected: true, attackerIP, evidence: `${sqlPackets.length} SQL injection attempts` };
      }
      return { detected: false };
    },
  },

  [attackTypes.DATA_EXFILTRATION]: {
    thresholds: {
      bytesPerWindow: 100000, // 100KB in window
      windowSeconds: 30,
    },
    check: (packets, windowMs = 30000) => {
      const now = Date.now();
      const recentPackets = packets.filter(
        p => new Date(p.timestamp).getTime() > now - windowMs
      );

      const outboundByDest = {};
      recentPackets.forEach(p => {
        // Check for outbound to external IPs
        if (!p.destIP.startsWith('192.168.') &&
            !p.destIP.startsWith('10.') &&
            !p.destIP.startsWith('172.16.')) {
          outboundByDest[p.destIP] = (outboundByDest[p.destIP] || 0) + p.length;
        }
      });

      for (const [ip, bytes] of Object.entries(outboundByDest)) {
        if (bytes >= 100000) {
          return { detected: true, attackerIP: ip, evidence: `${Math.round(bytes/1024)}KB exfiltrated` };
        }
      }
      return { detected: false };
    },
  },

  [attackTypes.DNS_TUNNELING]: {
    check: (packets) => {
      const dnsPackets = packets.filter(p =>
        p.protocol === 'DNS' && p.isMalicious && p.attackType === attackTypes.DNS_TUNNELING
      );

      if (dnsPackets.length >= 3) {
        const attackerIP = dnsPackets[0].sourceIP;
        return { detected: true, attackerIP, evidence: `${dnsPackets.length} suspicious DNS queries` };
      }
      return { detected: false };
    },
  },
};

// SQL injection patterns for detection
export const sqlInjectionPatterns = [
  "'",
  "\"",
  "--",
  ";",
  "/*",
  "*/",
  "UNION",
  "SELECT",
  "INSERT",
  "UPDATE",
  "DELETE",
  "DROP",
  "EXEC",
  "EXECUTE",
  "OR 1=1",
  "OR '1'='1",
  "' OR '",
];

// Check if a string contains SQL injection attempts
export const containsSQLInjection = (str) => {
  const upperStr = str.toUpperCase();
  return sqlInjectionPatterns.some(pattern =>
    upperStr.includes(pattern.toUpperCase())
  );
};
