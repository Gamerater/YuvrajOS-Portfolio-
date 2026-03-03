import React, { useState, useRef, useEffect } from 'react';

interface Log { command: string; output: string | React.ReactNode }

export default function TerminalApp() {
  const [history, setHistory] = useState<Log[]>([
    { command: '', output: 'YuvrajOS Terminal v1.0.0\nType "help" for available commands.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !input.trim()) return;
    
    const cmd = input.trim().toLowerCase();
    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help': output = 'Available commands: about, skills, github, contact, clear'; break;
      case 'about': output = 'Yuvraj | 3rd-year Data Science & Analytics Student @ JECRC University.'; break;
      case 'skills': output = 'Python, Java, React, TypeScript, TailwindCSS, AI System Integration.'; break;
      case 'github': output = <a href="https://github.com/Gamerater" target="_blank" className="text-blue-400 underline">github.com/Gamerater</a>; break;
      case 'contact': output = 'Initiating secure channel... (just kidding, email me at: [your-email])'; break;
      case 'clear': setHistory([]); setInput(''); return;
      default: output = `Command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
    setInput('');
  };

  return (
    <div className="h-full w-full bg-black/90 text-green-500 font-mono p-4 text-sm md:text-base overflow-y-auto">
      {history.map((log, i) => (
        <div key={i} className="mb-2">
          {log.command && <div><span className="text-blue-400">yuvraj@neural-os:~$</span> {log.command}</div>}
          <div className="whitespace-pre-wrap mt-1 text-gray-300">{log.output}</div>
        </div>
      ))}
      <div className="flex">
        <span className="text-blue-400 mr-2">yuvraj@neural-os:~$</span>
        <input 
          autoFocus 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none border-none text-green-500"
          spellCheck={false}
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}