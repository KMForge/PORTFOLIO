import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-dark-900 flex flex-col items-center justify-center z-50">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-500 animate-spin" />
        <div className="absolute inset-2 w-16 h-16 rounded-full border-2 border-transparent border-b-cyan-400 border-l-violet-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cyan-400 font-mono font-bold text-sm">KM</span>
        </div>
      </div>
      <p className="mt-6 text-slate-400 font-mono text-sm tracking-widest animate-pulse">
        LOADING<span className="text-cyan-400">...</span>
      </p>
    </div>
  );
};

export default Loader;
