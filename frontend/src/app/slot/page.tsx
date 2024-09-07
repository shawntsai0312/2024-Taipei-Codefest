'use client';
import { useState } from 'react';

const SlotMachine: React.FC = () => {
  const options = ['aadfg', 'badgfs', 'cadfghfa', 'dafdhgst', 'eagfdnb'];
  const [reelValue, setReelValue] = useState('?');
  const [isSpinning, setIsSpinning] = useState(false);

  const pullLever = () => {
    if (isSpinning) return; // Prevent multiple spins

    setIsSpinning(true);
    const spinDuration = 2000; // 2 seconds
    let spinInterval: NodeJS.Timeout;

    // Start spinning
    spinInterval = setInterval(() => {
      setReelValue(options[Math.floor(Math.random() * options.length)]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval); // Stop spinning
      setReelValue(options[Math.floor(Math.random() * options.length)]);
      setIsSpinning(false);
    }, spinDuration);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cyan-100">
      <h1 className="text-3xl font-bold mb-8">玩拉霸決定去哪玩!</h1>
      <div className="relative inline-block p-6 bg-white border-2 border-cyan-800 rounded-lg flex flex-col items-center ">
        <div
          id="reel"
          className="flex items-center justify-center w-64 h-24 text-2xl font-bold text-cyan-700 bg-gray-200 border-4 border-cyan-800 rounded-lg break-words"
          style={{
            fontSize: `${Math.min(100, 200 / reelValue.length)}px` // Adjust font size to fit the box
          }}
        >
          {reelValue}
        </div>
        <button
          className="mt-6 px-4 py-2 bg-cyan-700 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors flex justify-center items-center"
          onClick={pullLever}
          disabled={isSpinning} // Disable the button while spinning
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
