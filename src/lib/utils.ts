export const playAiAlertSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.value = 0.1;

    const playNote = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const env = ctx.createGain();
      env.connect(gainNode);
      
      env.gain.setValueAtTime(0, startTime);
      env.gain.linearRampToValueAtTime(1, startTime + 0.02);
      env.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.connect(env);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    // Play a quick ascending sequence
    playNote(880, now, 0.15); // A5
    playNote(1108.73, now + 0.1, 0.15); // C#6
    playNote(1318.51, now + 0.2, 0.3); // E6
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};
