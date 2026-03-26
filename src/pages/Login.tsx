import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const username = (form.elements.namedItem("username") as HTMLInputElement).value;
      const password = (form.elements.namedItem("password") as HTMLInputElement).value;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("登录失败，请检查用户名和密码");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("服务器连接失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden bg-surface">
      {/* Background Image Side */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 relative overflow-hidden">
        <img 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFFOtyewMAynVaxGb8wjpSY7SawDqnXQ0bxJ2XWHQ8QyVrNgYyGcgpWXTQLLYtObMoTC4LV3YJKIlqnBpYqlN-CwDHm0wddg7LkbCRIvS9-XulPcr3Q_1nRXIPpz9lbBzpnvFzAtiXZq4aYEioSRiOlGN9F8wbgJF0pqYaP8E_rogmj5v196RyvMw6mmRpOb9QVCf41PCRVB2VVGScb_fxj8Xr4FIN433TQ7XkAO5460DBIUnzEGp7Oil5BjcG0nyskaGMfJV_CF9C" 
          alt="Classroom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-multiply" />
        
        {/* Branding Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-12 left-12 p-8 backdrop-blur-xl bg-surface-container-lowest/70 rounded-2xl max-w-md editorial-shadow border border-white/20"
        >
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">守护者之眼</h1>
          <p className="font-body text-on-surface-variant mt-4 text-lg">通过技术精准和细致关怀，确保每一个微笑都得到保护。为橡树园学院提供安全监控。</p>
        </motion.div>
      </div>

      {/* Login Canvas */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary fill-current" />
              </div>
              <span className="font-headline text-lg font-bold text-primary tracking-tight">KinderGuard Professional</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tighter mt-4">欢迎回来</h2>
            <p className="font-body text-on-surface-variant mt-2">登录以访问安全实时视频流和班级日志。</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="username">
                机构ID或电子邮箱
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-on-surface-variant" />
                </div>
                <input 
                  className="block w-full pl-11 pr-4 py-4 bg-surface-container-low border-0 rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300" 
                  id="username" 
                  name="username" 
                  placeholder="administrator@oakwood.edu" 
                  type="text"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="password">
                  密码
                </label>
                <button type="button" className="font-sans text-sm font-semibold text-primary hover:text-primary-dim transition-colors">
                  忘记凭据？
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-on-surface-variant" />
                </div>
                <input 
                  className="block w-full pl-11 pr-12 py-4 bg-surface-container-low border-0 rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••••••" 
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant hover:text-primary" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input 
                className="h-5 w-5 rounded-lg border-outline-variant text-primary focus:ring-primary" 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
              />
              <label className="ml-3 block font-body text-sm text-on-surface-variant" htmlFor="remember-me">
                保持登录状态30天
              </label>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                className={cn(
                  "w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary font-headline font-bold py-4 px-6 rounded-xl editorial-shadow hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2",
                  isLoading && "opacity-80 cursor-not-allowed"
                )}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "初始化中..." : "初始化会话"}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>

          {/* Security Footer */}
          <div className="mt-12 p-6 bg-surface-container-low rounded-xl border-0">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <ShieldCheck className="w-6 h-6 text-tertiary fill-current" />
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-on-surface">安全协议已激活</p>
                <p className="font-body text-xs text-on-surface-variant mt-1 leading-relaxed">
                  所有视频流均采用 AES-256 标准加密。系统将监控您的会话以防止未经授权的访问。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body text-sm text-on-surface-variant">
              仅限授权人员。 <button className="font-bold text-primary hover:underline underline-offset-4">申请访问权限</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
