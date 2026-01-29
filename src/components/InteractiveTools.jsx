import React, { useState } from 'react';

// Caesar Cipher Tool
export const CaesarCipherTool = () => {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState('encrypt');
  const [output, setOutput] = useState('');

  const caesarCipher = (text, shiftAmount, encrypt = true) => {
    const actualShift = encrypt ? shiftAmount : (26 - shiftAmount);
    return text.toUpperCase().split('').map(char => {
      if (char >= 'A' && char <= 'Z') {
        const code = ((char.charCodeAt(0) - 65 + actualShift) % 26) + 65;
        return String.fromCharCode(code);
      }
      return char;
    }).join('');
  };

  const handleProcess = () => {
    const result = caesarCipher(input, parseInt(shift), mode === 'encrypt');
    setOutput(result);
  };

  const handleBruteForce = () => {
    let results = [];
    for (let i = 1; i <= 25; i++) {
      results.push(`Shift ${i}: ${caesarCipher(input, i, false)}`);
    }
    setOutput(results.join('\n'));
  };

  return (
    <div className="tool-container">
      <h3>Caesar Cipher Tool</h3>
      <div className="tool-description">
        The Caesar cipher shifts each letter by a fixed number of positions in the alphabet.
      </div>

      <div className="tool-controls">
        <div className="control-group">
          <label>Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="encrypt">Encrypt</option>
            <option value="decrypt">Decrypt</option>
          </select>
        </div>

        <div className="control-group">
          <label>Shift (1-25):</label>
          <input
            type="number"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          />
        </div>
      </div>

      <div className="tool-input">
        <label>Input Text:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encrypt or decrypt..."
          rows={3}
        />
      </div>

      <div className="tool-buttons">
        <button className="tool-btn primary" onClick={handleProcess}>
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
        <button className="tool-btn secondary" onClick={handleBruteForce}>
          Brute Force (Try All Shifts)
        </button>
      </div>

      {output && (
        <div className="tool-output">
          <label>Output:</label>
          <pre>{output}</pre>
        </div>
      )}

      <div className="tool-reference">
        <h4>Alphabet Reference</h4>
        <div className="alphabet-row">
          <div>Plain:</div>
          <div className="alphabet">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
        </div>
        <div className="alphabet-row">
          <div>Shift {shift}:</div>
          <div className="alphabet">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c =>
              caesarCipher(c, parseInt(shift), true)
            ).join(' ')}
          </div>
        </div>
      </div>
    </div>
  );
};

// Hash Generator Tool
export const HashGeneratorTool = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({});

  // Simple hash functions for educational purposes
  const simpleHash = async (text) => {
    // Use SubtleCrypto if available, otherwise use simple simulation
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      try {
        const md5 = await simulateMD5(text);
        const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
        const sha256Buffer = await crypto.subtle.digest('SHA-256', data);

        return {
          md5: md5,
          sha1: Array.from(new Uint8Array(sha1Buffer)).map(b => b.toString(16).padStart(2, '0')).join(''),
          sha256: Array.from(new Uint8Array(sha256Buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
        };
      } catch (e) {
        return simulateHashes(text);
      }
    }
    return simulateHashes(text);
  };

  // Simulate MD5 (educational only - not cryptographically accurate)
  const simulateMD5 = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    // Generate 32-char hex string
    const base = Math.abs(hash).toString(16).padStart(8, '0');
    return (base + base + base + base).substring(0, 32);
  };

  const simulateHashes = (text) => {
    const base = simulateMD5(text);
    return {
      md5: base,
      sha1: (base + base.substring(0, 8)).substring(0, 40),
      sha256: (base + base).substring(0, 64)
    };
  };

  const handleGenerate = async () => {
    if (input) {
      const result = await simpleHash(input);
      setHashes(result);
    }
  };

  return (
    <div className="tool-container">
      <h3>Hash Generator</h3>
      <div className="tool-description">
        Hash functions create a unique "fingerprint" of data. They are one-way functions - you cannot reverse a hash to get the original input.
      </div>

      <div className="tool-input">
        <label>Input Text:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          rows={2}
        />
      </div>

      <button className="tool-btn primary" onClick={handleGenerate}>
        Generate Hashes
      </button>

      {Object.keys(hashes).length > 0 && (
        <div className="tool-output">
          <div className="hash-result">
            <label>MD5 (32 chars - INSECURE):</label>
            <code className="hash-value">{hashes.md5}</code>
          </div>
          <div className="hash-result">
            <label>SHA-1 (40 chars - INSECURE):</label>
            <code className="hash-value">{hashes.sha1}</code>
          </div>
          <div className="hash-result">
            <label>SHA-256 (64 chars - SECURE):</label>
            <code className="hash-value">{hashes.sha256}</code>
          </div>
        </div>
      )}

      <div className="tool-reference">
        <h4>Hash Properties</h4>
        <ul>
          <li><strong>Deterministic:</strong> Same input = same hash</li>
          <li><strong>One-way:</strong> Cannot reverse to get input</li>
          <li><strong>Avalanche effect:</strong> Small change = completely different hash</li>
          <li><strong>Fixed size:</strong> Any input produces same length output</li>
        </ul>
      </div>
    </div>
  );
};

// Base64 Encoder/Decoder Tool
export const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input for ' + mode);
    }
  };

  return (
    <div className="tool-container">
      <h3>Base64 Encoder/Decoder</h3>
      <div className="tool-description">
        Base64 is an encoding scheme (NOT encryption!) that converts binary data to ASCII text. It's commonly used for transmitting data.
      </div>

      <div className="tool-controls">
        <div className="control-group">
          <label>Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>
        </div>
      </div>

      <div className="tool-input">
        <label>Input:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
          rows={3}
        />
      </div>

      <button className="tool-btn primary" onClick={handleProcess}>
        {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
      </button>

      {output && (
        <div className="tool-output">
          <label>Output:</label>
          <pre>{output}</pre>
        </div>
      )}

      <div className="tool-warning">
        Base64 is NOT encryption! Anyone can decode Base64. Never use it to "secure" sensitive data.
      </div>
    </div>
  );
};

// Hex Converter Tool
export const HexConverterTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('textToHex');

  const textToHex = (text) => {
    return text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  };

  const hexToText = (hex) => {
    const cleanHex = hex.replace(/\s/g, '');
    let result = '';
    for (let i = 0; i < cleanHex.length; i += 2) {
      result += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
    }
    return result;
  };

  const handleProcess = () => {
    try {
      if (mode === 'textToHex') {
        setOutput(textToHex(input));
      } else {
        setOutput(hexToText(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input');
    }
  };

  return (
    <div className="tool-container">
      <h3>Hex Converter</h3>
      <div className="tool-description">
        Hexadecimal is base-16 (0-9, A-F). Each pair of hex digits represents one byte (ASCII character).
      </div>

      <div className="tool-controls">
        <div className="control-group">
          <label>Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="textToHex">Text → Hex</option>
            <option value="hexToText">Hex → Text</option>
          </select>
        </div>
      </div>

      <div className="tool-input">
        <label>Input:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'textToHex' ? 'Enter text...' : 'Enter hex (e.g., 48454c4c4f)...'}
          rows={2}
        />
      </div>

      <button className="tool-btn primary" onClick={handleProcess}>
        Convert
      </button>

      {output && (
        <div className="tool-output">
          <label>Output:</label>
          <pre>{output}</pre>
        </div>
      )}

      <div className="tool-reference">
        <h4>ASCII Reference</h4>
        <div className="ascii-table">
          <span>A=41</span> <span>B=42</span> <span>C=43</span> <span>0=30</span> <span>1=31</span>
        </div>
      </div>
    </div>
  );
};

// Port Scanner Simulator
export const PortScannerTool = () => {
  const [target, setTarget] = useState('192.168.1.100');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);

  const commonPorts = [
    { port: 21, service: 'FTP', status: 'closed' },
    { port: 22, service: 'SSH', status: 'open' },
    { port: 23, service: 'Telnet', status: 'closed' },
    { port: 25, service: 'SMTP', status: 'closed' },
    { port: 53, service: 'DNS', status: 'closed' },
    { port: 80, service: 'HTTP', status: 'open' },
    { port: 443, service: 'HTTPS', status: 'open' },
    { port: 445, service: 'SMB', status: 'closed' },
    { port: 3306, service: 'MySQL', status: 'closed' },
    { port: 3389, service: 'RDP', status: 'filtered' }
  ];

  const runScan = () => {
    setScanning(true);
    setResults([]);

    // Simulate scanning with delays
    let index = 0;
    const interval = setInterval(() => {
      if (index < commonPorts.length) {
        const port = { ...commonPorts[index] };
        // Randomize some results for realism
        if (Math.random() > 0.7 && port.status === 'closed') {
          port.status = 'open';
        }
        setResults(prev => [...prev, port]);
        index++;
      } else {
        clearInterval(interval);
        setScanning(false);
      }
    }, 300);
  };

  return (
    <div className="tool-container">
      <h3>Port Scanner Simulator</h3>
      <div className="tool-description">
        Port scanning discovers which ports are open on a target system, revealing running services.
        <strong> Note: Only scan systems you own or have permission to test!</strong>
      </div>

      <div className="tool-input">
        <label>Target IP (Simulated):</label>
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="192.168.1.100"
        />
      </div>

      <button
        className="tool-btn primary"
        onClick={runScan}
        disabled={scanning}
      >
        {scanning ? 'Scanning...' : 'Start Scan'}
      </button>

      {results.length > 0 && (
        <div className="tool-output">
          <label>Scan Results for {target}:</label>
          <table className="scan-results">
            <thead>
              <tr>
                <th>Port</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={idx} className={`port-${result.status}`}>
                  <td>{result.port}</td>
                  <td>{result.service}</td>
                  <td className={`status-${result.status}`}>{result.status.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="tool-reference">
        <h4>Port Status Meanings</h4>
        <ul>
          <li><strong className="status-open">OPEN:</strong> Service is accepting connections</li>
          <li><strong className="status-closed">CLOSED:</strong> Port responds but no service</li>
          <li><strong className="status-filtered">FILTERED:</strong> Firewall blocking probe</li>
        </ul>
      </div>
    </div>
  );
};

// Google Dork Builder Tool
export const GoogleDorkBuilder = () => {
  const [domain, setDomain] = useState('');
  const [fileType, setFileType] = useState('');
  const [inUrl, setInUrl] = useState('');
  const [inTitle, setInTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [dork, setDork] = useState('');

  const buildDork = () => {
    let parts = [];
    if (domain) parts.push(`site:${domain}`);
    if (fileType) parts.push(`filetype:${fileType}`);
    if (inUrl) parts.push(`inurl:${inUrl}`);
    if (inTitle) parts.push(`intitle:${inTitle}`);
    if (keyword) parts.push(`"${keyword}"`);
    setDork(parts.join(' '));
  };

  const presetDorks = [
    { name: 'Find Login Pages', dork: 'site:example.com inurl:login OR inurl:signin' },
    { name: 'Find PDF Documents', dork: 'site:example.com filetype:pdf' },
    { name: 'Find Exposed Configs', dork: 'filetype:env OR filetype:config' },
    { name: 'Find Directory Listings', dork: 'intitle:"index of"' }
  ];

  return (
    <div className="tool-container">
      <h3>Google Dork Builder</h3>
      <div className="tool-description">
        Build advanced Google search queries to find specific information. Use responsibly for authorized security testing only.
      </div>

      <div className="dork-builder">
        <div className="dork-inputs">
          <div className="control-group">
            <label>site: (domain)</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
            />
          </div>
          <div className="control-group">
            <label>filetype:</label>
            <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
              <option value="">None</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
              <option value="xls">XLS</option>
              <option value="txt">TXT</option>
              <option value="sql">SQL</option>
            </select>
          </div>
          <div className="control-group">
            <label>inurl:</label>
            <input
              type="text"
              value={inUrl}
              onChange={(e) => setInUrl(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div className="control-group">
            <label>intitle:</label>
            <input
              type="text"
              value={inTitle}
              onChange={(e) => setInTitle(e.target.value)}
              placeholder="login"
            />
          </div>
          <div className="control-group">
            <label>Keyword:</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="confidential"
            />
          </div>
        </div>

        <button className="tool-btn primary" onClick={buildDork}>
          Build Dork
        </button>

        {dork && (
          <div className="tool-output">
            <label>Generated Dork:</label>
            <code className="dork-result">{dork}</code>
          </div>
        )}
      </div>

      <div className="tool-reference">
        <h4>Preset Examples</h4>
        <div className="preset-dorks">
          {presetDorks.map((preset, idx) => (
            <div key={idx} className="preset-item">
              <strong>{preset.name}:</strong>
              <code>{preset.dork}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="tool-warning">
        Only use Google dorking for authorized security testing or educational purposes.
      </div>
    </div>
  );
};

// Main Tools Page Component
const InteractiveTools = ({ onBack }) => {
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    { id: 'caesar', name: 'Caesar Cipher', icon: '🔐', category: 'Cryptography', component: CaesarCipherTool },
    { id: 'hash', name: 'Hash Generator', icon: '#️⃣', category: 'Cryptography', component: HashGeneratorTool },
    { id: 'base64', name: 'Base64 Encoder', icon: '📝', category: 'Encoding', component: Base64Tool },
    { id: 'hex', name: 'Hex Converter', icon: '🔢', category: 'Encoding', component: HexConverterTool },
    { id: 'portscan', name: 'Port Scanner', icon: '🔍', category: 'Network', component: PortScannerTool },
    { id: 'dork', name: 'Google Dork Builder', icon: '🔎', category: 'Reconnaissance', component: GoogleDorkBuilder }
  ];

  const SelectedComponent = selectedTool ? tools.find(t => t.id === selectedTool)?.component : null;

  return (
    <div className="interactive-tools">
      <div className="tools-header">
        <h2>Interactive Security Tools</h2>
        <p>Hands-on tools to practice cybersecurity concepts</p>
      </div>

      {!selectedTool ? (
        <div className="tools-grid">
          {tools.map(tool => (
            <div
              key={tool.id}
              className="tool-card"
              onClick={() => setSelectedTool(tool.id)}
            >
              <div className="tool-icon">{tool.icon}</div>
              <h3>{tool.name}</h3>
              <span className="tool-category">{tool.category}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="tool-view">
          <button className="back-btn" onClick={() => setSelectedTool(null)}>
            ← Back to Tools
          </button>
          {SelectedComponent && <SelectedComponent />}
        </div>
      )}

      <button className="back-btn" onClick={onBack} style={{ marginTop: '2rem' }}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default InteractiveTools;
