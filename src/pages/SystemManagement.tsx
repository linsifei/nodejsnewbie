import { 
  Plus, 
  UserPlus, 
  Wifi, 
  HardDrive, 
  ShieldCheck, 
  MoreVertical, 
  Video, 
  Share2,
  Download,
  Upload
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SystemStats {
  uptime: string;
  latency: string;
  storageUsed: string;
  storagePercent: number;
  activeGuardians: number;
  onlineCameras: number;
  totalCameras: number;
}

const parents = [
  {
    id: 1,
    name: "Elena Rodriguez",
    email: "elena.rod@email.com",
    student: "Leo Rodriguez (学前班)",
    permissions: ["实时监控", "历史记录"],
    status: "活跃",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXT8k-EJX1gA56cMWJIc8Mo5Y1I8IZKt2Y7kVgUBiAq1fpYwtb0YU8GQ5Ko4TpjJUBIaAhGZzqwIbbDA0sIhD0tRcTPHQwwkl02V0hGPv0RaD1HEQ-zdLjjY0Im4LzTaFbYjGJJ5bcl11oJDMb4AMspXMDaQoteDJjFzUU1zExiWwc6H7GeV21zJtfGdr8iMJok5GSnsY4c9upCEzATy30zSYlq2-DIuihyfszXFQ8vPKdFCac0R5Z0LRKkVcOVl-YEH6T0w8iXbC5"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    email: "m.thorne@corp.com",
    student: "Sophie Thorne (1年级)",
    permissions: ["实时监控"],
    status: "活跃",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTBS6WyWuEs-i2Vdqh630XKeTdvkHdVczf5LbuothMyY_xsnqk7y28ZwQ_bxW4xdmWeQnLe6zMi6mNNl_PjpdZ-s8VyWrh66CnXjDS-BnZD0ObWK_p3f1ZENlQyt1225HRIWITcCB9QgkD5-BD8yQl0fDk0QVMDjMba-x_ytQoRi5w7qVr6W3hl0v0RKm-aquo2Mq8ydqrNuR1l3xa0Geh3cJt2f6VJXwZGTgW1c5v-OiFyLDF5krtYCPZokbacploYoH6Tbn1joxH"
  },
  {
    id: 3,
    name: "Amara Okafor",
    email: "amara_o@web.net",
    student: "Kamsi Okafor (学前班)",
    permissions: ["完整权限"],
    status: "待定",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoo_FNWFi8gkGtoPvoh53Zq1gmKXgKSh8ai7Aey0gDSKKnyZ-_i4W3nMxwknJqfXaIVZM-uDuelLbnHPge7Skng27fFFsbkAOQgdeI2EIhSOzC3DD9ELjm8saSLz55V_7TJhqo3zmagMPeT1-i0tk587gkejFnF7fFjGwEyxY5abVF3lTH1SVontvsypODKXxiLRW1URcdAtywI3H4sPJGE0rEEDexMky5teylCBV_8lZqTHLpO44Q0OIWYp0ULkso-Bp1BqGQnuX9"
  }
];

const cameras = [
  {
    id: 1,
    name: "北走廊 A-1",
    stats: "4K • 60fps • 12ms 延迟",
    status: "在线",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJPtwvk7jDaLPmldae5pbKM51Ue4xm0hmMRIDUdXPOnnJmzl8a9XQTrGbsK9CUu9Ssy-ybgfFuBHcEhxCrvshx7swxGrWW7tDE49rQaK89Pbhc-xzUkm8mGgwF0SpNvwREenteh47xSMouqjKH0lH84HsWkR_l5JshejxH_1EENrE2wpIONS7vciswYstYiTtqm5HaYUkQYI8mdCK-CUd0G4odivd0B7gpR0qdTXaYcaYqQYX0au-WXSd6C48oQ6JQlsQ8uTqIA7X_"
  },
  {
    id: 2,
    name: "操场西侧",
    stats: "4K • 30fps • 18ms 延迟",
    status: "在线",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLjOD1Wr3VlDzT_5tnUyaE-ho4hU5bHOOA_BiC2jJSLbG_3bl4oTOOUt-iYn6hltiS3oT6drZ9EX9BCuRxmWcWvIfpd4KG5kIILqrQbM87GWYK_Qwh7E41SDKCYbVgTvGAtXIP86XZpTBbjc5Pv3P2JtZKNtXjQIzIa5NAUOaQvVuyXrK9bJg3iY-6kwhKB8U2C5w7nmwBV3sTlYFRNt_IwaDzS8Di_Pwjv_gceHUnMqp23vYeffZ_tmB9fbyht5ClC0haV-rzi3P"
  },
  {
    id: 3,
    name: "主入口外侧",
    stats: "离线 • 14:22 PM",
    status: "离线",
    image: null
  },
  {
    id: 4,
    name: "餐厅东侧",
    stats: "2K • 30fps • 24ms 延迟",
    status: "在线",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9eNRX_P8SVirbGQueU9vKXxdbdOfZpwq-RGOs2FXuJ8-mnwxGUDQVPA2ZHNd7hcUyf8kTuJoBy1PafxcfvKftOAj8JwUMi0arvWNT39hJt9QsjLVGKGbryWgsLf7Vr5hEmqt4ulpcKy0Y9jZpI7pI89u_fJmdaBMV7V-LqzP9ac1o7T0gA2HzFK9SENiXyDtUp-g54LZrn1Up8txSJqp_ZUf1fdjf5wh-L2kv1ScYgBP2utZMxFNd3rPWiMxJWu0leSQYcAtUZz-j"
  }
];

export default function SystemManagement() {
  const [stats, setStats] = useState<SystemStats | null>(null);

  useEffect(() => {
    fetch("/api/system/stats")
      .then(res => res.json())
      .then(setStats)
      .catch(err => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <header className="flex justify-between items-end">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight mb-2">系统管理</h1>
          <p className="text-on-surface-variant leading-relaxed">统一管理监护人访问权限、摄像头完整性及全园监控参数。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-xl border border-outline-variant/30 font-semibold text-primary hover:bg-surface-container transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            添加摄像头
          </button>
          <button className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold editorial-shadow flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <UserPlus className="w-5 h-5" />
            新增用户
          </button>
        </div>
      </header>

      {/* System Health Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 editorial-shadow flex justify-between items-center relative overflow-hidden border border-outline-variant/5">
          <div className="z-10">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1 block">网络状态</span>
            <h3 className="text-3xl font-bold font-headline mb-1">{stats?.uptime || "加载中..."} 运行时间</h3>
            <p className="text-on-surface-variant text-sm">所有区域节点在 {stats?.latency || "--"} 内响应。</p>
          </div>
          <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
            <Wifi className="w-12 h-12" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-50" />
        </div>

        <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col justify-between border border-outline-variant/5">
          <div className="flex justify-between items-start">
            <HardDrive className="w-8 h-8 text-tertiary" />
            <span className="bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded text-[9px] font-bold uppercase tracking-tighter">{stats?.storagePercent || 0}% 已满</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-headline">{stats?.storageUsed || "--"}</h3>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-wider font-semibold">云端存储已保留 (30 天)</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col justify-between border border-outline-variant/5">
          <div className="flex justify-between items-start">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="bg-primary-container text-on-primary-container px-2 py-1 rounded text-[9px] font-bold uppercase tracking-tighter">已验证</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-headline">{stats?.activeGuardians || 0}</h3>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-wider font-semibold">活跃监护人登录</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Parent Accounts & Permissions Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-headline text-on-surface">监护人账号</h2>
            <button className="text-sm font-semibold text-primary hover:underline">查看所有记录</button>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl editorial-shadow overflow-hidden border border-outline-variant/5">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-high/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">姓名</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">学生 / 班级</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">权限级别</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">状态</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {parents.map(parent => (
                  <tr key={parent.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={parent.avatar} 
                          alt={parent.name} 
                          className="w-10 h-10 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-sm text-on-surface">{parent.name}</div>
                          <div className="text-xs text-on-surface-variant">{parent.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-on-surface">{parent.student}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-1 flex-wrap">
                        {parent.permissions.map(p => (
                          <span key={p} className="bg-surface-container-high px-2 py-1 rounded-md text-[9px] font-bold text-on-surface-variant uppercase">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] font-bold",
                        parent.status === "活跃" ? "text-secondary" : "text-outline"
                      )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", parent.status === "活跃" ? "bg-secondary" : "bg-outline")} />
                        {parent.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-outline hover:text-primary transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Devices & Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-headline text-on-surface">摄像头网格</h2>
            <span className="text-[10px] font-bold px-3 py-1 bg-secondary-container/30 text-secondary rounded-full">{stats?.onlineCameras || 0} / {stats?.totalCameras || 0} 在线</span>
          </div>
          <div className="space-y-4">
            {cameras.map(cam => (
              <div key={cam.id} className="bg-surface-container-lowest p-4 rounded-2xl editorial-shadow flex items-center gap-4 group border border-outline-variant/5">
                <div className="w-16 h-12 rounded-lg bg-surface-container-high overflow-hidden relative">
                  {cam.image ? (
                    <img 
                      src={cam.image} 
                      alt={cam.name} 
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-container-highest">
                      <Video className="w-5 h-5 text-outline" />
                    </div>
                  )}
                  {cam.status === "在线" && (
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm font-headline">{cam.name}</h4>
                  <p className={cn(
                    "text-[10px] font-medium",
                    cam.status === "离线" ? "text-error" : "text-on-surface-variant"
                  )}>{cam.stats}</p>
                </div>
                <div className="flex flex-col items-end">
                  <Video className={cn("w-5 h-5", cam.status === "在线" ? "text-secondary" : "text-error")} />
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-tight",
                    cam.status === "在线" ? "text-secondary" : "text-error"
                  )}>{cam.status === "在线" ? "实时" : "离线"}</span>
                </div>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-outline-variant/30 rounded-2xl text-on-surface-variant font-bold text-sm hover:bg-surface-container-low transition-colors">
              + 链接新设备
            </button>
          </div>
        </div>
      </div>

      {/* Quick Settings & Alerts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-tertiary-container/5 p-8 rounded-2xl border border-tertiary-container/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-bold font-headline text-xl">隐私协议</h3>
              <p className="text-sm text-on-surface-variant">配置自动脱敏与遮挡策略。</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5">
              <span className="text-sm font-semibold">人脸模糊策略</span>
              <div className="w-10 h-6 bg-secondary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5">
              <span className="text-sm font-semibold">活动日志记录 (24/7)</span>
              <div className="w-10 h-6 bg-secondary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary-container/5 p-8 rounded-2xl border border-primary-container/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center">
              <Share2 className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-bold font-headline text-xl">批量操作</h3>
              <p className="text-sm text-on-surface-variant">更新整个年级的访问权限。</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-surface-container-lowest p-4 rounded-xl text-left hover:scale-[1.02] transition-transform border border-outline-variant/5">
              <Upload className="w-4 h-4 text-primary mb-2" />
              <span className="text-[9px] font-bold uppercase block mb-1 text-primary">导入</span>
              <span className="text-sm font-bold">CSV 监护人名单</span>
            </button>
            <button className="bg-surface-container-lowest p-4 rounded-xl text-left hover:scale-[1.02] transition-transform border border-outline-variant/5">
              <Download className="w-4 h-4 text-primary mb-2" />
              <span className="text-[9px] font-bold uppercase block mb-1 text-primary">导出</span>
              <span className="text-sm font-bold">导出审计报表</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
