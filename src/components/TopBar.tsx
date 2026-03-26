import { Search, Bell, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "仪表盘", path: "/" },
  { label: "录像回放", path: "/history" },
  { label: "数据报表", path: "/reports" },
  { label: "系统管理", path: "/management" },
];

export default function TopBar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex justify-between items-center w-full px-8 py-4">
        <div className="flex items-center gap-12">
          <span className="text-xl font-extrabold text-primary font-headline tracking-tight">守护者之眼</span>
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-semibold transition-all relative py-1",
                    isActive 
                      ? "text-primary" 
                      : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10 focus-within:border-primary/30 transition-all">
            <Search className="w-4 h-4 text-outline" />
            <input 
              type="text" 
              placeholder="搜索账户..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-48 ml-2 placeholder:text-outline"
            />
          </div>
          
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
          </button>
          
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <div className="h-8 w-px bg-outline-variant/20 mx-2" />

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-on-surface">林思飞</div>
              <div className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">系统管理员</div>
            </div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuuuWrn9mU_NuB9VNZ4p45ao0fviTt7nkjK9vmpU_AYnOvLRjFiZ3S86DeO8AZhSQRiTMIf9f-BROnjmAfdjTlmpHndBxoPrSt_2YcJXhXRVIvsT5goO0Pe5fSKpfIyMV2NO7qocahtiBP94YmM_nRG-f1NDxMiZDwqHkx_ykZx1oZrIVB-4IJUzPBK3YxuX2qHAWGpItRA9GAtEiOyHpV0LIB1L27wP9igk557BasPnbqFZqTkNCTxQq5mOZAg2Avo3rOiDaZMYE-" 
              alt="Admin Profile" 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-container/30"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
