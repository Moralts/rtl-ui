"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { 
  Home, 
  Download, 
  Wifi, 
  MoreHorizontal, 
  Settings, 
  Sun, 
  Moon, 
  ArrowLeft 
} from "lucide-react";
import { ROUTES } from "@/constants";

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastTheme = useRef(theme);
  const pathname = usePathname();
  const router = useRouter();

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

  // 判断是否为二级页面（不是主页面或侧边栏导航页面）
  const mainRoutes: string[] = [
    ROUTES.HOME, 
    ROUTES.DOWNLOAD, 
    ROUTES.LAN, 
    ROUTES.MORE, 
    ROUTES.SETTINGS
  ];
  const isSubPage = !mainRoutes.includes(pathname);

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
    <TooltipProvider>
      <Card className="fixed left-0 top-0 h-full w-16 rounded-none border-r flex flex-col justify-between p-2">
        <CardContent className="p-0 flex flex-col items-center gap-4">
          {/* 返回按钮 - 仅在二级页面显示 */}
          {isSubPage && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => router.back()}
                  aria-label="返回上一页"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>返回上一页</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {/* 上方按钮 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={pathname === ROUTES.HOME ? "default" : "ghost"} 
                size="icon" 
                asChild
              >
                <Link href={ROUTES.HOME} aria-label="主页">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>主页</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={pathname === ROUTES.DOWNLOAD ? "default" : "ghost"} 
                size="icon" 
                asChild
              >
                <Link href={ROUTES.DOWNLOAD} aria-label="下载">
                  <Download className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>下载</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={pathname === ROUTES.LAN ? "default" : "ghost"} 
                size="icon" 
                asChild
              >
                <Link href={ROUTES.LAN} aria-label="网络">
                  <Wifi className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>网络</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={pathname === ROUTES.MORE ? "default" : "ghost"} 
                size="icon" 
                asChild
              >
                <Link href={ROUTES.MORE} aria-label="更多">
                  <MoreHorizontal className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>更多</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
        
        <CardContent className="p-0 flex flex-col items-center gap-4">
          {/* 下方按钮 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="relative"
                aria-label="切换主题"
              >
                <div className={`transition-all duration-300 ease-in-out ${isAnimating ? 'rotate-[360deg] scale-0' : ''}`}>
                  {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>切换主题</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={pathname === ROUTES.SETTINGS ? "default" : "ghost"} 
                size="icon" 
                asChild
              >
                <Link href={ROUTES.SETTINGS} aria-label="设置">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>设置</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

