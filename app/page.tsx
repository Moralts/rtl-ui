"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export default function Home() {
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'new'>('home');
  const [selectedProfile, setSelectedProfile] = useState({
    name: "RTL User",
    status: "正版验证"
  });

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
    setCurrentView(currentView === 'home' ? 'new' : 'home');
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
      {/* 右侧栏 - 1/4 宽度，上下占满，保持固定不动 */}
      <div className="absolute right-0 top-0 w-1/4 h-full p-4 flex flex-col justify-end z-10">
        <Card className={`transition-all duration-700 ease-in-out ${currentView === 'new' ? 'h-auto' : 'h-full'} flex flex-col justify-between`}>
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

      {/* 主页内容 */}
      <div className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${currentView === 'home' ? 'translate-y-0' : '-translate-y-full'}`}>
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
        <div className="flex flex-col h-full">
          {/* 新区域顶部卡片 */}
          <div className="absolute top-2 left-0 right-0 mx-4 z-0">
            <Card className="p-3">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 border-2 border-dashed flex items-center justify-center mr-3">
                  <img 
                    src="https://fabricmc.net/assets/logo.png" 
                    alt="实例图标" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-1">
                    <h2 className="text-lg font-bold mr-2">RTL World</h2>
                    <Badge variant="secondary">Minecraft 1.21.8</Badge>
                    <Badge variant="secondary">Fabric 0.17.2</Badge>
                    <Badge variant="secondary">72 Mods</Badge>
                    <Badge variant="secondary">1.76 GB</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* 新区域内容卡片 */}
          <div className="flex flex-wrap justify-center mt-20 w-full px-4 overflow-y-auto" style={{ maxHeight: '50vh' }}>
            <div className="w-full max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>实例详细信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>这里是实例的详细信息内容...</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Mod</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Mod管理相关内容...</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>资源包</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>资源包管理相关内容...</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>光影包</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>光影包管理相关内容...</p>
                  </CardContent>
                </Card>
                
                <Card className="sm:col-span-2 md:col-span-1">
                  <CardHeader>
                    <CardTitle>截图</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>游戏截图展示区域...</p>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>世界</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>世界存档管理相关内容...</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* 新区域底部按钮 - 居中 (在新区域显示向上按钮) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <Button variant="outline" onClick={toggleView}>
              返回主页
            </Button>
          </div>
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