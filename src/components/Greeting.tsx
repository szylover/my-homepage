import { useState, useEffect } from 'react';

const greetings: Record<string, string> = {
  morning: '早上好 ☀️',
  afternoon: '下午好 🌤️',
  evening: '晚上好 🌙',
  night: '夜深了 🌌',
};

function getGreeting(hour: number) {
  if (hour < 6) return greetings.night;
  if (hour < 12) return greetings.morning;
  if (hour < 18) return greetings.afternoon;
  return greetings.evening;
}

export default function Greeting() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
  const dateStr = now.toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });

  return (
    <div className="greeting">
      <div className="greeting-text">{getGreeting(now.getHours())}</div>
      <div className="greeting-time">{timeStr}</div>
      <div className="greeting-date">{dateStr}</div>
    </div>
  );
}
