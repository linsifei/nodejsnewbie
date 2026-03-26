import { 
  Video, 
  Mic, 
  Camera, 
  Maximize2, 
  MoreVertical, 
  Activity, 
  Bed, 
  Utensils, 
  ArrowRight,
  ShieldCheck,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Feed {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  camId?: string;
  isPrimary?: boolean;
  status?: string;
}

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/monitoring/feeds")
      .then(res => res.json())
      .then(data => {
        setFeeds(data);
        setLoading(false);
      })
      .catch(err => console.error("Failed to fetch feeds:", err));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">所有区域安全</h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-secondary font-semibold bg-secondary-container/30 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              实时监控开启中
            </span>
            <span className="text-sm text-on-surface-variant font-medium">12:45 PM | 2026年3月26日</span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-low p-1 rounded-xl flex border border-outline-variant/10">
            <button 
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-4 py-2 rounded-lg font-bold text-sm transition-all",
                viewMode === "grid" ? "bg-surface-container-lowest shadow-sm text-primary" : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              网格视图
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn(
                "px-4 py-2 rounded-lg font-bold text-sm transition-all",
                viewMode === "list" ? "bg-surface-container-lowest shadow-sm text-primary" : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              列表视图
            </button>
          </div>
        </div>
      </div>

      {/* Video Feed Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Large Primary Feed */}
        {feeds.filter(f => f.isPrimary).map(feed => (
          <div key={feed.id} className="xl:col-span-2 xl:row-span-2 group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-outline-variant/5">
            <div className="aspect-video relative bg-slate-900">
              <img 
                src={feed.image} 
                alt={feed.title} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
              {/* HUD Overlays */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                {feed.tag}
              </div>
              <div className="absolute top-4 right-4 text-white/80 text-[10px] font-mono bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {feed.camId}
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <button className="text-white hover:text-primary-container transition-colors"><Video className="w-5 h-5" /></button>
                <button className="text-white hover:text-primary-container transition-colors"><Mic className="w-5 h-5" /></button>
                <button className="text-white hover:text-primary-container transition-colors"><Camera className="w-5 h-5" /></button>
                <div className="w-px h-6 bg-white/20 mx-2" />
                <button className="text-white hover:text-primary-container transition-colors"><Maximize2 className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-on-surface font-headline">{feed.title}</h3>
                <p className="text-sm text-on-surface-variant">{feed.subtitle}</p>
              </div>
              <button className="p-2 text-outline-variant hover:text-primary transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {/* Secondary Feeds */}
        <div className="space-y-6">
          {feeds.filter(f => !f.isPrimary).slice(0, 2).map(feed => (
            <div key={feed.id} className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-outline-variant/5">
              <div className="aspect-video relative bg-slate-900">
                <img 
                  src={feed.image} 
                  alt={feed.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/40 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[9px] font-bold uppercase tracking-widest border border-white/10">
                  {feed.tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex gap-3">
                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40">
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-on-surface text-sm font-headline">{feed.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  {feed.status === "active" && <Activity className="w-3 h-3 text-secondary" />}
                  {feed.status === "resting" && <Bed className="w-3 h-3 text-primary" />}
                  {feed.status === "completed" && <Utensils className="w-3 h-3 text-tertiary" />}
                  <p className="text-[11px] text-on-surface-variant font-medium">{feed.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {feeds.filter(f => !f.isPrimary).slice(2).map(feed => (
            <div key={feed.id} className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-outline-variant/5">
              <div className="aspect-video relative bg-slate-900">
                <img 
                  src={feed.image} 
                  alt={feed.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/40 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[9px] font-bold uppercase tracking-widest border border-white/10">
                  {feed.tag}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-on-surface text-sm font-headline">{feed.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  {feed.status === "active" && <Activity className="w-3 h-3 text-secondary" />}
                  {feed.status === "resting" && <Bed className="w-3 h-3 text-primary" />}
                  {feed.status === "completed" && <Utensils className="w-3 h-3 text-tertiary" />}
                  <p className="text-[11px] text-on-surface-variant font-medium">{feed.subtitle}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Status Summary Card */}
          <div className="bg-primary/5 rounded-2xl p-6 flex flex-col justify-between border border-primary/10">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-extrabold text-primary uppercase tracking-wider text-[10px]">安全简报</h3>
                <ShieldCheck className="w-5 h-5 text-primary fill-current opacity-20" />
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-xs font-medium text-on-surface">所有外门已锁</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-xs font-medium text-on-surface">运动传感器正常工作</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  <span className="text-xs font-medium text-on-surface">1 名访客已登记 (南门)</span>
                </li>
              </ul>
            </div>
            <button className="mt-6 text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
              查看完整报告
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
