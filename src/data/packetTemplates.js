// Packet structure templates and generation helpers

export const protocols = {
  TCP: { name: 'TCP', color: '#4fc3f7', port: null },
  UDP: { name: 'UDP', color: '#81c784', port: null },
  HTTP: { name: 'HTTP', color: '#64b5f6', port: 80 },
  HTTPS: { name: 'HTTPS', color: '#7986cb', port: 443 },
  SSH: { name: 'SSH', color: '#ffb74d', port: 22 },
  DNS: { name: 'DNS', color: '#ba68c8', port: 53 },
  FTP: { name: 'FTP', color: '#f06292', port: 21 },
  SMTP: { name: 'SMTP', color: '#4db6ac', port: 25 },
  ICMP: { name: 'ICMP', color: '#90a4ae', port: null },
};

export const tcpFlags = {
  SYN: 'SYN',
  ACK: 'ACK',
  FIN: 'FIN',
  RST: 'RST',
  PSH: 'PSH',
  URG: 'URG',
  'SYN-ACK': 'SYN-ACK',
};

// Common internal IP ranges
export const internalIPRanges = [
  { prefix: '192.168.1.', range: [1, 254] },
  { prefix: '10.0.0.', range: [1, 254] },
  { prefix: '172.16.0.', range: [1, 254] },
];

// External IP patterns (simulated)
export const externalIPPatterns = [
  '203.0.113.',   // TEST-NET-3
  '198.51.100.',  // TEST-NET-2
  '185.220.101.', // Simulated attacker range
  '45.33.32.',    // Simulated external
  '104.21.35.',   // CDN-like
  '8.8.8.',       // DNS-like
];

// Common ports for normal traffic
export const commonPorts = [80, 443, 53, 22, 21, 25, 3389, 8080, 3306, 5432];

// HTTP request templates
export const httpRequests = {
  normal: [
    'GET /index.html HTTP/1.1',
    'GET /api/users HTTP/1.1',
    'POST /api/login HTTP/1.1',
    'GET /images/logo.png HTTP/1.1',
    'GET /css/styles.css HTTP/1.1',
    'GET /js/app.js HTTP/1.1',
    'GET /api/products HTTP/1.1',
    'POST /api/cart HTTP/1.1',
    'GET /favicon.ico HTTP/1.1',
    'GET /api/status HTTP/1.1',
  ],
  sqlInjection: [
    "GET /api/users?id=1' OR '1'='1 HTTP/1.1",
    "POST /login?user=admin'-- HTTP/1.1",
    "GET /search?q='; DROP TABLE users;-- HTTP/1.1",
    "GET /api/product?id=1 UNION SELECT * FROM passwords HTTP/1.1",
    "POST /api/auth?username=admin' OR 1=1-- HTTP/1.1",
    "GET /page?id=1; SELECT * FROM users HTTP/1.1",
    "GET /api/data?filter=' OR ''=' HTTP/1.1",
  ],
};

// DNS query templates
export const dnsQueries = {
  normal: [
    'A google.com',
    'A microsoft.com',
    'A github.com',
    'AAAA cloudflare.com',
    'MX company.com',
    'A cdn.example.com',
    'A api.service.com',
    'A www.example.org',
  ],
  tunneling: [
    'TXT aGVsbG8gd29ybGQ.evil.com',
    'TXT ZGF0YWV4ZmlsdHJhdGlvbg.malware.net',
    'TXT c2VjcmV0LWRhdGE.suspicious.io',
    'A cmd-exec-001.c2server.com',
    'TXT YmFzZTY0ZW5jb2RlZA.tunnel.net',
  ],
};

// SSH templates
export const sshMessages = {
  normal: [
    'SSH-2.0-OpenSSH_8.4 connection established',
    'Key exchange: ECDH SHA256',
    'User authentication successful',
    'Session opened for user admin',
  ],
  bruteForce: [
    'Authentication failed for root',
    'Authentication failed for admin',
    'Authentication failed for user',
    'Invalid password attempt',
    'Connection reset by peer',
    'Too many authentication failures',
  ],
};

// Packet size ranges by type
export const packetSizes = {
  tcp: { min: 40, max: 1500 },
  udp: { min: 28, max: 65535 },
  http: { min: 200, max: 8000 },
  dns: { min: 28, max: 512 },
  ssh: { min: 40, max: 2000 },
  icmp: { min: 28, max: 1500 },
};

// Create base packet structure
export const createPacket = (overrides = {}) => ({
  id: Math.random().toString(36).substr(2, 9),
  timestamp: new Date().toISOString(),
  sourceIP: '0.0.0.0',
  destIP: '0.0.0.0',
  sourcePort: 0,
  destPort: 0,
  protocol: 'TCP',
  length: 0,
  flags: '',
  info: '',
  payload: '',
  isMalicious: false,
  attackType: null,
  flaggedByUser: false,
  ...overrides,
});

// Generate random internal IP
export const getRandomInternalIP = () => {
  const range = internalIPRanges[Math.floor(Math.random() * internalIPRanges.length)];
  const lastOctet = Math.floor(Math.random() * (range.range[1] - range.range[0])) + range.range[0];
  return range.prefix + lastOctet;
};

// Generate random external IP
export const getRandomExternalIP = () => {
  const prefix = externalIPPatterns[Math.floor(Math.random() * externalIPPatterns.length)];
  const lastOctet = Math.floor(Math.random() * 254) + 1;
  return prefix + lastOctet;
};

// Generate random port
export const getRandomPort = (isCommon = true) => {
  if (isCommon) {
    return commonPorts[Math.floor(Math.random() * commonPorts.length)];
  }
  return Math.floor(Math.random() * 65535) + 1;
};

// Generate random packet size
export const getRandomPacketSize = (protocol = 'tcp') => {
  const sizes = packetSizes[protocol.toLowerCase()] || packetSizes.tcp;
  return Math.floor(Math.random() * (sizes.max - sizes.min)) + sizes.min;
};
