import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Trophy, Flame, User, Home, BarChart2, ChevronRight, Sparkles } from 'lucide-react';

// Mock Data
const shortFilms = [
  { id: 1, title: "Cyberpunk Cityscape", author: "NeonDreams", score: 98.5, approval: 99, views: "1.2M", image: "https://picsum.photos/seed/sf1/400/300", tags: ["Sci-Fi", "3D"], description: "绝美的赛博朋克视觉盛宴，每一帧都可以作为壁纸，光影效果令人惊叹。" },
  { id: 2, title: "The Last Astronaut", author: "SpaceXplorer", score: 97.2, approval: 96, views: "980K", image: "https://picsum.photos/seed/sf2/400/300", tags: ["Space", "Realistic"], description: "孤独与浩瀚宇宙的完美结合，配乐极其震撼，让人感受到宇宙的深邃。" },
  { id: 3, title: "Ocean's Whisper", author: "DeepBlue", score: 95.8, approval: 94, views: "850K", image: "https://picsum.photos/seed/sf3/400/300", tags: ["Nature", "Fantasy"], description: "仿佛潜入深海，感受到了海洋生物的神秘低语，治愈系神作。" },
  { id: 4, title: "Mechanical Heart", author: "RoboArt", score: 94.1, approval: 91, views: "720K", image: "https://picsum.photos/seed/sf4/400/300", tags: ["Steampunk", "2D"], description: "蒸汽朋克风格的巅峰之作，机械设定非常硬核，细节满满。" },
  { id: 5, title: "Neon Samurai", author: "BladeRunner", score: 93.5, approval: 89, views: "650K", image: "https://picsum.photos/seed/sf5/400/300", tags: ["Action", "Cyberpunk"], description: "动作设计行云流水，霓虹光影效果拉满，打击感十足。" },
  { id: 6, title: "Echoes of Time", author: "ChronoVisuals", score: 92.8, approval: 87, views: "540K", image: "https://picsum.photos/seed/sf6/400/300", tags: ["Sci-Fi", "Drama"], description: "时间旅行的悖论被完美演绎，结局令人唏嘘。" },
  { id: 7, title: "Desert Mirage", author: "SandStorm", score: 91.5, approval: 85, views: "420K", image: "https://picsum.photos/seed/sf7/400/300", tags: ["Adventure", "3D"], description: "极具异域风情的视觉体验，沙丘的质感无比真实。" },
];

const shortDramas = [
  { id: 1, title: "AI Awakening: Ep 1", author: "FutureStudios", score: 99.1, approval: 98, views: "2.5M", image: "https://picsum.photos/seed/sd1/300/400", tags: ["Drama", "Series"], description: "剧情反转再反转，AI觉醒的主题发人深省，全员演技在线。" },
  { id: 2, title: "Virtual Reality Love", author: "RomanceAI", score: 98.4, approval: 95, views: "1.8M", image: "https://picsum.photos/seed/sd2/300/400", tags: ["Romance", "VR"], description: "虚拟与现实的交织，让人分不清哪边才是真爱，情感刻画细腻。" },
  { id: 3, title: "The Algorithm's Choice", author: "SciFiDaily", score: 96.7, approval: 93, views: "1.4M", image: "https://picsum.photos/seed/sd3/300/400", tags: ["Thriller", "Tech"], description: "节奏紧凑，悬疑感营造得非常到位，期待下一集的剧情走向！" },
  { id: 4, title: "Digital Ghosts", author: "HorrorGen", score: 95.2, approval: 90, views: "1.1M", image: "https://picsum.photos/seed/sd4/300/400", tags: ["Horror", "Mystery"], description: "数字幽灵的概念很新颖，氛围渲染得让人毛骨悚然，深夜慎点。" },
  { id: 5, title: "Silicon Valley 2050", author: "TechTales", score: 94.8, approval: 88, views: "900K", image: "https://picsum.photos/seed/sd5/300/400", tags: ["Comedy", "Future"], description: "对未来科技公司的讽刺喜剧，笑点密集且高级，极具现实意义。" },
  { id: 6, title: "Mars Colony", author: "RedPlanet", score: 93.2, approval: 86, views: "850K", image: "https://picsum.photos/seed/sd6/300/400", tags: ["Sci-Fi", "Survival"], description: "火星生存的艰难与人性的光辉交织，硬核科幻短剧。" },
  { id: 7, title: "The Last Cafe", author: "UrbanTales", score: 92.1, approval: 84, views: "760K", image: "https://picsum.photos/seed/sd7/300/400", tags: ["Slice of Life", "Drama"], description: "末日背景下的温馨日常，一杯咖啡带来的治愈时光。" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'films' | 'dramas'>('films');
  const [activeNav, setActiveNav] = useState('leaderboard');

  const currentData = activeTab === 'films' ? shortFilms : shortDramas;

  return (
    <div className="min-h-screen pb-24 flex flex-col items-center w-full relative">
      <Background />
      {/* Mobile App Container (Max Width for Desktop Viewing) */}
      <div className="w-full max-w-md relative min-h-screen flex flex-col z-10">
        
        {/* Header */}
        <header className="pt-12 pb-4 px-6 sticky top-0 z-40 bg-transparent">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0510]/90 via-[#0a0510]/60 to-transparent backdrop-blur-[2px] -z-10" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <AAFFLogo className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-gradient flex items-center gap-1.5">
                  AAFF 排行榜 <Sparkles className="w-4 h-4 text-blue-400" />
                </h1>
                <p className="text-[10px] text-zinc-400 mt-0.5 font-medium tracking-wide uppercase">AI Video Leaderboard</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center overflow-hidden border border-white/20 shadow-lg shrink-0">
              <img src="https://picsum.photos/seed/avatar/100/100" alt="User" className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* Segmented Control */}
          <div className="glass-panel p-1 rounded-full flex relative bg-black/40 border-white/10">
            <div 
              className="absolute inset-y-1 w-[calc(50%-4px)] bg-white/15 rounded-full shadow-sm transition-all duration-300 ease-out"
              style={{ left: activeTab === 'films' ? '4px' : 'calc(50%)' }}
            />
            <button 
              onClick={() => setActiveTab('films')}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors duration-200 ${activeTab === 'films' ? 'text-white' : 'text-zinc-400'}`}
            >
              AI 短片
            </button>
            <button 
              onClick={() => setActiveTab('dramas')}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors duration-200 ${activeTab === 'dramas' ? 'text-white' : 'text-zinc-400'}`}
            >
              AI 短剧
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <Podium top3={currentData.slice(0, 3)} />
              
              <div className="flex flex-col gap-4 mt-0 relative z-10">
                {currentData.map((item, index) => (
                  <LeaderboardItem key={item.id} item={item} rank={index + 1} isDrama={activeTab === 'dramas'} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe">
          <div className="w-full max-w-md bg-black/60 backdrop-blur-3xl border-t border-white/10 px-6 py-4 flex justify-between items-center">
            <NavItem icon={<Home />} label="首页" active={activeNav === 'home'} onClick={() => setActiveNav('home')} />
            <NavItem icon={<BarChart2 />} label="榜单" active={activeNav === 'leaderboard'} onClick={() => setActiveNav('leaderboard')} />
            <NavItem icon={<User />} label="我的" active={activeNav === 'profile'} onClick={() => setActiveNav('profile')} />
          </div>
        </nav>
      </div>
    </div>
  );
}

// --- Components ---

function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0510]">
      {/* Deep purple top left */}
      <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[50%] rounded-full bg-purple-900/40 blur-[120px]" />
      {/* Magenta top right */}
      <div className="absolute top-[5%] right-[-20%] w-[60%] h-[60%] rounded-full bg-rose-900/30 blur-[120px]" />
      {/* Gold center */}
      <div className="absolute top-[20%] left-[10%] w-[80%] h-[40%] rounded-full bg-amber-700/20 blur-[150px]" />
      {/* Bottom dark blue */}
      <div className="absolute bottom-[-10%] left-[10%] w-[80%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
      
      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)]" />
    </div>
  );
}

function Podium({ top3 }: { top3: any[] }) {
  if (top3.length < 3) return null;
  
  const [first, second, third] = top3;

  return (
    <div className="flex items-end justify-center gap-2 mt-16 mb-0 h-44 px-4">
      {/* Rank 2 */}
      <PodiumItem item={second} rank={2} height="h-24" delay={0.1} />
      {/* Rank 1 */}
      <PodiumItem item={first} rank={1} height="h-32" delay={0} />
      {/* Rank 3 */}
      <PodiumItem item={third} rank={3} height="h-20" delay={0.2} />
    </div>
  );
}

function PodiumItem({ item, rank, height, delay }: { item: any, rank: number, height: string, delay: number }) {
  const isFirst = rank === 1;
  const isSecond = rank === 2;
  
  const gradient = isFirst 
    ? 'linear-gradient(180deg, rgba(251,191,36,0.3) 0%, rgba(251,191,36,0) 100%)'
    : isSecond
    ? 'linear-gradient(180deg, rgba(161,161,170,0.3) 0%, rgba(161,161,170,0) 100%)'
    : 'linear-gradient(180deg, rgba(217,119,6,0.3) 0%, rgba(217,119,6,0) 100%)';

  const borderColor = isFirst ? 'border-amber-400/30' : isSecond ? 'border-zinc-300/30' : 'border-orange-600/30';
  const textColor = isFirst ? 'text-amber-300' : isSecond ? 'text-zinc-200' : 'text-orange-400';
  const textShadow = isFirst ? '0 2px 10px rgba(251,191,36,0.5)' : isSecond ? '0 2px 10px rgba(161,161,170,0.5)' : '0 2px 10px rgba(217,119,6,0.5)';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", bounce: 0.3 }}
      className="flex flex-col items-center flex-1 relative"
    >
      {/* Avatar/Image */}
      <div className="relative mb-2 z-10 flex flex-col items-center">
        {isFirst && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, type: "spring" }}
            className="absolute -top-5 text-xl drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] z-20"
          >
            👑
          </motion.div>
        )}
        <div className={`w-12 h-12 rounded-full p-0.5 ${isFirst ? 'bg-gradient-to-tr from-amber-500 to-yellow-200' : isSecond ? 'bg-gradient-to-tr from-zinc-400 to-zinc-100' : 'bg-gradient-to-tr from-orange-600 to-orange-300'} shadow-lg`}>
          <img src={item.image} alt={item.title} className="w-full h-full rounded-full object-cover border-[1.5px] border-[#1a0b2e]" referrerPolicy="no-referrer" />
        </div>
        
        {/* Name Bubble */}
        <div className="mt-1.5 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 shadow-xl">
          <div className="text-[9px] font-medium text-white/90 truncate max-w-[60px] text-center">{item.author}</div>
        </div>
        <div className={`text-[9px] font-bold mt-0.5 ${textColor}`} style={{ textShadow }}>
          {item.score}分
        </div>
      </div>

      {/* Pillar */}
      <div 
        className={`w-full ${height} rounded-t-xl backdrop-blur-md border-t border-l border-r ${borderColor} flex justify-center pt-2 relative shadow-[0_-4px_20px_rgba(0,0,0,0.3)]`}
        style={{ 
          background: gradient,
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        {/* Shine effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
        
        <span className="text-4xl font-black text-white/90 drop-shadow-xl relative z-10" style={{ textShadow }}>
          {rank}
        </span>
      </div>
    </motion.div>
  );
}

function LeaderboardItem({ item, rank, isDrama }: { item: any, rank: number, isDrama: boolean }) {
  const isTop3 = rank <= 3;

  return (
    <motion.div 
      whileHover={{ scale: 0.99 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-2xl cursor-pointer group relative overflow-hidden border border-white/10 shadow-lg bg-[#242426]"
    >
      {/* Background Image with Gradient Fade (Clear at top, solid at bottom) */}
      <div className="absolute top-0 left-0 w-full h-[140px] z-0 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" 
          referrerPolicy="no-referrer" 
        />
        {/* Gradient overlay to fade the image into the solid background color */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#242426]/60 to-[#242426]" />
      </div>

      <div className="relative z-10 p-4 flex flex-col gap-3">
        {/* Header: Rank & Title */}
        <div className="flex items-start gap-3 mb-1 pt-12"> {/* Added pt-12 to push content down over the clear image */}
          <RankBadge rank={rank} />
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-lg font-bold text-white truncate leading-tight drop-shadow-md">{item.title}</h3>
            <p className="text-sm text-zinc-300 truncate mt-1 drop-shadow-md">作者: {item.author}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4">
          <CircularProgress value={item.approval} label="好评率" />
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-medium text-zinc-300">评分 {item.score}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-zinc-400">播放 {item.views}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="ml-auto flex gap-1.5 self-end">
            {item.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-1 rounded bg-white/10 backdrop-blur-md text-[10px] font-medium text-white/90 border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description Quote */}
        <div className="bg-black/20 rounded-xl p-3 relative border border-white/5 group-hover:bg-black/30 transition-colors mt-1">
          <div className="absolute top-2.5 left-2.5 text-zinc-500 font-serif text-2xl leading-none">"</div>
          <p className="text-xs text-zinc-300 pl-5 pr-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          <div className="absolute bottom-1 right-2.5 text-zinc-500 font-serif text-2xl leading-none rotate-180">"</div>
        </div>
      </div>
    </motion.div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank > 3) {
    return (
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 font-bold text-sm border border-white/10 shrink-0">
        {rank}
      </div>
    );
  }

  const colors = [
    { fill: "url(#gold-grad)", text: "#78350f", dropShadow: "drop-shadow(0 4px 6px rgba(251, 191, 36, 0.3))" },
    { fill: "url(#silver-grad)", text: "#18181b", dropShadow: "drop-shadow(0 4px 6px rgba(161, 161, 170, 0.3))" },
    { fill: "url(#bronze-grad)", text: "#431407", dropShadow: "drop-shadow(0 4px 6px rgba(217, 119, 6, 0.3))" }
  ][rank - 1];

  return (
    <div className="relative flex items-center justify-center w-10 h-11 shrink-0" style={{ filter: colors.dropShadow }}>
      <svg viewBox="0 0 40 48" className="absolute inset-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="silver-grad" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4F4F5" />
            <stop offset="0.5" stopColor="#A1A1AA" />
            <stop offset="1" stopColor="#71717A" />
          </linearGradient>
          <linearGradient id="bronze-grad" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDBA74" />
            <stop offset="0.5" stopColor="#EA580C" />
            <stop offset="1" stopColor="#9A3412" />
          </linearGradient>
        </defs>
        <path d="M0 4C0 1.79086 1.79086 0 4 0H36C38.2091 0 40 1.79086 40 4V40.2361C40 42.1912 38.281 43.6967 36.3571 43.4214L21.4286 41.2857C20.4762 41.1497 19.5238 41.1497 18.5714 41.2857L3.64286 43.4214C1.71895 43.6967 0 42.1912 0 40.2361V4Z" fill={colors.fill}/>
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center -mt-1">
        <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: colors.text, opacity: 0.8 }}>TOP</span>
        <span className="text-lg font-black leading-none" style={{ color: colors.text }}>{rank}</span>
      </div>
    </div>
  );
}

function CircularProgress({ value, label }: { value: number, label: string }) {
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  // Color based on value
  const colorClass = value >= 95 ? "text-rose-500" : value >= 90 ? "text-amber-500" : "text-blue-500";

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            className="text-white/10"
          />
          {/* Progress circle */}
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-[10px] font-bold ${colorClass}`}>{value}</span>
        </div>
      </div>
      <span className="text-[10px] text-zinc-400 font-medium">{label}</span>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 w-16"
    >
      <div className={`transition-all duration-300 ${active ? 'text-blue-400 scale-110' : 'text-zinc-500 hover:text-zinc-400'}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <span className={`text-[10px] font-medium transition-colors duration-300 ${active ? 'text-blue-400' : 'text-zinc-500'}`}>
        {label}
      </span>
    </button>
  );
}

function AAFFLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 45 L65 60 L95 45 L55 45 L50 15 L45 45 Z" fill="currentColor" />
      <path d="M5 45 L35 85 L80 68 L95 45" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M35 85 L65 60" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

