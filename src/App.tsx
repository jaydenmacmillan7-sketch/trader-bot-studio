import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Settings, 
  Play, 
  Pause, 
  Square, 
  Users, 
  Cpu, 
  Signal, 
  TrendingUp, 
  Activity,
  LogOut,
  Target,
  History,
  Camera,
  User,
  Sparkles,
  ExternalLink,
  Bot,
  Menu,
  FileText,
  Info,
  ShieldAlert,
  Globe,
  Database,
  X,
  CreditCard,
  BarChart3,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Waves,
  Droplets,
  Anchor,
  Fish,
  Zap,
  Layers,
  Search,
  Plus,
  ArrowRight,
  Image as ImageIcon,
  Clipboard,
  Upload,
  BrainCircuit,
  Wallet,
  GraduationCap,
  Radio,
  Share2,
  MessageSquare,
  Gavel,
  Shield,
  FileCheck,
  Send,
  MessageCircle,
  ZapOff,
  Palette,
  Calculator,
  RefreshCw,
  Layout
} from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

// Constants
const AURORA_FX_TITLE = "AURORA.FX";
const APP_ICON = "https://storage.googleapis.com/dala-prod-public-storage/attachments/89bec409-c49b-4a6d-8def-d1eae1c9d9ab/1778372011919_f8731a577595955caed5a7df3fce23dc_3.jpg";
const CYBER_BOT_CORE = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/727efe06-3119-4cef-947f-6803eda7c467/aquatic-bot-core-539cd563-1778436030893.webp";
const EXTERNAL_DASHBOARD_URL = "https://forex-automation-pro-1.preview.emergentagent.com/deshboard";

const MT5_SYMBOLS = [
  "EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "USDCHF", "NZDUSD",
  "EURGBP", "EURJPY", "GBPJPY", "EURCHF", "AUDJPY", "NZDJPY", "CADJPY",
  "XAUUSD", "XAGUSD", "BTCUSD", "ETHUSD", "SOLUSD", "US30", "NAS100"
];

const PRESET_COLORS = [
  { name: 'Cyan Neon', hex: '#00f2ff' },
  { name: 'Pulse Pink', hex: '#ff007b' },
  { name: 'Emerald', hex: '#00ff88' },
  { name: 'Electric Gold', hex: '#ffcc00' },
  { name: 'Hyper Blue', hex: '#2962ff' },
  { name: 'Vibrant Orange', hex: '#ff6d00' },
];

const PRESET_BACKGROUNDS = [
  { name: 'Deep Space', url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/727efe06-3119-4cef-947f-6803eda7c467/nebula-pulse-a56d2a51-1778439868441.webp' },
  { name: 'Cyber Core', url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/727efe06-3119-4cef-947f-6803eda7c467/cyber-core-a25c4ddf-1778439865314.webp' },
  { name: 'Liquid Tech', url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/727efe06-3119-4cef-947f-6803eda7c467/liquid-tech-f5a3b2dc-1778439865585.webp' },
];

const STRATEGIES = [
  { id: 'tidal', name: 'Tidal Scalper', description: 'High frequency, low risk', winRate: 0.82, risk: 'Low' },
  { id: 'deep', name: 'Deep Trend', description: 'Long term momentum', winRate: 0.75, risk: 'Medium' },
  { id: 'abyssal', name: 'Abyssal HFT', description: 'Ultra-fast execution', winRate: 0.88, risk: 'High' }
];

// Types
type BotStatus = 'idle' | 'running' | 'paused';
type Platform = 'MT4' | 'MT5';
type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  price: number;
  profit: number;
  time: string;
}

interface TerminalLog {
  id: string;
  time: string;
  source: 'SYS' | 'AUTH' | 'LINK' | 'SCAN' | 'HUB' | 'CORE' | 'AI' | 'CHAT';
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'execution';
}

interface ChatMessage {
  id: string;
  user: string;
  avatar?: string;
  content: string;
  timestamp: string;
  isAI?: boolean;
}

// Utility to convert hex to RGB for CSS variables
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
    '0, 242, 255';
};

// Sub-components
function SignalAnalysis({ isOpen, onClose, onAddLog, accentColor }: { isOpen: boolean, onClose: () => void, onAddLog: (s: TerminalLog['source'], m: string, t?: TerminalLog['type']) => void, accentColor: string }) {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setImage(event.target?.result as string);
            toast.success('Signal screenshot detected');
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    if (!image) return;
    setAnalyzing(true);
    setResult(null);
    onAddLog('AI', 'Initiating neural vision scan...', 'info');
    
    setTimeout(() => {
      setResult({
        symbol: 'XAUUSD',
        action: 'BUY',
        entry: 2045.50,
        sl: 2038.00,
        tp: 2060.00,
        confidence: '94%'
      });
      setAnalyzing(false);
      onAddLog('AI', 'Signal decomposition complete. Pattern matched.', 'success');
      toast.success('Signal Analyzed Successfully');
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 text-white border-white/10 max-w-md rounded-[2.5rem] overflow-hidden backdrop-blur-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ color: accentColor }}>
            <BrainCircuit className="w-5 h-5" />
            Signal Intelligence
          </DialogTitle>
          <DialogDescription className="text-white/40">
            Paste or upload a trading signal screenshot for instant analysis.
          </DialogDescription>
        </DialogHeader>

        <div 
          onPaste={handlePaste}
          className="min-h-[200px] border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-4 bg-white/5 relative overflow-hidden transition-all hover:bg-white/10"
        >
          {image ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <img src={image} className="max-h-[160px] rounded-lg object-contain mb-4" alt="Signal" />
              <Button variant="ghost" size="sm" onClick={() => setImage(null)} className="absolute top-0 right-0 text-red-500"><X /></Button>
            </div>
          ) : (
            <>
              <Clipboard className="w-10 h-10 mb-2 opacity-20" />
              <p className="text-xs text-white/40">Ctrl+V to Paste or</p>
              <input type="file" id="signal-upload" className="hidden" onChange={handleFileUpload} />
              <Button variant="link" style={{ color: accentColor }} onClick={() => document.getElementById('signal-upload')?.click()}>Browse File</Button>
            </>
          )}

          {analyzing && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 rounded-full mb-4"
                style={{ borderColor: accentColor, borderTopColor: 'transparent' }}
              />
              <p className="font-bold animate-pulse uppercase tracking-widest text-xs" style={{ color: accentColor }}>ANALYZING WAVEFORMS...</p>
            </div>
          )}
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 p-4 rounded-2xl space-y-3 border border-white/10 shadow-inner">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-black opacity-40">Identified Asset</span>
              <Badge style={{ backgroundColor: accentColor, color: '#000' }} className="font-black">{result.symbol}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-black/40 p-2 rounded-xl"><p className="text-[8px] uppercase opacity-40">Action</p><p className="font-bold text-green-400">{result.action}</p></div>
              <div className="bg-black/40 p-2 rounded-xl"><p className="text-[8px] uppercase opacity-40">Confidence</p><p className="font-bold" style={{ color: accentColor }}>{result.confidence}</p></div>
              <div className="bg-black/40 p-2 rounded-xl"><p className="text-[8px] uppercase opacity-40">Entry</p><p className="font-bold">{result.entry}</p></div>
              <div className="bg-black/40 p-2 rounded-xl"><p className="text-[8px] uppercase opacity-40">Target</p><p className="font-bold text-blue-400">{result.tp}</p></div>
            </div>
          </motion.div>
        )}

        <DialogFooter className="mt-4">
          <Button 
            disabled={!image || analyzing} 
            onClick={startAnalysis}
            className="w-full font-black h-12 rounded-2xl"
            style={{ backgroundColor: accentColor, color: '#000' }}
          >
            {analyzing ? 'PROCESSING...' : result ? 'RE-ANALYZE' : 'EXECUTE SCAN'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  // --- State ---
  const [licenseKey, setLicenseKey] = useState(() => localStorage.getItem('aurora_license_key') || '');
  const [userName, setUserName] = useState(() => localStorage.getItem('aurora_user_name') || '');
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem('aurora_profile_image') || '');
  const [appBackground, setAppBackground] = useState(() => localStorage.getItem('aurora_app_background') || '');
  const [bgOpacity, setBgOpacity] = useState(() => Number(localStorage.getItem('aurora_bg_opacity')) || 80);
  const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('aurora_authorized') === 'true');
  
  // Color Customization States
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('aurora_accent_color') || '#00f2ff');
  const [customHex, setCustomHex] = useState(accentColor);
  
  // Automation States
  const [autoTradeLimit, setAutoTradeLimit] = useState(() => Number(localStorage.getItem('aurora_trade_limit')) || 10);
  const [tradesExecuted, setTradesExecuted] = useState(0);

  const [botStatus, setBotStatus] = useState<BotStatus>('idle');
  const [platform, setPlatform] = useState<Platform>('MT5');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(isAuthorized ? 'connected' : 'disconnected');
  const [selectedSymbol, setSelectedSymbol] = useState('XAUUSD');
  const [activeTab, setActiveTab] = useState('trading');
  const [progress, setProgress] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState(STRATEGIES[0]);
  
  const [trades, setTrades] = useState<Trade[]>([]);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);
  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Chat States
  const [chatMessage, setChatMessage] = useState('');
  const [communityMessages, setCommunityMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Admin', content: 'Welcome to the AURORA.FX Trading Community. Keep it professional.', timestamp: '09:00 AM' },
    { id: '2', user: 'TradersPro', content: 'XAUUSD looks very bullish on H4. Anyone taking the wave?', timestamp: '10:15 AM' },
    { id: '3', user: 'MarketWizard', content: 'EURUSD rejected 1.0850. Potential reversal.', timestamp: '10:45 AM' }
  ]);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'AURORA AI', content: 'Greetings Operator. I am your trusted AI assistant. How can I enhance your trading experience today?', timestamp: 'Now', isAI: true }
  ]);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const tradingInterval = useRef<any>(null);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('aurora_user_name', userName);
    localStorage.setItem('aurora_license_key', licenseKey);
    localStorage.setItem('aurora_profile_image', profileImage);
    localStorage.setItem('aurora_app_background', appBackground);
    localStorage.setItem('aurora_bg_opacity', String(bgOpacity));
    localStorage.setItem('aurora_authorized', String(isAuthorized));
    localStorage.setItem('aurora_accent_color', accentColor);
    localStorage.setItem('aurora_trade_limit', String(autoTradeLimit));
  }, [userName, licenseKey, profileImage, appBackground, bgOpacity, isAuthorized, accentColor, autoTradeLimit]);

  const addLog = useCallback((source: TerminalLog['source'], message: string, type: TerminalLog['type'] = 'info') => {
    const newLog: TerminalLog = {
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString(),
      source,
      message,
      type
    };
    setTerminalLogs(prev => [newLog, ...prev].slice(0, 30));
  }, []);

  useEffect(() => {
    if (isAuthorized && terminalLogs.length === 0) {
      addLog('SYS', 'AURORA.FX Neural Engine v4.0.0 initializing...', 'info');
      addLog('AUTH', `Deep Node ${licenseKey.slice(0, 8)} active.`, 'info');
      addLog('LINK', 'Cyber Broker Bridge established.', 'success');
    }
  }, [isAuthorized, addLog, licenseKey, terminalLogs.length]);

  useEffect(() => {
    if (botStatus === 'running') {
      const progInterval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + Math.random() * 8));
      }, 300);

      tradingInterval.current = setInterval(() => {
        // Check auto-trade limit
        if (tradesExecuted >= autoTradeLimit) {
          setBotStatus('idle');
          addLog('CORE', `Auto-Trade limit (${autoTradeLimit}) reached. Bot halted.`, 'warning');
          toast.warning(`Trading Cycle Complete: ${autoTradeLimit} trades executed.`);
          return;
        }

        const winRate = selectedStrategy.winRate;
        const isWin = Math.random() < winRate;
        const isBuy = Math.random() > 0.5;
        const price = selectedSymbol === 'XAUUSD' ? 2000 + Math.random() * 100 : 1.0 + Math.random() * 0.1;
        const profit = isWin ? (Math.random() * 50 + 10) : -(Math.random() * 30 + 5);
        
        const newTrade: Trade = {
          id: Math.random().toString(36).substr(2, 9),
          symbol: selectedSymbol,
          type: isBuy ? 'BUY' : 'SELL',
          price: parseFloat(price.toFixed(5)),
          profit: parseFloat(profit.toFixed(2)),
          time: new Date().toLocaleTimeString(),
        };

        setTrades(prev => [newTrade, ...prev].slice(0, 20));
        setTradesExecuted(prev => prev + 1);
        addLog('CORE', `[${selectedStrategy.name}] Executed ${newTrade.type} on ${selectedSymbol}`, 'execution');
        
        if (profit > 0) {
          toast.success(`Trade Success: +$${profit.toFixed(2)} (${selectedSymbol})`);
        } else {
          toast.error(`Drawdown: -$${Math.abs(profit).toFixed(2)} (${selectedSymbol})`);
        }
      }, 5000 + Math.random() * 5000);

      return () => {
        clearInterval(progInterval);
        if (tradingInterval.current) clearInterval(tradingInterval.current);
      };
    } else {
      setProgress(0);
      if (tradingInterval.current) clearInterval(tradingInterval.current);
    }
  }, [botStatus, selectedSymbol, selectedStrategy, addLog, tradesExecuted, autoTradeLimit]);

  const handleActivate = () => {
    if (!userName.trim()) {
      toast.error('Operator name required');
      return;
    }
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(licenseKey) || licenseKey === 'AURORA-CYBER-2025' || licenseKey.length > 8) {
      toast.success(`Access Granted. Welcome, ${userName}.`);
      setIsAuthorized(true);
      setConnectionStatus('connecting');
      setTimeout(() => {
        setConnectionStatus('connected');
        addLog('LINK', 'Cyber uplink stable.', 'success');
      }, 2000);
    } else {
      toast.error('Invalid License Key');
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setConnectionStatus('disconnected');
    setBotStatus('idle');
    localStorage.removeItem('aurora_authorized');
  };

  const sendMessage = (type: 'community' | 'ai') => {
    if (!chatMessage.trim()) return;
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: userName || 'Operator',
      content: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (type === 'community') {
      setCommunityMessages(prev => [...prev, newMsg]);
      setChatMessage('');
      addLog('CHAT', 'Community transmission broadcasted.', 'info');
    } else {
      setAiMessages(prev => [...prev, newMsg]);
      setChatMessage('');
      
      // AI Response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          user: 'AURORA AI',
          content: `Analysis complete. Based on current market liquidity for ${selectedSymbol}, I recommend monitoring the ${selectedStrategy.name} engine for optimal divergence patterns.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAI: true
        };
        setAiMessages(prev => [...prev, aiResponse]);
        addLog('AI', 'Neural response generated.', 'success');
      }, 1000);
    }
  };

  const neonStyles = useMemo(() => {
    const rgb = hexToRgb(accentColor);
    return `
      :root {
        --accent-color: ${accentColor};
        --accent-rgb: ${rgb};
      }
      .cyber-gradient { background: linear-gradient(135deg, #000000 0%, #020617 100%); }
      .glass-neon { 
        background: rgba(255, 255, 255, 0.03); 
        backdrop-filter: blur(20px); 
        border: 1px solid rgba(255, 255, 255, 0.08); 
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4); 
      }
      .glass-neon:hover { border-color: rgba(${rgb}, 0.2); }
      .active-glow { box-shadow: 0 0 40px rgba(${rgb}, 0.15); border-color: rgba(${rgb}, 0.3) !important; }
      .accent-text { color: ${accentColor}; text-shadow: 0 0 12px rgba(${rgb}, 0.5); }
      .accent-bg { background-color: ${accentColor}; }
      .accent-border { border-color: ${accentColor}; }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .progress-bar { background: ${accentColor}; box-shadow: 0 0 15px ${accentColor}; }
    `;
  }, [accentColor]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen cyber-gradient flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
        <style>{neonStyles}</style>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm space-y-10 z-10">
          <div className="text-center space-y-4">
            <div className="mx-auto w-32 h-32 rounded-[2.5rem] overflow-hidden border-2 border-white/10 p-1 bg-black/40 relative">
              <img src={APP_ICON} alt="AURORA" className="w-full h-full object-cover rounded-[2.2rem]" />
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ repeat: Infinity, duration: 4 }} 
                className="absolute inset-0 border-4 rounded-[2.5rem]"
                style={{ borderColor: `rgba(${hexToRgb(accentColor)}, 0.1)` }}
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-5xl font-black tracking-tighter accent-text">{AURORA_FX_TITLE}</h1>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Neural Trading Node</p>
            </div>
          </div>

          <Card className="glass-neon rounded-[3rem] overflow-hidden border-white/5">
            <CardHeader><CardTitle className="text-lg flex items-center gap-3 text-white font-black"><LockKeyhole className="w-5 h-5" style={{ color: accentColor }} />Identity Verification</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white/40 text-[10px] font-black uppercase tracking-widest px-2">Operator</Label>
                  <Input placeholder="Codename or Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="bg-white/5 border-white/10 h-14 text-white font-bold rounded-2xl focus:border-white/40 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/40 text-[10px] font-black uppercase tracking-widest px-2">Access License</Label>
                  <Input placeholder="UUID-XXXX-XXXX-XXXX" value={licenseKey} onChange={(e) => setLicenseKey(e.target.value)} className="bg-white/5 border-white/10 h-14 font-mono text-sm rounded-2xl focus:border-white/40 transition-all" style={{ color: accentColor }} />
                </div>
              </div>
              <Button 
                onClick={handleActivate} 
                className="w-full font-black h-16 rounded-2xl shadow-xl transition-all active:scale-95"
                style={{ backgroundColor: accentColor, color: '#000' }}
              >
                INITIALIZE LINK
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <Toaster position="top-center" theme="dark" closeButton />
      </div>
    );
  }

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-white flex flex-col font-sans relative overflow-hidden bg-black">
      <style>{neonStyles}</style>
      <Toaster position="top-center" theme="dark" closeButton />

      {/* Dynamic Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={appBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: appBackground ? `url(${appBackground})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Visual Overlay / Cyber Gradient */}
      <div 
        className="fixed inset-0 z-0 cyber-gradient transition-opacity duration-700 pointer-events-none"
        style={{ opacity: appBackground ? bgOpacity / 100 : 1 }}
      />

      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-3xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10">
                <Menu className="w-6 h-6" style={{ color: accentColor }} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-white w-[85vw] border-r border-white/10 p-0 overflow-hidden flex flex-col">
              <div className="p-8 pb-4">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10">
                    <img src={APP_ICON} className="w-full h-full object-cover" alt="Logo" />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl accent-text">AURORA.FX</h3>
                    <p className="text-[10px] text-white/40 font-black">NEURAL NODE</p>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/5" />
              
              <ScrollArea className="flex-1">
                <div className="p-6 space-y-1">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3 px-2">Main Terminal</p>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('trading')}><Activity className="w-5 h-5" />Live Terminal</Button>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => { setIsSignalModalOpen(true); setIsMenuOpen(false); }}><BrainCircuit className="w-5 h-5" />Signal Intel</Button>
                  
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-6 mb-3 px-2">Customization</p>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('config')}><Palette className="w-5 h-5" />Visual Settings</Button>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('automation')}><Calculator className="w-5 h-5" />Auto-Trade Config</Button>

                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-6 mb-3 px-2">Communication</p>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('aichat')}><Bot className="w-5 h-5" />AI Enhancement Chat</Button>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('community')}><Users className="w-5 h-5" />Chat List / Community</Button>
                  
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-6 mb-3 px-2">Knowledge Base</p>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('services')}><ShieldCheck className="w-5 h-5" />Our Services</Button>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('symbols')}><BarChart3 className="w-5 h-5" />Signal Symbols Info</Button>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('conduct')}><Gavel className="w-5 h-5" />Code of Conduct</Button>
                  <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-white/60 hover:text-white hover:bg-white/5" onClick={() => navigateTo('privacy')}><FileCheck className="w-5 h-5" />Privacy & Policies</Button>
                </div>
              </ScrollArea>
              
              <div className="p-6 pt-0 mt-auto">
                <Button variant="ghost" className="w-full justify-start h-14 rounded-xl gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={handleLogout}><LogOut className="w-5 h-5" />Eject Module</Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-3">
            <h2 className="font-black text-2xl tracking-tighter accent-text">AURORA</h2>
            <Badge className="bg-white/5 text-white/40 border-white/10 text-[8px] px-2 py-0">v4.0.CYBER</Badge>
          </div>
        </div>
        <button onClick={() => setActiveTab('config')} className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-0.5 relative z-50">
          {profileImage ? <img src={profileImage} className="w-full h-full object-cover rounded-[1rem]" /> : <User className="w-full h-full p-2 text-white/20" />}
        </button>
      </header>

      <main className="flex-1 px-5 pb-36 space-y-8 pt-8 overflow-y-auto z-10 scrollbar-hide">
        {activeTab === 'trading' && (
          <>
            <section className="px-1">
              <Card className="glass-neon rounded-[2.5rem] p-6 relative overflow-hidden active-glow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/5 p-2 rounded-xl"><Database className="w-5 h-5" style={{ color: accentColor }} /></div>
                    <div><h4 className="text-sm font-black text-white">Neural Gateway</h4><p className="text-[9px] text-white/40 uppercase">Node: <span style={{ color: accentColor }}>ACTIVE_4</span></p></div>
                  </div>
                  <Badge className="bg-white text-black font-black text-[8px] h-5">REAL ACCOUNT</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-white/40 uppercase mb-1">Target</p>
                    <div className="flex items-center justify-between"><span className="text-lg font-black text-white">{selectedSymbol}</span><Radio className="w-4 h-4 animate-pulse" style={{ color: accentColor }} /></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-white/40 uppercase mb-1">Execution</p>
                    <div className="flex items-center justify-between"><span className="text-lg font-black text-white">{autoTradeLimit - tradesExecuted} REM</span><Calculator className="w-4 h-4" style={{ color: accentColor }} /></div>
                  </div>
                </div>
              </Card>
            </section>

            <section className="relative px-1">
              <Card className="glass-neon border-none overflow-hidden rounded-[4rem] min-h-[400px] flex flex-col items-center justify-center relative active-glow">
                <AnimatePresence>
                  {botStatus === 'running' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {[1, 2, 3].map((i) => (
                        <motion.div 
                          key={i} 
                          animate={{ scale: [1, 2.5], opacity: [0.2, 0] }} 
                          transition={{ duration: 4, repeat: Infinity, delay: i }} 
                          className="absolute w-40 h-40 rounded-full border-2"
                          style={{ borderColor: accentColor }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="relative group">
                  <motion.img 
                    animate={botStatus === 'running' ? { y: [0, -15, 0], scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 5, repeat: Infinity }}
                    src={CYBER_BOT_CORE} className="w-56 h-56 object-cover rounded-[4rem] border-4 border-white/10 relative z-10 shadow-2xl" 
                  />
                  <div className="absolute -inset-4 blur-3xl rounded-full z-0 opacity-20" style={{ backgroundColor: accentColor }} />
                </div>
                <div className="mt-8 text-center z-10">
                  <Badge className="mb-2 bg-white/5 text-white/60 border-white/10 font-black">
                    {botStatus === 'running' ? 'ENGAGED' : botStatus === 'paused' ? 'SUSPENDED' : 'DORMANT'}
                  </Badge>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter accent-text">KRAKEN v4</h3>
                  <p className="text-[10px] text-white/40 font-black tracking-widest mt-1 uppercase">{selectedStrategy.name} Active</p>
                  {botStatus === 'running' && (
                    <div className="mt-6 w-40 mx-auto bg-white/5 h-1 rounded-full overflow-hidden">
                      <motion.div className="h-full progress-bar" animate={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
              </Card>
            </section>

            <section className="grid grid-cols-3 gap-4 px-1">
              <Button onClick={() => setBotStatus('running')} disabled={botStatus === 'running'} className="h-24 flex-col glass-neon border-2 rounded-[2rem] hover:bg-white/5" style={{ borderColor: botStatus === 'running' ? accentColor : 'rgba(255,255,255,0.05)', color: botStatus === 'running' ? '#fff' : accentColor }}><Zap className="w-6 h-6 mb-1" /><span className="text-[9px] font-black uppercase">Engage</span></Button>
              <Button onClick={() => setBotStatus('paused')} disabled={botStatus !== 'running'} className="h-24 flex-col glass-neon border-2 text-amber-500 rounded-[2rem] hover:bg-amber-500/5"><Pause className="w-6 h-6 mb-1" /><span className="text-[9px] font-black uppercase">Suspend</span></Button>
              <Button onClick={() => { setBotStatus('idle'); setTradesExecuted(0); }} className="h-24 flex-col glass-neon border-2 text-red-500 rounded-[2rem] hover:bg-red-500/5"><Square className="w-6 h-6 mb-1" /><span className="text-[9px] font-black uppercase">Abort</span></Button>
            </section>

            <section className="px-1 space-y-4">
               <div className="flex items-center justify-between px-2">
                 <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2"><Layers className="w-3 h-3" />Optimization Matrix</h4>
               </div>
               <Card className="glass-neon border-white/5 rounded-[2.5rem] p-6 space-y-6">
                 <div className="space-y-2">
                    <Label className="text-[9px] font-black text-white/20 uppercase tracking-widest ml-1">Current Strategy</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {STRATEGIES.map(s => (
                        <button 
                          key={s.id} 
                          onClick={() => setSelectedStrategy(s)}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                            selectedStrategy.id === s.id ? 'bg-white/5' : 'bg-transparent border-white/5 text-white/40'
                          }`}
                          style={{ borderColor: selectedStrategy.id === s.id ? accentColor : 'rgba(255,255,255,0.05)' }}
                        >
                          <div className="text-left">
                            <p className="font-bold text-sm text-white">{s.name}</p>
                            <p className="text-[9px] opacity-40">{s.description}</p>
                          </div>
                          <Badge variant="outline" className="text-[8px]" style={{ borderColor: selectedStrategy.id === s.id ? accentColor : 'rgba(255,255,255,0.1)', color: selectedStrategy.id === s.id ? accentColor : 'inherit' }}>WIN {s.winRate * 100}%</Badge>
                        </button>
                      ))}
                    </div>
                 </div>
               </Card>
            </section>
          </>
        )}

        {activeTab === 'config' && (
          <section className="px-1 space-y-8">
            {/* Visual Header */}
            <div className="flex items-center gap-2 mb-4 px-2">
               <Palette className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Visual Configuration</h4>
             </div>

            {/* App Background Section */}
            <Card className="glass-neon border-white/5 rounded-[2.5rem] p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest">App Background</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[8px] uppercase font-black opacity-40 hover:opacity-100" 
                    onClick={() => { setAppBackground(''); toast.success('Background reset to default'); }}
                  >
                    Reset Default
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {PRESET_BACKGROUNDS.map(bg => (
                    <button 
                      key={bg.url} 
                      onClick={() => { setAppBackground(bg.url); toast.success(`Background: ${bg.name}`); }}
                      className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                        appBackground === bg.url ? 'scale-105 ring-2 ring-white/20' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{ borderColor: appBackground === bg.url ? accentColor : 'transparent' }}
                    >
                      <img src={bg.url} className="w-full h-full object-cover" alt={bg.name} />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <span className="text-[7px] font-black text-white uppercase">{bg.name}</span>
                      </div>
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => backgroundInputRef.current?.click()}
                    className="aspect-video rounded-xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-all"
                  >
                    <Upload className="w-4 h-4 text-white/40" />
                    <span className="text-[7px] font-black text-white/40 uppercase">Upload Custom</span>
                    <input 
                      type="file" 
                      ref={backgroundInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setAppBackground(reader.result as string);
                            toast.success('Custom Background Applied');
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Overlay Intensity</Label>
                  <span className="text-[10px] font-black" style={{ color: accentColor }}>{bgOpacity}%</span>
                </div>
                <Slider 
                  value={[bgOpacity]} 
                  onValueChange={(val) => setBgOpacity(val[0])} 
                  max={100} 
                  min={20} 
                  step={1} 
                  className="py-2"
                />
                <p className="text-[8px] text-white/20 uppercase font-bold">Lower values show more of your background image.</p>
              </div>
            </Card>

            {/* Accent Color Section */}
            <Card className="glass-neon border-white/5 rounded-[2.5rem] p-6 space-y-8">
              <div className="space-y-4">
                <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Accent Presets</Label>
                <div className="grid grid-cols-3 gap-3">
                  {PRESET_COLORS.map(c => (
                    <button 
                      key={c.hex} 
                      onClick={() => { setAccentColor(c.hex); setCustomHex(c.hex); toast.success(`Theme updated: ${c.name}`); }}
                      className={`h-12 rounded-xl border-2 transition-all flex items-center justify-center ${
                        accentColor === c.hex ? 'scale-105' : 'opacity-60'
                      }`}
                      style={{ backgroundColor: `${c.hex}22`, borderColor: accentColor === c.hex ? c.hex : 'transparent' }}
                    >
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Custom Hex</Label>
                <div className="flex gap-2">
                  <Input 
                    value={customHex} 
                    onChange={(e) => setCustomHex(e.target.value)} 
                    placeholder="#000000" 
                    className="bg-white/5 border-white/10 h-14 rounded-2xl font-mono"
                  />
                  <Button 
                    onClick={() => { 
                      if (/^#[0-9A-F]{6}$/i.test(customHex)) {
                        setAccentColor(customHex);
                        toast.success('Custom color applied');
                      } else {
                        toast.error('Invalid Hex code');
                      }
                    }} 
                    className="h-14 w-14 rounded-2xl p-0"
                    style={{ backgroundColor: accentColor, color: '#000' }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <Separator className="bg-white/5" />

              <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border-2 border-white/10">
                  {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-white/20" />}
                  <button onClick={() => avatarInputRef.current?.click()} className="absolute bottom-0 right-0 p-1.5 rounded-tl-xl shadow-lg accent-bg"><Camera className="w-3 h-3 text-black" /></button>
                  <input type="file" ref={avatarInputRef} className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfileImage(reader.result as string);
                        toast.success('Identity Updated');
                      };
                      reader.readAsDataURL(file);
                    }
                  }} />
                </div>
                <div><p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Operator Profile</p><h4 className="font-black text-white">{userName}</h4></div>
              </div>

              <Button onClick={handleLogout} variant="outline" className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 h-14 rounded-2xl gap-2 font-black"><LogOut className="w-4 h-4" />EJECT SYSTEM</Button>
            </Card>
          </section>
        )}

        {activeTab === 'automation' && (
          <section className="px-1">
            <div className="flex items-center gap-2 mb-4 px-2">
               <Calculator className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Automation Protocols</h4>
             </div>
            <Card className="glass-neon border-white/5 rounded-[2.5rem] p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Auto-Trade Limit</Label>
                  <Badge variant="outline" className="border-white/10 text-white/60">{autoTradeLimit} CYCLES</Badge>
                </div>
                <div className="space-y-6">
                   <p className="text-xs text-white/40 leading-relaxed">
                     Set the maximum number of trades the Kraken engine will execute automatically before requiring operator re-engagement.
                   </p>
                   <div className="flex items-center gap-4">
                     <Button 
                       variant="outline" 
                       className="h-14 w-14 rounded-2xl border-white/10" 
                       onClick={() => setAutoTradeLimit(Math.max(1, autoTradeLimit - 1))}
                     >-</Button>
                     <div className="flex-1 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black text-2xl">{autoTradeLimit}</div>
                     <Button 
                       variant="outline" 
                       className="h-14 w-14 rounded-2xl border-white/10" 
                       onClick={() => setAutoTradeLimit(autoTradeLimit + 1)}
                     >+</Button>
                   </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                 <div className="flex justify-between items-center">
                   <span className="text-[9px] font-black text-white/40 uppercase">Current Cycle Progress</span>
                   <span className="text-[9px] font-black uppercase" style={{ color: accentColor }}>{Math.round((tradesExecuted / autoTradeLimit) * 100)}%</span>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full progress-bar transition-all duration-500" style={{ width: `${(tradesExecuted / autoTradeLimit) * 100}%` }} />
                 </div>
              </div>

              <Button 
                onClick={() => { setTradesExecuted(0); toast.success('Counter Reset Successful'); }} 
                className="w-full h-14 rounded-2xl border border-white/10 bg-transparent hover:bg-white/5 font-black uppercase text-xs"
              >
                Reset Execution Counter
              </Button>
            </Card>
          </section>
        )}

        {activeTab === 'aichat' && (
          <section className="px-1 flex flex-col h-[70vh]">
            <div className="flex items-center gap-2 mb-4 px-2">
               <Bot className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">AI Enhancement Chat</h4>
            </div>
            <Card className="glass-neon border-white/5 rounded-[2.5rem] p-4 flex-1 flex flex-col overflow-hidden">
               <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                     {aiMessages.map(m => (
                       <div key={m.id} className={`flex ${m.isAI ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[85%] p-4 rounded-2xl ${m.isAI ? 'bg-white/5 border border-white/5 text-white' : 'bg-white/10 text-white shadow-lg'}`}>
                             <p className="text-[8px] font-black uppercase tracking-tighter opacity-30 mb-1">{m.user} \u2022 {m.timestamp}</p>
                             <p className="text-sm">{m.content}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </ScrollArea>
               <div className="flex gap-2">
                  <Input 
                    value={chatMessage} 
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage('ai')}
                    placeholder="Ask AURORA AI..." 
                    className="bg-white/5 border-white/10 h-12 rounded-xl text-white"
                  />
                  <Button onClick={() => sendMessage('ai')} className="h-12 w-12 rounded-xl p-0 shadow-lg" style={{ backgroundColor: accentColor, color: '#000' }}><Send className="w-5 h-5" /></Button>
               </div>
            </Card>
          </section>
        )}

        {activeTab === 'community' && (
          <section className="px-1 flex flex-col h-[70vh]">
            <div className="flex items-center justify-between mb-4 px-2">
               <div className="flex items-center gap-2">
                 <Users className="w-4 h-4" style={{ color: accentColor }} />
                 <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Trading Chat List</h4>
               </div>
               <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-[7px] font-black animate-pulse">STRICT PROTOCOL</Badge>
            </div>
            <Card className="glass-neon border-white/5 rounded-[2.5rem] p-4 flex-1 flex flex-col overflow-hidden">
               <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3 mb-4 flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-[9px] text-red-500/80 font-bold uppercase">No unauthorized advice or scam links. Violators will be permanently ejected.</p>
               </div>
               <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                     {communityMessages.map(m => (
                       <div key={m.id} className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                             <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-black">{m.user[0]}</div>
                             <span className="text-[8px] font-black text-white/40">{m.user} \u2022 {m.timestamp}</span>
                          </div>
                          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 ml-8">
                             <p className="text-sm text-white/80">{m.content}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </ScrollArea>
               <div className="flex gap-2">
                  <Input 
                    value={chatMessage} 
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage('community')}
                    placeholder="Message community..." 
                    className="bg-white/5 border-white/10 h-12 rounded-xl text-white"
                  />
                  <Button onClick={() => sendMessage('community')} className="h-12 w-12 rounded-xl p-0 shadow-lg" style={{ backgroundColor: accentColor, color: '#000' }}><Send className="w-5 h-5" /></Button>
               </div>
            </Card>
          </section>
        )}

        {activeTab === 'services' && (
          <section className="px-1 space-y-6">
             <div className="flex items-center gap-2 mb-4 px-2">
               <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Our Services</h4>
             </div>
             <Card className="glass-neon border-white/5 rounded-[2.5rem] p-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Most Trusted Analyser</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    AURORA.FX is the industry's premier Forex and stock analyser. Our neural engine processes global market liquidity to provide high-accuracy signals and automated execution.
                  </p>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>How to Activate</h4>
                   <div className="space-y-3">
                      {[
                        { step: '01', title: 'Verify License', desc: 'Input your UUID key in the verification module.' },
                        { step: '02', title: 'Bridge Setup', desc: 'Select your platform (MT4/MT5) and preferred assets.' },
                        { step: '03', title: 'Strategy Lock', desc: 'Pick an optimization engine: Tidal, Deep, or Abyssal.' },
                        { step: '04', title: 'Engage Engine', desc: 'Press ENGAGE to begin real-time neural analysis.' }
                      ].map(s => (
                        <div key={s.step} className="flex gap-4 items-start bg-white/5 p-4 rounded-3xl border border-white/5">
                           <span className="text-xl font-black opacity-20" style={{ color: accentColor }}>{s.step}</span>
                           <div>
                              <p className="font-bold text-white">{s.title}</p>
                              <p className="text-xs text-white/40">{s.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </Card>
          </section>
        )}

        {activeTab === 'symbols' && (
          <section className="px-1 space-y-6">
             <div className="flex items-center gap-2 mb-4 px-2">
               <BarChart3 className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Analysis Symbols</h4>
             </div>
             <Card className="glass-neon border-white/5 rounded-[2.5rem] p-6">
                <p className="text-sm text-white/40 mb-6">Optimized assets for high-frequency neural signals. Best performance with MT4/MT5 bridges.</p>
                <div className="grid grid-cols-2 gap-3">
                   {MT5_SYMBOLS.map(s => (
                     <div key={s} className="bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{s}</span>
                        <CheckCircle2 className="w-3 h-3" style={{ color: accentColor }} />
                     </div>
                   ))}
                </div>
             </Card>
          </section>
        )}

        {activeTab === 'history' && (
          <section className="px-1">
             <div className="flex items-center gap-2 mb-4 px-2">
               <History className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Neural Log History</h4>
             </div>
             <Card className="glass-neon border-white/5 rounded-[2.5rem] p-4 min-h-[400px]">
              {trades.length > 0 ? (
                <div className="space-y-3">
                  {trades.map(t => (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={t.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'BUY' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{t.type === 'BUY' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}</div>
                        <div><h5 className="font-bold text-sm text-white">{t.symbol}</h5><p className="text-[9px] text-white/20 font-mono">{t.time}</p></div>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-lg ${t.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{t.profit >= 0 ? '+' : ''}${Math.abs(t.profit).toFixed(2)}</p>
                        <p className="text-[9px] text-white/20 font-mono">Entry {t.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 opacity-10"><History className="w-16 h-16 mb-4" /><p className="font-black uppercase tracking-widest text-[10px]">Log Archive Empty</p></div>
              )}
            </Card>
          </section>
        )}

        {activeTab === 'ecosystem' && (
          <section className="px-1 space-y-6">
             <div className="flex items-center gap-2 mb-4 px-2">
               <Globe className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Aurora Ecosystem</h4>
             </div>
             <div className="grid grid-cols-1 gap-4">
                {[ 
                  { icon: Wallet, title: 'Aurora Wallet', desc: 'Liquidity pool & crypto bridge.', badge: 'COMING SOON' },
                  { icon: GraduationCap, title: 'FX Academy', desc: 'Master market waves with AI.', badge: 'DEVELOPMENT' },
                  { icon: Users, title: 'Mentor Stream', desc: 'Copy signals from elite nodes.', badge: 'BETA 2.0' }
                ].map((item, i) => (
                  <Card key={i} className="glass-neon border-white/5 rounded-[2.5rem] p-6 flex items-center gap-5 group">
                    <div className="bg-white/5 p-4 rounded-2xl transition-transform group-hover:scale-110"><item.icon className="w-8 h-8" style={{ color: accentColor }} /></div>
                    <div className="flex-1">
                      <h4 className="font-black text-white">{item.title}</h4>
                      <p className="text-xs text-white/40">{item.desc}</p>
                      <Badge className="mt-2 bg-white/5 text-white/40 text-[8px]">{item.badge}</Badge>
                    </div>
                    <ArrowRight className="text-white/10 group-hover:opacity-100 opacity-0 transition-opacity" style={{ color: accentColor }} />
                  </Card>
                ))}
             </div>
          </section>
        )}

        {activeTab === 'conduct' && (
          <section className="px-1 space-y-6">
             <div className="flex items-center gap-2 mb-4 px-2">
               <Gavel className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Code of Conduct</h4>
             </div>
             <Card className="glass-neon border-white/5 rounded-[2.5rem] p-6 space-y-4">
                <div className="space-y-6 text-sm text-white/60">
                   <div className="space-y-2"><h4 className="font-bold uppercase text-xs" style={{ color: accentColor }}>1. Professionalism</h4><p>All operators must maintain professional decorum. Abusive language is strictly prohibited.</p></div>
                   <div className="space-y-2"><h4 className="font-bold uppercase text-xs" style={{ color: accentColor }}>2. Verified Signals</h4><p>Distributing external, unverified signals is forbidden to protect members.</p></div>
                   <div className="space-y-2"><h4 className="font-bold uppercase text-xs" style={{ color: accentColor }}>3. Protocol Security</h4><p>Never share your License Key. Admins will never ask for credentials.</p></div>
                </div>
             </Card>
          </section>
        )}

        {activeTab === 'privacy' && (
          <section className="px-1 space-y-6">
             <div className="flex items-center gap-2 mb-4 px-2">
               <FileCheck className="w-4 h-4" style={{ color: accentColor }} />
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Privacy & Protocols</h4>
             </div>
             <Card className="glass-neon border-white/5 rounded-[2.5rem] p-6 space-y-4">
                <div className="space-y-6 text-sm text-white/60">
                   <div className="space-y-2"><h4 className="font-bold uppercase text-xs" style={{ color: accentColor }}>Data Encryption</h4><p>Transmissions are encrypted using 256-bit neural encryption standards.</p></div>
                   <div className="space-y-2"><h4 className="font-bold uppercase text-xs" style={{ color: accentColor }}>Zero Log Policy</h4><p>We do not store your trading history on central servers. Logs are local only.</p></div>
                </div>
             </Card>
          </section>
        )}

        {/* Telemetry Footer */}
        {!['aichat', 'community'].includes(activeTab) && (
          <section className="space-y-4 px-1 pb-10">
            <div className="flex items-center gap-2 px-2"><div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accentColor }} /><h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Neural Telemetry</h4></div>
            <div className="glass-neon rounded-[2.5rem] p-6 font-mono text-[10px] h-48 overflow-y-auto space-y-2 border-white/5 scrollbar-hide">
              {terminalLogs.map(l => (
                <p key={l.id} className={`${l.type === 'execution' ? 'text-white' : l.type === 'warning' ? 'text-amber-500' : l.type === 'error' ? 'text-red-500' : 'opacity-40'}`}>
                  <span className="opacity-30">[{l.time}]</span> <strong>{l.source}:</strong> {l.message}
                </p>
              ))}
            </div>
          </section>
        )}
      </main>

      <nav className="fixed bottom-8 left-6 right-6 h-20 backdrop-blur-3xl glass-neon rounded-[2.5rem] flex items-center justify-around z-50 shadow-2xl transition-all">
        <button onClick={() => setActiveTab('trading')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'trading' ? 'scale-110' : 'opacity-30'}`} style={{ color: activeTab === 'trading' ? accentColor : '#fff' }}><Activity className="w-6 h-6" /><span className="text-[8px] font-black">Sonar</span></button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'history' ? 'scale-110' : 'opacity-30'}`} style={{ color: activeTab === 'history' ? accentColor : '#fff' }}><History className="w-6 h-6" /><span className="text-[8px] font-black">Logs</span></button>
        <button onClick={() => window.open(EXTERNAL_DASHBOARD_URL, '_blank')} className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl -translate-y-4 group transition-all active:scale-90" style={{ backgroundColor: accentColor }}><Cpu className="w-8 h-8 text-black group-hover:rotate-45 transition-transform" /></button>
        <button onClick={() => setActiveTab('ecosystem')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'ecosystem' ? 'scale-110' : 'opacity-30'}`} style={{ color: activeTab === 'ecosystem' ? accentColor : '#fff' }}><Globe className="w-6 h-6" /><span className="text-[8px] font-black">World</span></button>
        <button onClick={() => setActiveTab('config')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'config' ? 'scale-110' : 'opacity-30'}`} style={{ color: activeTab === 'config' ? accentColor : '#fff' }}><Settings className="w-6 h-6" /><span className="text-[8px] font-black">Sync</span></button>
      </nav>

      <SignalAnalysis 
        isOpen={isSignalModalOpen} 
        onClose={() => setIsSignalModalOpen(false)} 
        onAddLog={addLog}
        accentColor={accentColor}
      />
    </div>
  );
}

export default App;