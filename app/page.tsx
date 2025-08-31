"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export default function Home() {
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'new'>('home');
  
  useEffect(() => {
    const savedView = localStorage.getItem('currentView') as 'home' | 'new';
    if (savedView) {
      setCurrentView(savedView);
    }
  }, []);
  const [selectedProfile, setSelectedProfile] = useState({
    name: "RTL User",
    status: "正版验证"
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'basic' | 'modify' | 'export'>('overview');

  const profiles = [
    { id: 1, name: "MocoStars", status: "正版验证" },
    { id: 2, name: "Esuny", status: "离线登录" },
    { id: 3, name: "ElandaDRM", status: "离线登录" },
    { id: 4, name: "EasyCaomou", status: "离线登录" },
    { id: 5, name: "Genshin", status: "皮肤站登录" },
  ];

  const handleProfileSelect = (profile: typeof profiles[0]) => {
    setSelectedProfile({
      name: profile.name,
      status: profile.status
    });
    setIsProfileSelectorOpen(false);
  };

  const toggleView = () => {
    const newView = currentView === 'home' ? 'new' : 'home';
    setCurrentView(newView);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentView', newView);
    }
  };

  // 阻止主页区域的滚轮滚动
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (currentView === 'home') {
        e.preventDefault();
      }
    };

    // 添加滚轮事件监听器
    window.addEventListener('wheel', handleWheel, { passive: false });

    // 清理事件监听器
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentView]);

  return (
    <div className="relative h-screen">
      {/* 主页内容 */}
      <div className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${currentView === 'home' ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* 右侧栏 - 1/4 宽度，上下占满 */}
        <div className="absolute right-0 top-0 w-1/4 h-full p-4 flex flex-col justify-end">
          <Card className="transition-all duration-700 ease-in-out h-full flex flex-col justify-between">
          {/* 卡片主要内容区域 */}
          <CardContent 
            className="flex-grow flex flex-col items-center justify-center transition-all duration-700 ease-in-out"
          >
            <Card 
              className={`cursor-pointer transition-all duration-700 ease-in-out flex flex-row items-center p-3 w-full`}
              onClick={() => setIsProfileSelectorOpen(true)}
            >
              <div className={`transition-all duration-700 ease-in-out w-12 h-12 rounded-full overflow-hidden transform-gpu`}>
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out">
                  {/* 这里可以放置实际的头像图片 */}
                </div>
              </div>
              <div className={`transition-all duration-700 ease-in-out ml-3 flex flex-col`}>
                <span className={`font-bold transition-all duration-700 ease-in-out text-base`}>{selectedProfile.name}</span>
                <span className={`transition-all duration-700 ease-in-out text-gray-500 text-xs`}>{selectedProfile.status}</span>
              </div>
            </Card>
          </CardContent>

          {/* 卡片底部按钮区域 */}
          <CardContent className="flex items-center space-x-4 transition-all duration-700 ease-in-out">
            <div className="w-full">
              <div className="text-center text-sm text-gray-500 mb-2 transition-all duration-700 ease-in-out">1.21.7 Fabric</div>
              <Button variant="default" size="lg" className="w-full mb-2 transition-all duration-700 ease-in-out">启动游戏</Button>
              <div className="flex space-x-2 mt-2 transition-all duration-700 ease-in-out">
                <Button variant="secondary" className="flex-1 transition-all duration-700 ease-in-out">版本管理</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* 公告栏 - 左侧 1/4，保持原有非占满样式 */}
        <div className="absolute left-0 top-0 w-1/4 h-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>公告栏</CardTitle>
              <CardDescription>最新消息和更新</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[calc(100%-theme(spacing.20))]">
              <Carousel className="w-full max-w-xs">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">欢迎使用 RTL UI</h3>
                      <p>这是您的新用户界面系统，提供现代化的设计和流畅的体验。</p>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">系统更新</h3>
                      <p>我们最近发布了新功能，改善了用户体验。</p>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">使用提示</h3>
                      <p>查看我们的文档了解如何更好地使用本系统。</p>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </div>
        
        {/* 主页底部按钮 - 居中 (在主页区域显示向下按钮) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <Button onClick={toggleView}>
            切换到实例设置
          </Button>
        </div>
      </div>

      {/* 新区域内容 */}
      <div className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${currentView === 'new' ? 'translate-y-0' : 'translate-y-full'}`}>
        
        {/* 新区域顶部卡片 */}
        <div className="fixed top-2 left-0 right-0 mx-4 z-10">
          <Card className="p-3">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center mr-3">
                <img 
                  src="https://fabricmc.net/assets/logo.png" 
                  alt="实例图标" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div className="flex items-center flex-wrap gap-1">
                  <h2 className="text-lg font-bold mr-2">RTL World</h2>
                  <Badge variant="default">Minecraft 1.21.8</Badge>
                  <Badge variant="secondary">Fabric 0.17.2</Badge>
                  <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">72 Mods</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Card 
                    className="cursor-pointer transition-all duration-200 flex flex-row items-center p-2"
                    onClick={() => setIsProfileSelectorOpen(true)}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center">
                      </div>
                    </div>
                    <div className="ml-2">
                      <div className="font-semibold text-sm">{selectedProfile.name}</div>
                      <div className="text-gray-500 text-xs">{selectedProfile.status}</div>
                    </div>
                  </Card>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    实例选择
                  </Button>
                  <Button size="sm" variant="default">启动游戏</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
          
        {/* 标签页 */}
        <div className="fixed top-24 left-0 right-0 mx-4 z-10">
          <Card className="p-2 py-2">
            <NavigationMenu className="w-full">
              <NavigationMenuList className="w-full justify-center space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`px-4 py-1 block rounded-md cursor-pointer ${
                      activeTab === 'overview' 
                        ? 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    概览
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`px-4 py-1 block rounded-md cursor-pointer ${
                      activeTab === 'basic' 
                        ? 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab('basic')}
                  >
                    基础设置
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`px-4 py-1 block rounded-md cursor-pointer ${
                      activeTab === 'modify' 
                        ? 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab('modify')}
                  >
                    修改
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`px-4 py-1 block rounded-md cursor-pointer ${
                      activeTab === 'export' 
                        ? 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab('export')}
                  >
                    导出
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </Card>
        </div>
          
        {/* 标签页内容 */}
        <div className="absolute top-36 left-0 right-0 mx-4 z-0 mt-2 overflow-y-auto" style={{ height: 'calc(100vh - 10rem)' }}>
          {activeTab === 'overview' && (
            <div className="flex gap-4 h-[calc(100vh-12rem)]">
              {/* 概览页面内容 */}
              <div className="w-1/4">
                <Card className="h-full group relative overflow-hidden hover:shadow -lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/2 to-fuchsia-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="w-16 h-16 mb-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl opacity-20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                    </div>
                    <CardTitle className="text-xl">实例信息</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">查看当前实例的详细信息</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-950/20 dark:to-fuchsia-950/20">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                          实例名称
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">名称:</span>
                            <span className="text-sm font-medium">RTL World</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">ID:</span>
                            <span className="text-sm font-medium">RTLE-001</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline" size="sm" className="w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                更改信息
                              </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                              <SheetHeader>
                                <SheetTitle>更改实例信息</SheetTitle>
                                <SheetDescription>
                                  修改实例的名称和图标
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                <div className="grid gap-3">
                                  <div className="grid gap-3">
                                    <Label htmlFor="instance-name" className="text-right">
                                      实例名称
                                    </Label>
                                    <Input id="instance-name" className="col-span-3" defaultValue="RTL World" />
                                  </div>
                                  <div className="grid gap-3">
                                    <Label htmlFor="instance-icon" className="text-right">
                                      实例图标
                                    </Label>
                                    <Input id="instance-icon" className="col-span-3" defaultValue="https://fabricmc.net/assets/logo.png" />
                                  </div>
                                  <div className="flex justify-end">
                                    <Button variant="outline" className="mr-2">放弃更改</Button>
                                    <Button type="submit">保存更改</Button>
                                  </div>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-fuchsia-50 dark:from-indigo-950/20 dark:to-fuchsia-950/20">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          启动时间
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">上次启动:</span>
                            <span className="text-sm font-medium">2小时前</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">运行时长:</span>
                            <span className="text-sm font-medium">45分钟</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧卡片 */}
              <div className="flex-1 grid grid-cols-3 gap-4">
                {/* Mods 卡片 */}
                <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/2 to-green-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <CardTitle className="flex items-center gap-2">Mods</CardTitle>
                    <CardDescription>模组管理中心</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">• 已安装：72个模组</p>
                      <p className="text-sm text-gray-500">• 更新可用：3个</p>
                      <p className="text-sm text-gray-500">• 配置文件编辑</p>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          asChild
                          size="sm"
                          variant="outline"
                          className="hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950 dark:hover:text-emerald-400"
                        >
                          <Link href="/instance-settings/mods">管理</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 世界卡片 */}
                <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/2 to-orange-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-900/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <CardTitle>世界</CardTitle>
                    <CardDescription>存档管理</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">• 游戏存档：6个</p>
                      <p className="text-sm text-gray-500">• 最近游戏：RTL World</p>
                      <p className="text-sm text-gray-500">• 自动备份</p>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          asChild
                          size="sm"
                          variant="outline"
                          className="hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950 dark:hover:text-amber-400"
                        >
                          <Link href="/instance-settings/worlds">管理</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/2 to-indigo-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <CardTitle>资源包</CardTitle>
                    <CardDescription>游戏材质管理</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">• 当前使用：默认高清</p>
                      <p className="text-sm text-gray-500">• 已安装：4个包</p>
                      <p className="text-sm text-gray-500">• 资源包排序</p>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          asChild
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400"
                        >
                          <Link href="/instance-settings/resources">管理</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/2 to-purple-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-lg bg-violet-50 dark:bg-violet-900/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600 dark:text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <CardTitle>光影包</CardTitle>
                    <CardDescription>视觉效果增强</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">• 当前光影：BSL</p>
                      <p className="text-sm text-gray-500">• 已安装：3个</p>
                      <p className="text-sm text-gray-500">• 性能配置</p>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          asChild
                          size="sm"
                          variant="outline"
                          className="hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-950 dark:hover:text-violet-400"
                        >
                          <Link href="/instance-settings/shaders">管理</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/2 to-teal-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-lg bg-cyan-50 dark:bg-cyan-900/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <CardTitle>截图</CardTitle>
                    <CardDescription>游戏截图管理</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">• 总数：126张</p>
                      <p className="text-sm text-gray-500">• 最近截图：今天</p>
                      <p className="text-sm text-gray-500">• 快速分享</p>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          asChild
                          size="sm"
                          variant="outline"
                          className="hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-950 dark:hover:text-cyan-400"
                        >
                          <Link href="/instance-settings/screenshots">管理</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 投影原理图卡片 - 放在截图卡片右边 */}
                <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/2 to-cyan-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-lg bg-teal-50 dark:bg-teal-900/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <CardTitle>投影原理图</CardTitle>
                    <CardDescription>结构设计管理</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">• 原理图：12个</p>
                      <p className="text-sm text-gray-500">• 最近使用：Redstone Castle</p>
                      <p className="text-sm text-gray-500">• 快速部署</p>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          asChild
                          size="sm"
                          variant="outline"
                          className="hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-950 dark:hover:text-teal-400"
                        >
                          <Link href="/instance-settings/schematics">管理</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'basic' && (
            <div className="flex gap-4">
              <Card className="flex w-full">
                <CardHeader>
                  <CardTitle>基础设置</CardTitle>
                  <CardDescription>配置实例的基本参数</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 启动选项 */}
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold">启动选项</h3>
                    <div className="space-y-4">
                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <label className="block text-sm font-medium mb-1">游戏窗口标题</label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>设置游戏窗口显示的标题文本</p>
                          </TooltipContent>
                        </Tooltip>
                        <Input placeholder="Minecraft* 1.21.8" />
                      </div>
                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <label className="block text-sm font-medium mb-1">Java 版本</label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>选择用于启动游戏的 Java 运行环境</p>
                          </TooltipContent>
                        </Tooltip>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择 Java 版本" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="java8">Java 8</SelectItem>
                            <SelectItem value="java11">Java 11</SelectItem>
                            <SelectItem value="java17">Java 17 (推荐)</SelectItem>
                            <SelectItem value="java21">Java 21</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>

                  {/* 游戏内存 */}
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold">游戏内存</h3>
                    <div className="space-y-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <RadioGroup defaultValue="global">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="global" id="global" />
                                  <Label htmlFor="global">跟随全局设置</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="auto" id="auto" />
                                  <Label htmlFor="auto">自动配置</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="manual" id="manual" />
                                  <Label htmlFor="manual">手动配置</Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>选择内存分配方式</p>
                        </TooltipContent>
                      </Tooltip>

                      <div className="space-y-6">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Slider defaultValue={[4]} max={16} step={0.5} />
                              <div className="text-sm text-muted-foreground mt-1">
                                当前分配：4GB
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>拖动滑块调整游戏内存分配</p>
                          </TooltipContent>
                        </Tooltip>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>系统内存使用情况</span>
                            <span>16GB 总内存</span>
                          </div>
                          <Progress value={33} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>游戏分配: 4GB</span>
                            <span>空闲: 8GB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 高级启动设置 */}
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold">高级启动设置</h3>
                    <div className="space-y-4">
                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <label className="block text-sm font-medium mb-1">游戏渲染器</label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>选择游戏使用的图形渲染后端</p>
                          </TooltipContent>
                        </Tooltip>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择渲染器" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">默认渲染</SelectItem>
                            <SelectItem value="dx12">DirectX 12</SelectItem>
                            <SelectItem value="vulkan">Vulkan</SelectItem>
                            <SelectItem value="software">软件渲染</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <label className="block text-sm font-medium mb-1">JVM 参数头部</label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>在命令行开头添加的 JVM 参数</p>
                          </TooltipContent>
                        </Tooltip>
                        <Textarea placeholder="-XX:+UseG1GC -XX:+ParallelRefProcEnabled" />
                      </div>

                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <label className="block text-sm font-medium mb-1">游戏尾部参数</label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>在命令行末尾添加的游戏参数</p>
                          </TooltipContent>
                        </Tooltip>
                        <Textarea placeholder="--width 1920 --height 1080" />
                      </div>

                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <label className="block text-sm font-medium mb-1">启动前执行命令</label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>游戏启动前需要执行的系统命令</p>
                          </TooltipContent>
                        </Tooltip>
                        <Textarea placeholder="echo 正在启动游戏..." />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="ignoreJavaWarning" />
                                <label
                                  htmlFor="ignoreJavaWarning"
                                  className="text-sm font-medium leading-none"
                                >
                                  忽略 Java 兼容性警告
                                </label>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>跳过 Java 版本兼容性检查</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="skipFileValidation" />
                                <label
                                  htmlFor="skipFileValidation"
                                  className="text-sm font-medium leading-none"
                                >
                                  关闭游戏文件校验
                                </label>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>跳过启动前的文件完整性检查</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'modify' && (
            <div className="flex gap-4 h-[calc(100vh-12rem)]">
              <Card className="w-full p-6">
                <CardHeader>
                  <CardTitle>实例修改</CardTitle>
                  <CardDescription>修改实例配置和文件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">版本修改</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Minecraft 版本</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="选择版本" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>可用版本</SelectLabel>
                                <SelectItem value="1.21.8">1.21.8</SelectItem>
                                <SelectItem value="1.21.7">1.21.7</SelectItem>
                                <SelectItem value="1.21.6">1.21.6</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Fabric 版本</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="选择版本" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>可用版本</SelectLabel>
                                <SelectItem value="0.17.2">0.17.2</SelectItem>
                                <SelectItem value="0.17.1">0.17.1</SelectItem>
                                <SelectItem value="0.17.0">0.17.0</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">Mod 管理</h3>
                      <div className="space-y-4">
                        <Button className="w-full">添加新模组</Button>
                        <Button variant="outline" className="w-full">检查更新</Button>
                        <Button variant="outline" className="w-full">编辑配置</Button>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">配置文件</h3>
                      <div className="space-y-4">
                        <Button className="w-full">打开配置目录</Button>
                        <Button variant="outline" className="w-full">导出配置</Button>
                        <Button variant="outline" className="w-full">重置配置</Button>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="flex gap-4 h-[calc(100vh-12rem)]">
              <Card className="w-full p-6">
                <CardHeader>
                  <CardTitle>实例导出</CardTitle>
                  <CardDescription>导出实例配置和文件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">快速导出</h3>
                      <div className="space-y-4">
                        <Button className="w-full">导出整合包</Button>
                        <Button variant="outline" className="w-full">仅导出模组列表</Button>
                        <Button variant="outline" className="w-full">导出配置文件</Button>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">自定义导出</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="mods" defaultChecked />
                          <label
                            htmlFor="mods"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            包含模组
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="config" defaultChecked />
                          <label
                            htmlFor="config"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            包含配置文件
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="resourcepacks" />
                          <label
                            htmlFor="resourcepacks"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            包含资源包
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="shaderpacks" />
                          <label
                            htmlFor="shaderpacks"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            包含光影包
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="saves" />
                          <label
                            htmlFor="saves"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            包含存档
                          </label>
                        </div>
                        <Button className="w-full mt-4">开始导出</Button>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
          
        {/* 新区域顶部按钮 - 居中 (在新区域显示向上按钮) */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <Button variant="outline" onClick={toggleView}>
            返回主页
          </Button>
        </div>
      </div>

      {/* 弹出的选择器卡片 */}
      {isProfileSelectorOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md shadow-2xl shadow-black/20 dark:shadow-black/40 transform transition-all duration-300 ease-out">
            <CardHeader>
              <CardTitle>选择用户</CardTitle>
              <CardDescription>点击选择一个用户配置文件</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  {profiles.map((profile) => (
                    <CarouselItem key={profile.id} className="basis-full sm:basis-1/2 md:basis-1/3">
                      <div 
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        onClick={() => handleProfileSelect(profile)}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                            <AspectRatio ratio={1} className="flex items-center justify-center bg-gray-200 border-2 border-dashed rounded-xl w-full h-full">
                              {/* 这里可以放置实际的头像图片 */}
                            </AspectRatio>
                          </div>
                          <h3 className="font-semibold">{profile.name}</h3>
                          <p className="text-sm text-gray-500">{profile.status}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => setIsProfileSelectorOpen(false)}>
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}