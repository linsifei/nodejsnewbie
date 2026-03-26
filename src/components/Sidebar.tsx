import { Link, useLocation } from "react-router-dom";
import { 
  Video, 
  History, 
  LayoutDashboard, 
  Users, 
  Activity, 
  HelpCircle, 
  LogOut,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Video, label: "实时监控", path: "/" },
  { icon: History, label: "视频回放", path: "/history" },
  { icon: LayoutDashboard, label: "教室概览", path: "/classrooms" },
  { icon: Users, label: "员工日志", path: "/logs" },
  { icon: Activity, label: "系统健康", path: "/management" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 pt-20 bg-surface-container-low flex flex-col border-r border-outline-variant/10 z-40">
      <div className="px-6 py-8 flex flex-col items-center border-b border-outline-variant/10">
        <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center mb-4 editorial-shadow overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgwqEiqcpfzzwOjLDvxgHl3XfllTBrj_V2dRwa9yPyb0jROuYpTR5_k9jMfVuUp3BOtR5unFd9DIHsc-lDAu3NtDCIV3Eg3D0kEUFGV5lN5vqMWsUrh3kDD3hq68KaFTb7FtkfA3TCimYqfOtpFgxrNTFtBH5KP7AMCTaTpAdZqZHVrw1qM3oOwRSeKsnj3WeZGC9pYw64cktMaVK9jUmtYGUn-5O6R54K3SEWCzi_gtagr6aDI9TCTaRAeuEdoH_lmBZeQZooaaB3" 
            alt="School Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-lg font-extrabold text-on-primary-container font-headline">橡树园学院</h2>
        <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold mt-1">安全监控系统</span>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-6 py-3 transition-all duration-200 group relative",
                isActive 
                  ? "text-primary font-bold bg-primary/5" 
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-outline")} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <button className="w-full bg-error text-on-error py-3 rounded-xl font-bold flex items-center justify-center gap-2 editorial-shadow active:scale-[0.98] transition-all">
          <AlertTriangle className="w-5 h-5 fill-current" />
          紧急报警
        </button>
      </div>

      <div className="p-4 border-t border-outline-variant/10 mb-4">
        <button className="w-full flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container rounded-lg transition-all text-sm">
          <HelpCircle className="w-5 h-5 text-outline" />
          获取帮助
        </button>
        <Link to="/login" className="w-full flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container rounded-lg transition-all text-sm">
          <LogOut className="w-5 h-5 text-outline" />
          退出登录
        </Link>
      </div>
    </aside>
  );
}
