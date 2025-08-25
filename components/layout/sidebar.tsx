"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastTheme = useRef(theme);
  const pathname = usePathname();

  // 确保组件在客户端正确挂载后再渲染，避免水合问题
  useEffect(() => {
    setMounted(true);
  }, []);

  // 监听主题变化并触发动画
  useEffect(() => {
    if (mounted && theme !== lastTheme.current) {
      setIsAnimating(true);
      lastTheme.current = theme;
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // 避免在服务端渲染时出现水合不匹配的问题
  if (!mounted) {
    return (
      <Card className="fixed left-0 top-0 h-full w-16 rounded-none border-r flex flex-col justify-between p-2">
        <CardContent className="p-0 flex flex-col items-center gap-4">
          {/* 上方按钮占位符 */}
          <div className="w-10 h-10" />
          <div className="w-10 h-10" />
          <div className="w-10 h-10" />
          <div className="w-10 h-10" />
        </CardContent>
        
        <CardContent className="p-0 flex flex-col items-center gap-4">
          {/* 下方按钮占位符 */}
          <div className="w-10 h-10" />
          <div className="w-10 h-10" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed left-0 top-0 h-full w-16 rounded-none border-r flex flex-col justify-between p-2">
      <CardContent className="p-0 flex flex-col items-center gap-4">
        {/* 上方按钮 */}
        <Button 
          variant={pathname === "/" ? "default" : "ghost"} 
          size="icon" 
          asChild
        >
          <Link href="/">
            <HomeIcon />
          </Link>
        </Button>
        <Button 
          variant={pathname === "/download" ? "default" : "ghost"} 
          size="icon" 
          asChild
        >
          <Link href="/download">
            <DownloadIcon />
          </Link>
        </Button>
        <Button 
          variant={pathname === "/lan" ? "default" : "ghost"} 
          size="icon" 
          asChild
        >
          <Link href="/lan">
            <WifiIcon />
          </Link>
        </Button>
        <Button 
          variant={pathname === "/more" ? "default" : "ghost"} 
          size="icon" 
          asChild
        >
          <Link href="/more">
            <MoreIcon />
          </Link>
        </Button>
      </CardContent>
      
      <CardContent className="p-0 flex flex-col items-center gap-4">
        {/* 下方按钮 */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="relative"
        >
          <div className={`transition-all duration-300 ease-in-out ${isAnimating ? 'rotate-[360deg] scale-0' : ''}`}>
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </div>
        </Button>
        <Button 
          variant={pathname === "/settings" ? "default" : "ghost"} 
          size="icon" 
          asChild
        >
          <Link href="/settings">
            <SettingsIcon />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// 图标组件占位符 - 实际使用中可以替换为真正的图标组件
function HomeIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}